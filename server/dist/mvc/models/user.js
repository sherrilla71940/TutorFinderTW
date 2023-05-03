"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Schema = exports.mongooseInstance = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.mongooseInstance = mongoose_1.default;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)('mongodb://127.0.0.1/tutor');
            console.log('Connected to the database');
        }
        catch (error) {
            console.log('Failed to connect to the database');
        }
    });
})();
exports.Schema = exports.mongooseInstance.Schema;
const BranchSchema = new exports.Schema({
    branch: String,
    hourlyRate: Number
}, { _id: false });
const SubjectSchema = new exports.Schema({
    subject: String,
    branches: [BranchSchema],
}, { _id: false });
const TutorSchema = new exports.Schema({
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
        type: exports.Schema.Types.Mixed,
        required: false
    },
    availability: {
        type: exports.Schema.Types.Mixed,
        required: false
    }
});
const UserSchema = new exports.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
    isComplete: { type: Boolean, required: true },
    age: Number,
    selfIntroduction: String,
    profilePicUrl: String,
    tutorDetails: {
        type: TutorSchema
    }
});
const Users = exports.mongooseInstance.model('users', UserSchema);
exports.default = Users;
