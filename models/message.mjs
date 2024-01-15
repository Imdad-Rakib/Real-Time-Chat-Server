import { Schema, Types, model } from "mongoose";

const messageSchema = Schema(
    {
        room_id:{
            type: String,
            required: true
        },
        text: {
            type: String,
        },
        file: {
            type: Object,
        },
        sender: {
           type: String
        },
        receiver: {
           type: String
        },
        set_disappear:{
            type: Boolean,
            default: false
        },
        unset_disappear:{
            type: Boolean,
            default: false
        },
        expiry:{
            type: Number,
            default: 0
        },
        sent:{
            type: Boolean,
        }
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

export {Message};
