import Message from "../models/message-model.js";
import { errorHandler } from "../utils/error.js";
import MessageList from "../models/messageList-model.js";

export const addMessage = async (req, res, next) => {
  try{
    const {senderRef, receiverRef, content, listingRef} = req.body;
    const message = await Message.create({
      senderRef,
      receiverRef,
      content,
      listingRef
    })
    const messageList1 = await MessageList.findOne({
      'userRef': senderRef,
      'userChatRef': receiverRef
    })
    const messageList2 = await MessageList.findOne({
      'userRef': receiverRef,
      'userChatRef': senderRef
    })
    if(!messageList1){
      //null create
      
      const list = [];
      list.push(message._id);
      await MessageList.create({
        'userRef': senderRef,
        'userChatRef': receiverRef,
        'messageArray': list,
      })

    }else{
      //not null, update
      messageList1.messageArray.push(message._id);
      await messageList1.save();
    }
    if(!messageList2){
      //null create
      const list = [];
      list.push(message._id);
      await MessageList.create({
        'userRef': receiverRef,
        'userChatRef': senderRef,
        'messageArray': list,
      })

    }else{
      //not null, update
      messageList2.messageArray.push(message._id);
     messageList2.save();
    }
    return res.status(201).json(message);
  }catch(err){
    next(err);
  }
}

export const getChatUserList = async (req, res, next) => {
  try{
    //console.log(req.params.id);
    const userList = await MessageList.find({'userRef': req.params.id});
    //console.log(userList);
    return res.status(201).json(userList);
  }catch(err){
    next(err);
  }
}

export const getMessageList = async (req, res, next) => {
  //console.log('1111');
  try{
    const userRef = req.user.id;
    const userChatRef = req.params.userChatRef;
    const messageList = await MessageList.findOne({
      userRef: userRef,
      userChatRef: userChatRef
    });
    res.status(200).json(messageList);
  }catch(err){
    next(err);
  }
}

export const getMessage = async (req, res, next) => {
  try{
    const _id = req.params.id;
    const message = await Message.findOne({
      _id
    })
    res.status(200).json(message);
  }catch(err){
    next(err);
  }
}