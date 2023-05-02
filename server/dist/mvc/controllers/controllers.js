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
exports.getContacts = exports.postMessage = exports.getAChat = exports.getChats = exports.addStudent = exports.updateTutor = exports.deleteTutor = exports.getTutor = exports.addTutor = exports.getAllTutors = void 0;
const student_1 = __importDefault(require("../models/student"));
const tutor_1 = require("../models/tutor");
const chat_1 = __importDefault(require("../models/chat"));
const user_1 = __importDefault(require("../models/user"));
function getAllTutors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTutors = yield tutor_1.Tutor.find({});
            if (!allTutors.length)
                throw new Error();
            res.status(200);
            res.json(allTutors);
        }
        catch (e) {
            res.status(404);
            res.json('could not find tutors');
        }
    });
}
exports.getAllTutors = getAllTutors;
function addTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTutor = yield tutor_1.Tutor.create(req.body);
            res.status(201);
            res.send('OK!');
        }
        catch (e) {
            res.status(400);
            if (e instanceof Error) {
                console.log(e);
                console.log('could not create tutor, remember that your email must be unique');
                res.send('could not create tutor, remember that your email must be unique');
            }
            else {
                console.log('could not create tutor');
                res.send('could not create tutor');
            }
        }
    });
}
exports.addTutor = addTutor;
function getTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const foundTutor = yield tutor_1.Tutor.findById(tutorId);
            if (!foundTutor)
                throw new Error();
            res.status(200);
            res.json(foundTutor);
        }
        catch (e) {
            res.status(404);
            res.json(`could not find tutor by id: ${tutorId}`);
        }
    });
}
exports.getTutor = getTutor;
function deleteTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const deletedTutor = yield tutor_1.Tutor.findByIdAndDelete(tutorId);
            if (!deletedTutor)
                throw new Error();
            res.status(200);
            res.json(`deleted tutor: ${deletedTutor.name}`);
        }
        catch (e) {
            res.status(404);
            res.json(`could not delete tutor by id: ${tutorId}`);
        }
    });
}
exports.deleteTutor = deleteTutor;
function updateTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tutorId = req.params.id;
        try {
            const updatedTutor = yield tutor_1.Tutor.findByIdAndUpdate(tutorId, req.body);
            if (!updatedTutor)
                throw new Error();
            res.status(200);
            res.json(updatedTutor);
        }
        catch (e) {
            res.status(400);
            res.json(`could not update tutor by id: ${tutorId}`);
        }
    });
}
exports.updateTutor = updateTutor;
function addStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newStudent = yield student_1.default.create(req.body);
            res.status(201);
            res.send('OK!');
        }
        catch (e) {
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
    });
}
exports.addStudent = addStudent;
function getChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            // GET DOCS WITH THIS USER'S CHATS
            const chats = yield chat_1.default.find({ $or: [{ partyId1: data.user.id }, { partyId2: data.user.id }] });
            if (!chats.length)
                throw new Error();
            res.status(200);
            res.json(chats);
        }
        catch (error) {
            console.log(error);
            res.status(404);
            res.send('Failed to get chats');
        }
    });
}
exports.getChats = getChats;
function getAChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const requesterId = data.tutorId ? data.tutorId : data.user.id;
            // console.log(data);
            // console.log('Got a request for a chat');
            const chat = yield chat_1.default.findOne({ $or: [{ partyId1: requesterId, partyId2: data.party2Id }, { partyId1: data.party2Id, partyId2: requesterId }] });
            res.status(200);
            // console.log(chat);
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
            const requesterId = data.tutorId ? data.tutorId : data.user.id;
            const newMessage = {
                senderId: requesterId,
                timestamp: Date.now(),
                message: data.message
            };
            // NEED TO GET A USER ID OUT OF SECOND PARTY ID
            // const party2Id = await 
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
function getContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const type = req.params.type;
            console.log('Got a request for', type);
            const data = req.body;
            console.log('Request body', data);
            const ids = [];
            const contacts = [];
            if (type === 'students') {
                const chats = yield chat_1.default.find({ $or: [{ partyId1: data.tutorId }, { partyId2: data.tutorId }] });
                console.log('Got tutor id', data.tutorId);
                chats.forEach((chat) => {
                    if (chat.partyId1 === data.tutorId) {
                        ids.push(chat.partyId2);
                    }
                    else {
                        ids.push(chat.partyId1);
                    }
                });
                // TODO: FIX THE TYPE
                // USERS AND TUTORS/STUDENTS HAVE DIFFERENT IDS - REMEMBER THAT
                // FIX: THE ID-BASED LOGIC WORKS FOR STUDENTS, BUT NOT FOR TUTORS
                // CAN BE FIXED BY SECONDARY KEYS (IDS) IN THE MODELS OR... BY USING EMAIL AS UNIQUE IDENTIFIER
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
            else if (type === 'tutors') {
                const chats = yield chat_1.default.find({ $or: [{ partyId1: data.user.id }, { partyId2: data.user.id }] });
                chats.forEach((chat) => {
                    if (chat.partyId1 === data.user.id) {
                        ids.push(chat.partyId2);
                    }
                    else {
                        ids.push(chat.partyId1);
                    }
                });
                yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                    const record = yield tutor_1.Tutor.findById(id);
                    console.log(id);
                    console.log(record);
                    contacts.push(record);
                })))
                    .then(() => {
                    console.log(`Found ${contacts.length} contacts`);
                    console.log(contacts);
                    res.status(200);
                    res.json(contacts);
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404);
            res.send('Failed to get contacts');
        }
    });
}
exports.getContacts = getContacts;
