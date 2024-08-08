import User from '../models/user-model.js'
import bcryptjs  from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  
  try{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();
    res.status(201).json("User Create successfully");
  }catch(err){
    //res.status(500).json(err.message);
    next(err);
  } 
}

export const signin = async (req, res, next) => {
  try{
    const {email, password} = req.body;
    const validUser = await User.findOne({email: email});
    if(!validUser){
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler(401, 'Wrong credential!'));
    }
    //console.log(process.env.JWT_SECERT);
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECERT);
    const {password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
  }catch(err){
    next(err);
  }
}