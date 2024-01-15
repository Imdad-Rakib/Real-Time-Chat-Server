import { Message } from "../models/message.mjs";
import { Room } from "../models/room.mjs";
import { Conversation } from "../models/conversation.mjs";
import { ActiveClients } from "../models/activeClients.mjs";
import { io } from "../app.mjs";

//external
import path from 'path';
import { fileURLToPath } from 'url';
import { DisappearingMsg } from "../models/DisappearingMsg.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getMessage(req, res, next){
    try{
        const {conversation_id, name} = req.body;
        let room = await Room.findOne({
            conversation_id,
            name
        })
        let messages = await Message.find({
            room_id: room._id
        })
        .select('_id sender receiver text createdAt file')
        .sort({createdAt: 1});
        let x = await DisappearingMsg.findOne({
            conversation_id,
            room: name
        })
        let response_body = {
            messages,
            disappearing_flag: (x !== null ? true: false)
        }
        res.json(response_body);
    }catch(err){
        console.log(err);
        res.json({
            error: 'Internal server error'
        })
    }
}

async function handlePrivateMsg(req, res, next) {
    try {
        const { text, sender, conversation_id, sender_name, receiver_name, receiver, room_name } = req.body;
        let conversation = await Conversation.findOne({
            $or: [
                { creator: sender, participant: receiver },
                { creator: receiver, participant: sender },
            ]
        })
        let room = {};
        if (conversation) {
            conversation.last_updated = Date.now();
            conversation.last_msg = text;
            conversation.updated_by = sender;
            conversation.isOpened = false;
            conversation.last_room = room_name,
                conversation = await conversation.save();
            room = await Room.findOne({
                conversation_id,
                name: room_name
            })

        } else {
            conversation = new Conversation({
                creator: sender,
                participant: receiver,
                creator_name: sender_name,
                participant_name: receiver_name,
                last_updated: Date.now(),
                last_msg: text,
                updated_by: sender,
                isOpened: false,
                last_room: 'General',
            })
            conversation = await conversation.save();
            room = new Room({
                conversation_id: conversation._id,
                name: 'General',
                creator: sender,
            })
            await room.save();
        }
        let file = null;
        if(req.files.length){
            file = {
                name: req.files[0].filename,
                size: req.files[0].size,
                extname: path.extname(req.files[0].originalname)
            }
        }
        const msg = new Message({ room_id: room._id, text, sender, receiver, file });
        await msg.save();
        let user = await ActiveClients.findOne({
            email: receiver,
        })
        if (user) {
            io.to(user.connectionId).emit('private_message', msg, conversation)
        }
        res.json({
            conversation,
            file
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            error: 'Internal server error.'
        })
    }
}

async function singleDownloader(req, res, next){
    const folderPath = path.join(__dirname, '../public/uploads/files/');
    res.download(folderPath + req.params.fileName, function (err) {
        if (err) {
            console.log(err);
            res.json({
                error: 'Internal server error'
            })
        }
    })
}
async function destroyMsg(conversation_id, room_id, room, expiry){
    let x = await DisappearingMsg.findOne({
        conversation_id,
        room
    })
    if(!x) return
    await DisappearingMsg.deleteMany({
        conversation_id,
        room
    })
    await Message.deleteMany({
        room_id,
        createdAt: {$gte: new Date(Date.now() - expiry)}
    })
    let message = await Message.find({
        room_id
    })
    .select('text')
    .sort({ createdAt: -1 })
    .limit(1)
    let updated_conversation = await Conversation.findOneAndUpdate(
        {_id: conversation_id},
        { $set: {last_msg : message[0].text}},
        {new: true}
    )
    x = await Conversation.findOne({
        _id: conversation_id
    })
    let client1 = await ActiveClients.findOne({
        email: x.creator
    })
    let client2 = await ActiveClients.findOne({
        email: x.participant
    })
    if (client1){
        io.to(client1.connectionId).emit('Messages_Expired', {
            conversation_id,
            room
        }, updated_conversation)
    }
    if (client2) {
        io.to(client2.connectionId).emit('Messages_Expired', {
            conversation_id,
            room
        }, updated_conversation)
    }
}
async function setDisappearingMsg(req, res, next){
    const {conversation_id, room, expiry, receiver, sender} = req.body;
    try{
        let x = await Room.findOne({
            conversation_id,
            name: room
        })
        let msg = new Message({ room_id: x._id, sender, receiver, disappear_time: expiry, set_disappear: true });
        msg = await msg.save();
        let disappearingMsg = new DisappearingMsg({
            conversation_id,
            room,
            expiry: new Date(Date.now() + expiry)
        })
        await disappearingMsg.save();
        setTimeout(() => {
            destroyMsg(conversation_id, x._id, room, expiry)
        }, expiry);
        let client = await ActiveClients.findOne({
            email: receiver
        })
        if(client){
            io.to(client.connectionId).emit('Disappearing_Messages_Activated', receiver, room, msg)
        }
        res.status(200).json({
            success: true
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}
async function unsetDisappearingMsg(req, res, next){
    const {conversation_id, room, receiver, sender} = req.body;
    try{
        await DisappearingMsg.deleteMany({
            conversation_id, 
            room
        })
        let client = ActiveClients.findOne(receiver);
        io.to(client.connectionId).emit('Disappearing_Messages_Deactivated',
        {
            deactivatedBy: sender,
            room
        })
        res.status(200).json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}
async function deleteMsg(req, res, next) {
    try{
        await Message.findByIdAndDelete(req.body.msg_id);
        let client = await ActiveClients.findOne({
            email: req.body.receiver
        })
        if(client){
            io.to(client.connectionId).emit('delete_msg', {
                id: req.body.msg_id,
                sender: req.body.sender,
                room: req.body.room
            })
        }
        res.status(204).json({
            success: true
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}
export {getMessage, handlePrivateMsg, singleDownloader, setDisappearingMsg, unsetDisappearingMsg, deleteMsg};