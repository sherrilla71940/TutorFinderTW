"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var Schema = db_1.mongooseInstance.Schema;
var messageSchema = new Schema({
    senderId: String,
    timestamp: Number,
    message: String
});
var chatSchema = new Schema({
    partyId1: String,
    partyId2: String,
    messageLog: [messageSchema]
});
var Chats = db_1.mongooseInstance.model('chats', chatSchema);
exports.default = Chats;
