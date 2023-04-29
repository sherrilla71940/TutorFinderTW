import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Users from '../models/user';
import jwt from 'jsonwebtoken';

export default async function registerUser(request: Request, response: Response): Promise<void> {
  try {
    const newUser = request.body;
    console.log(newUser);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    const newUserRecord = newUser;
    newUserRecord.password = passwordHash;
    const save = await Users.create(newUserRecord)
      .then(() => {
        response.status(200);
        response.send('OK!');
      })
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
        // TODO: HIDE SECRET
        const token = jwt.sign({ id: userCheck._id }, 'shrek');
        response.status(200);
        response.json(token);
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send('Authentication error');
  }
}