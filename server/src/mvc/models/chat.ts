import { mongooseInstance } from "./db";

const Schema = mongooseInstance.Schema;

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

const Chats = mongooseInstance.model('chats', chatSchema);

export default Chats;