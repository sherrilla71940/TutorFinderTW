import mongoose from 'mongoose';

const Schema = mongoose.Schema; // CLASS

const messageSchema = new Schema({
  senderId: String,
  timestamp: Number,
  message: String
})

const chatSchema = new Schema({
	partyId1: String,
  partyId2: String,
  messageLog: [messageSchema]
	}
);

const Chats = mongoose.model('chats', chatSchema); // MAKE A 'TABLE' BASED ON A SCHEMA

export default Chats;