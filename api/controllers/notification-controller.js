import Notification from "../models/notification-model.js"

export const createNotification = async (req, res, next) => {
  try{
    const {userRef, listingRef, action} = req.body;
    const notify = await Notification.findOne({
      'listingRef': listingRef
    });
    if(notify){
      //update
      notify.action = action;
      await notify.save();
      res.status(200).json(notify);
    }else{
      const notification = await Notification.create({
        userRef,
        listingRef,
        action
      });
      res.status(200).json(notification);
    }
    
  }catch(err){
    next(err);
  }
}

export const getNotification = async (req, res, next) => {
  try{
    const id = req.params.id;
    //console.log(id);
    const notifications = await Notification.find({
      userRef: {$ne: id}
    });
    //console.log(notifications);
    res.status(200).json(notifications);
  }catch(err){
    //console.log(err);
    next(err);
  }
}