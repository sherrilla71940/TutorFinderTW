import {Tutor} from '../models/tutor';
import {Request, Response} from 'express';

export async function getAllTutors (req: Request, res: Response): Promise<void> {
  try {
    const allTutors = await Tutor.find({});
    if (!allTutors.length) throw new Error();
    res.status(200);
    res.json(allTutors);
  } catch (e: unknown) {
    res.status(404);
    res.json('could not find tutors');
  }
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
      if (!foundTutor) throw new Error();
      res.status(200);
      res.json(foundTutor);
  } catch (e: unknown) {
      res.status(404);
      res.json(`could not find tutor by id: ${tutorId}`);
  }
}

export async function deleteTutor (req: Request, res: Response): Promise<void>{
  const tutorId = req.params.id;
  try {
    const deletedTutor = await Tutor.findByIdAndDelete(tutorId);
    if (!deletedTutor) throw new Error();
    res.status(200);
    res.json(`deleted tutor: ${deletedTutor.name}`);
  } catch (e) {
    res.status(404);
    res.json(`could not delete tutor by id: ${tutorId}`);
  }
}

export async function updateTutor (req: Request, res: Response): Promise<void>{
  const tutorId = req.params.id;
  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(tutorId,req.body);
    if (!updatedTutor) throw new Error();
    res.status(200);
    res.json(updatedTutor);
  } catch (e: unknown) {
    res.status(400);
    res.json(`could not update tutor by id: ${tutorId}`);
  }
}


