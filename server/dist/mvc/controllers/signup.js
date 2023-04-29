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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
function registerUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = request.body;
            console.log(newUser);
            const salt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield bcrypt_1.default.hash(newUser.password, salt);
            const newUserRecord = newUser;
            newUserRecord.password = passwordHash;
            const save = yield user_1.default.create(newUserRecord)
                .then(() => {
                response.status(200);
                response.send('OK!');
            });
        }
        catch (error) {
            console.error(error);
            response.send('Failed to register a new user');
        }
    });
}
exports.default = registerUser;
