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
exports.updateTutor = exports.deleteTutor = exports.getTutor = exports.addTutor = exports.getAllTutors = void 0;
const tutor_1 = require("./models/tutor");
function getAllTutors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json('hello');
    });
}
exports.getAllTutors = getAllTutors;
function addTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTutorData = req.body;
            const newTutor = new tutor_1.Tutor(newTutorData);
            // await newTutor.save((e) => {
            //   if (e) throw new Error();
            // });
            console.log(newTutor);
            res.status(200);
            res.json(newTutor);
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.addTutor = addTutor;
function getTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // return 'hello'
    });
}
exports.getTutor = getTutor;
function deleteTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // return 'hello'
    });
}
exports.deleteTutor = deleteTutor;
function updateTutor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // return 'hello'
    });
}
exports.updateTutor = updateTutor;
