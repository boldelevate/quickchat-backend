import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    businessID: {
        type: String,
        required: true,
    },
    identifier: {
        type: String,
        unique: true,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: () => Date.now(),
    },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;