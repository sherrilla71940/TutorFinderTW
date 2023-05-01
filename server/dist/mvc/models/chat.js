"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // CLASS
const messageSchema = new Schema({
    senderId: String,
    timestamp: Number,
    message: String
});
const chatSchema = new Schema({
    partyId1: String,
    partyId2: String,
    messageLog: [messageSchema]
});
const Chats = mongoose_1.default.model('chats', chatSchema); // MAKE A 'TABLE' BASED ON A SCHEMA
exports.default = Chats;
