import Students from '../models/student';
import {Tutor} from '../models/tutor';
import {Request, Response} from 'express';
import Chats from '../models/chat';

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
    res.status(201);
    res.send('OK!');
  } catch (e: unknown) {
    res.status(400);
      if (e instanceof Error) {
        console.log(e);
        console.log('could not create tutor, remember that your email must be unique')
        res.send('could not create tutor, remember that your email must be unique')
      }
      else {
        console.log('could not create tutor');
        res.send('could not create tutor');
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

export async function addStudent (req: Request, res: Response): Promise<void>{
  try {
    const newStudent = await Students.create(req.body);
    res.status(201);
    res.send('OK!');
  } catch (e: unknown) {
    res.status(400);
      if (e instanceof Error) {
        console.log(e);
        res.send(e);
      }
      else {
        console.log('Failed to create a student record');
        res.send('Failed to create a student record');
      }
  }
}

export async function getChats (req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    // GET DOCS WITH THIS USER'S CHATS
    const chats = await Chats.find( { $or: [{ partyId1: data.user.id }, { partyId2: data.user.id }] });
    if (!chats.length) throw new Error();
    res.status(200);
    res.json(chats);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send('Failed to get chats');
  }
}

export async function getAChat (req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    // console.log(data);
    // console.log('Got a request for a chat');
    const chat = await Chats.findOne( { $or: [{ partyId1: data.user.id, partyId2: data.party2Id }, { partyId1: data.party2Id, partyId2: data.user.id }] });
    res.status(200);
    // console.log(chat);
    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send('Failed to get the chat');
  }
}

// IF NO CHAT DOC, CREATE IT, ELSE UPDATE
export async function postMessage (req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    console.log('Post message request body:', data);
    const newMessage = {
      senderId: data.user.id,
      timestamp: Date.now(),
      message: data.message
    }
    const chat = await Chats.findOne({ $or: [{ partyId1: data.user.id, partyId2: data.party2Id }, { partyId1: data.party2Id, partyId2: data.user.id }] });
    if (chat) {
      const update = await Chats.findByIdAndUpdate(chat.id, { $push: { messageLog: newMessage }});
      console.log(update);
    } else {
      const create = await Chats.create({
        partyId1: data.user.id,
        partyId2: data.party2Id,
        messageLog: [newMessage]
      });
      console.log(create);
    }
    res.status(201);
    console.log('Message posted!');
    res.send('Message posted!');
    } catch (error) {
      console.log(error);
    }
  }

  export async function getContacts (req: Request, res: Response): Promise<void> {
    try {
      const type = req.params.type;
      console.log('Got a request for', type);
      const data = req.body;
      const chats = await Chats.find( { $or: [{ partyId1: data.user.id }, { partyId2: data.user.id }] } );
      const ids: string[] = [];
      chats.forEach((chat) => {
        if (chat.partyId1 === data.user.id) {
          ids.push(chat.partyId2!);
        } else {
          ids.push(chat.partyId1!);
        }
      })
      // TODO: FIX THE TYPE
      // USERS AND TUTORS/STUDENTS HAVE DIFFERENT IDS - REMEMBER THAT
      // FIX: THE ID-BASED LOGIC WORKS FOR STUDENTS, BUT NOT FOR TUTORS
      // CAN BE FIXED BY SECONDARY KEYS (IDS) IN THE MODELS OR... BY USING EMAIL AS UNIQUE IDENTIFIER
      const contacts: any[] = [];
      if (type === 'tutors') {
        await Promise.all(ids.map(async (id) => {
          const record = await Tutor.findById(id);
          contacts.push(record);
        }))
          .then(() => {
            console.log(`Found ${contacts.length} contacts`);
            res.status(200);
            res.json(contacts);
          })
      } else if (type === 'students') {
        await Promise.all(ids.map(async (id) => {
          const record = await Students.findById(id);
          console.log(id);
          console.log(record);
          contacts.push(record);
        }))
          .then(() => {
            console.log(`Found ${contacts.length} contacts`);
            console.log(contacts);
            res.status(200);
            res.json(contacts);
          })
      }
    } catch (error) {
      console.log(error);
      res.status(404);
      res.send('Failed to get contacts');
    }
  }




