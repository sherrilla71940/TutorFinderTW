import { Request, Response } from 'express';
import Users from '../models/user';
import Chats from '../models/chat';
import { User } from '../custom-types/types';

export async function getAllTutors(req: Request, res: Response): Promise<void> {
  try {
    const allTutors = await Users.find({ type: 'tutor' });
    if (!allTutors.length) throw new Error();
    res.status(200);
    res.json(allTutors);
  } catch (e: unknown) {
    res.status(404);
    res.send('Failed to get tutors');
  }
}

export async function updateUserDetails(req: Request, res: Response): Promise<void> {
  const userId = req.body.user.id;
  try {
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body);
    if (!updatedUser) throw new Error();
    res.status(200);
    updatedUser.password = "";
    res.json(updatedUser);
  } catch (error: unknown) {
    res.status(400);
    res.send(`Could not update user info for user ${userId}`);
  }
}

export async function getContacts(req: Request, res: Response): Promise<void> {
  const userId = req.body.user.id;
  try {
    const ids: string[] = [];
    const contacts: User[] = [];
    const chats = await Chats.find({ $or: [{ partyId1: userId }, { partyId2: userId }] });
      chats.forEach((chat) => {
        if (chat.partyId1 === userId) {
          ids.push(chat.partyId2!);
        } else {
          ids.push(chat.partyId1!);
        }
      })
      await Promise.all(ids.map(async (id) => {
        const record = await Users.findById(id);
        record!.password = '';
        contacts.push(record);
      }))
        .then(() => {
          console.log(`Found ${contacts.length} contacts`);
          console.log(contacts);
          res.status(200);
          res.json(contacts);
        })
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send('Failed to get contacts');
  }
}

export async function getAChat(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const requesterId = data.user.id;
    // console.log(data);
    console.log('Got a request for a chat');
    const chat = await Chats.findOne({ $or: [{ partyId1: requesterId, partyId2: data.otherId }, { partyId1: data.otherId, partyId2: requesterId }] });
    res.status(200);
    console.log(chat);
    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(404);
    res.send('Failed to get the chat');
  }
}

// IF NO CHAT DOC, CREATE IT, ELSE UPDATE
export async function postMessage(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    console.log('Post message request body:', data);
    const requesterId = data.user.id;
    const newMessage = {
      senderId: requesterId, // THIS ONE IS ALWAYS PRECISE AS IT HAS USER ID
      timestamp: Date.now(),
      message: data.message
    }
    const chat = await Chats.findOne({ $or: [{ partyId1: requesterId, partyId2: data.party2Id }, { partyId1: data.party2Id, partyId2: requesterId }] });
    if (chat) {
      const update = await Chats.findByIdAndUpdate(chat.id, { $push: { messageLog: newMessage } });
      console.log(update);
    } else {
      const create = await Chats.create({
        partyId1: requesterId,
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



