import { networkInterfaces } from 'os';
import {Tutor, TutorInterface} from './models/tutor';
import {Request, Response} from 'express';

export async function getAllTutors (req: Request, res: Response): Promise<void> {
  res.json('hello');
}

export async function addTutor (req: Request, res: Response): Promise<void>{
  try {
    const newTutorData: TutorInterface = req.body;
    const newTutor = new Tutor(newTutorData);
    // await newTutor.save((e) => {
    //   if (e) throw new Error();
    // });
    console.log(newTutor);
    res.status(200);
    res.json(newTutor);
  } catch (e: any) {
    console.log(e.message);
  }
}

export async function getTutor (req: Request, res: Response): Promise<void>{
  // return 'hello'
}

export async function deleteTutor (req: Request, res: Response): Promise<void>{
  // return 'hello'
}

export async function updateTutor (req: Request, res: Response): Promise<void>{
  // return 'hello'
}


