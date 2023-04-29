"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// (async function () {
//   try {
//     await connect('mongodb://127.0.0.1/user');
//     console.log('Connected to the database');
//   } catch (e) {
//     console.log(e, 'Failed to connect to the database')
//   }
// })()
const Schema = mongoose_1.default.Schema; // CLASS
const userSchema = new Schema({
    // DEFINE OUR DATA
    name: String,
    email: String,
    type: String,
    password: String
});
const Users = mongoose_1.default.model('users', userSchema); // MAKE A 'TABLE' BASED ON A SCHEMA
exports.default = Users;
