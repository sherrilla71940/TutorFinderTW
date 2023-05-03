"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const BranchSchema = new user_1.Schema({
    branch: String,
    hourlyRate: Number
}, { _id: false });
const SubjectSchema = new user_1.Schema({
    subject: String,
    branches: [BranchSchema],
}, { _id: false });
const TutorSchema = new user_1.Schema({
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
    teachingLocations: {
        type: user_1.Schema.Types.Mixed,
        required: false
    },
    availability: {
        type: user_1.Schema.Types.Mixed,
        required: false
    }
});
const Tutors = user_1.mongooseInstance.model('tutors', TutorSchema);
exports.default = Tutors;
