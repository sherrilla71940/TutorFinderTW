import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export async function verifyToken(request: Request, response: Response, next: NextFunction) {
  try {
    const token = request.get('Authorization');
    if (!token) {
      response.status(403);
      response.send('Access denied');
      return;
    } else {
      // TODO: HIDE SECRET
      const decrypt = jwt.verify(token, 'shrek');
      console.log(decrypt);
      request.body.user = decrypt;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}