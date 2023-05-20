"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var db_1 = require("./db");
exports.Schema = db_1.mongooseInstance.Schema;
var BranchSchema = new exports.Schema({
    branch: String,
    hourlyRate: Number
}, { _id: false });
var SubjectSchema = new exports.Schema({
    subject: String,
    branches: [BranchSchema],
}, { _id: false });
var TutorSchema = new exports.Schema({
    userId: {
        type: String,
        required: true
    },
    subjects: {
        type: [SubjectSchema],
        required: true,
        _id: false
    },
    inPerson: {
        type: Boolean,
        required: true
    },
    remote: {
        type: Boolean,
        required: true
    },
    location: {
        type: String,
        required: false
    }
});
var UserSchema = new exports.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
    isComplete: { type: Boolean, required: true },
    age: Number,
    selfIntroduction: String,
    picPath: String,
    tutorDetails: {
        type: TutorSchema
    }
});
var Users = db_1.mongooseInstance.model('users', UserSchema);
exports.default = Users;
