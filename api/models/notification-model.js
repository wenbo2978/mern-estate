import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  userRef : {
    type: String,
    required: true
  },
  listingRef : {
    type: String,
    required: true
  },
  action : {
    type: String,
    required: true
  }
}, {timestamps: true});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;