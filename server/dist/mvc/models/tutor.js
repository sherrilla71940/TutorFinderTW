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
            yield (0, mongoose_1.connect)('mongodb://localhost/tutor');
            console.log('connected to database!');
        }
        catch (e) {
            console.log(e, 'unsuccessful connection to database');
        }
    });
})();
var Hour;
(function (Hour) {
    Hour["twelveAM"] = "00:00";
    Hour["oneAM"] = "01:00";
    Hour["twoAM"] = "02:00";
    Hour["threeAM"] = "03:00";
    Hour["fourAM"] = "04:00";
    Hour["fiveAM"] = "05:00";
    Hour["sixAM"] = "06:00";
    Hour["sevenAM"] = "07:00";
    Hour["eightAM"] = "08:00";
    Hour["nineAM"] = "09:00";
    Hour["tenAM"] = "10:00";
    Hour["elevenAM"] = "11:00";
    Hour["twelvePM"] = "12:00";
    Hour["onePM"] = "13:00";
    Hour["twoPM"] = "14:00";
    Hour["threePM"] = "15:00";
    Hour["fourPM"] = "16:00";
    Hour["fivePM"] = "17:00";
    Hour["sixPM"] = "18:00";
    Hour["sevenPM"] = "19:00";
    Hour["eightPM"] = "20:00";
    Hour["ninePM"] = "21:00";
    Hour["tenPM"] = "22:00";
    Hour["elevenPM"] = "23:00";
})(Hour || (Hour = {}));
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
    profileUrl: {
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
