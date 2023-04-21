import {Tutor} from '../models/tutor';
import {Request, Response} from 'express';

export async function getAllTutors (req: Request, res: Response): Promise<void> {
  // res.json('hello');
}

export async function addTutor (req: Request, res: Response): Promise<void>{
  try {
    const newTutor = await Tutor.create(req.body);
    console.log(newTutor)
    res.status(201);
    res.json(newTutor);
  } catch (e: unknown) {
    res.status(400);
      if (e instanceof Error) {
        console.log(e.message);
        res.json('could not create tutor, remember that your email must be unique')
      }
      else {
        res.json('could not create tutor');
      }
  }
}

export async function getTutor (req: Request, res: Response): Promise<void>{
  const tutorId = req.params.id;
  try {
    const foundTutor = await Tutor.findById(tutorId);
    res.status(200);
    res.json(foundTutor);
  } catch (e: unknown) {
    res.status(400);
      res.json(`could not find tutor by id: ${tutorId}`);
  }
}

export async function deleteTutor (req: Request, res: Response): Promise<void>{
  // return 'hello'
}

export async function updateTutor (req: Request, res: Response): Promise<void>{
  // return 'hello'
}


