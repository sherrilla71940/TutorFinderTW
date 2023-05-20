import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET } from '../config';

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.get('Authorization');
    if (!token) {
      response.status(403);
      response.send('Access denied');
      return;
    } else {
      const decrypt = jwt.verify(token, `${SECRET}`);
      console.log(decrypt);
      request.body.user = decrypt;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}