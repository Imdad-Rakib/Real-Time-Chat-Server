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
        // disappear_time:{
        //     type: Number,
        //     default: 0
        // },
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
