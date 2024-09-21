import mongoose from "mongoose";

const messageListScheam = mongoose.Schema({
  userRef: {
    type: String,
    required: true
  },
  userChatRef: {
    type: String,
    required: true
  },
  messageArray: {
    type: Array,
  }
}, {timestamps: true})

const MessageList = mongoose.model('MessageList', messageListScheam);

export default MessageList;