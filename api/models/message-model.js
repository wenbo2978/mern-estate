import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  senderRef: {
    type: String,
    required: true
  },
  receiverRef: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  listingRef: {
    type: String
  }
}, {timestamps: true});

const Message = mongoose.model('Message', messageSchema);

export default Message;