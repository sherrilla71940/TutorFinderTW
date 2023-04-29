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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutor = void 0;
const mongoose_1 = require("mongoose");
// IIFE to connect to mongoDB
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)('mongodb://127.0.0.1/tutor');
            console.log('connected to database!');
        }
        catch (e) {
            console.log(e, 'unsuccessful connection to database');
        }
    });
})();
// below are mongoose schema using ts types which we will use to create out tutor model
const BranchSchema = new mongoose_1.Schema({
    branch: String,
    hourlyRate: Number
}, { _id: false });
const SubjectSchema = new mongoose_1.Schema({
    subject: String,
    branches: [BranchSchema],
}, { _id: false });
const TutorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    selfIntroduction: String,
    remote: {
        type: Boolean,
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
        type: mongoose_1.Schema.Types.Mixed,
        required: false
    },
    availability: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false
    }
});
exports.Tutor = (0, mongoose_1.model)('Tutor', TutorSchema);
