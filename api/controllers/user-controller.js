import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs  from 'bcryptjs';

export const test=(req, res)=>{
  res.json({
    message: "Hello World!!!!",
  })
}
export const updateUser = async (req, res, next)=>{
  try{
    if(req.user.id !== req.params.id){
      console.log(req.user.id);
      return next(errorHandler(401, 'You can only update your own account!!'));
    }
      
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, {new: true});//return the new info
    const {password, ...rest} = updateUser._doc;
    //console.log(rest);
    res.status(200).json(rest);
  }catch(err){
    next(err);
  }
}