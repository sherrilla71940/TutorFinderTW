import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Users from '../models/user';

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
    response.send('Failed to register a new user');
  }
}