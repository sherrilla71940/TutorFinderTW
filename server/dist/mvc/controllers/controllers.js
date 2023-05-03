"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.getAChat = exports.getContacts = exports.updateUserDetails = exports.getAllTutors = void 0;
const user_1 = __importDefault(require("../models/user"));
const chat_1 = __importDefault(require("../models/chat"));
function getAllTutors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTutors = yield user_1.default.find({ type: 'tutor' });
            if (!allTutors.length)
                throw new Error();
            res.status(200);
            res.json(allTutors);
        }
        catch (e) {
            res.status(404);
            res.send('Failed to get tutors');
        }
    });
}
exports.getAllTutors = getAllTutors;
function updateUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.user.id;
        try {
            const updatedUser = yield user_1.default.findByIdAndUpdate(userId, req.body);
            if (!updatedUser)
                throw new Error();
            res.status(200);
            updatedUser.password = "";
            res.json(updatedUser);
        }
        catch (error) {
            res.status(400);
            res.send(`Could not update user info for user ${userId}`);
        }
    });
}
exports.updateUserDetails = updateUserDetails;
function getContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.body.user.id;
        try {
            const ids = [];
            const contacts = [];
            const chats = yield chat_1.default.find({ $or: [{ partyId1: userId }, { partyId2: userId }] });
            chats.forEach((chat) => {
                if (chat.partyId1 === userId) {
                    ids.push(chat.partyId2);
                }
                else {
                    ids.push(chat.partyId1);
                }
            });
            yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                const record = yield user_1.default.findById(id);
                record.password = '';
                contacts.push(record);
            })))
                .then(() => {
                console.log(`Found ${contacts.length} contacts`);
                console.log(contacts);
                res.status(200);
                res.json(contacts);
            });
        }
        catch (error) {
            console.log(error);
            res.status(404);
            res.send('Failed to get contacts');
        }
    });
}
exports.getContacts = getContacts;
function getAChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const requesterId = data.user.id;
            // console.log(data);
            console.log('Got a request for a chat');
            const chat = yield chat_1.default.findOne({ $or: [{ partyId1: requesterId, partyId2: data.otherId }, { partyId1: data.otherId, partyId2: requesterId }] });
            res.status(200);
            console.log(chat);
            res.json(chat);
        }
        catch (error) {
            console.log(error);
            res.status(404);
            res.send('Failed to get the chat');
        }
    });
}
exports.getAChat = getAChat;
// IF NO CHAT DOC, CREATE IT, ELSE UPDATE
function postMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log('Post message request body:', data);
            const requesterId = data.user.id;
            const newMessage = {
                senderId: requesterId,
                timestamp: Date.now(),
                message: data.message
            };
            const chat = yield chat_1.default.findOne({ $or: [{ partyId1: requesterId, partyId2: data.party2Id }, { partyId1: data.party2Id, partyId2: requesterId }] });
            if (chat) {
                const update = yield chat_1.default.findByIdAndUpdate(chat.id, { $push: { messageLog: newMessage } });
                console.log(update);
            }
            else {
                const create = yield chat_1.default.create({
                    partyId1: requesterId,
                    partyId2: data.party2Id,
                    messageLog: [newMessage]
                });
                console.log(create);
            }
            res.status(201);
            console.log('Message posted!');
            res.send('Message posted!');
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.postMessage = postMessage;
