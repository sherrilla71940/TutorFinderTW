import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Users from '../models/user';
import jwt from 'jsonwebtoken';
import handleImage from './image_handler';
import { SECRET } from '../../config';
import { multerFile } from '../custom-types/types';

export default async function registerUser(request: Request, response: Response): Promise<void> {
  try {
    
    const file = request.file;
    const imagePath = await handleImage(file as unknown as multerFile);
    console.log('Image ID:', imagePath);
    const newUser = JSON.parse(request.body.data);
    newUser.picPath = imagePath;
    // CHECK FOR DUPLICATE EMAILS
    const emailCheck = await Users.findOne({ email: newUser.email });
    console.log(emailCheck);
    if (emailCheck) {
      response.status(400);
      response.send('Please provide another e-mail address')
    } else {
      console.log(newUser);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      const newUserRecord = newUser;
      newUserRecord.password = passwordHash;
      const save = await Users.create(newUserRecord)
      .then(() => {
          console.log('here', newUserRecord);
          response.status(200);
          response.send('You can now login with your credentials');
        })
    }
  } catch (error) {
    console.error(error);
    response.status(500);
    response.send('Failed to register a new user');
  }
} 

export async function loginUser(request: Request, response: Response): Promise<void> {
  try {
    const user = request.body;
    const userCheck = await Users.findOne({ email: user.email });
    if (!userCheck) {
      response.status(400);
      response.send('Invalid credentials');
    } else {
      const passwordCheck = bcrypt.compare(user.password, userCheck.password as string);
      if (!passwordCheck) {
        response.status(400);
        response.send('Invalid credentials');
      } else {
        console.log('Successful login!');
        const token = jwt.sign({ id: userCheck._id }, `${SECRET}`);
        const userData = userCheck;
        userData.password = "";
        response.status(200);
        response.json({ token, userData });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send('Authentication error');
  }
}