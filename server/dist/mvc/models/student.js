"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // CLASS
const studentSchema = new Schema({
    // DEFINE OUR DATA
    name: String,
    profilePicUrl: String,
    age: Number,
    email: String,
    selfIntroduction: String
});
const Students = mongoose_1.default.model('students', studentSchema); // MAKE A 'TABLE' BASED ON A SCHEMA
exports.default = Students;
