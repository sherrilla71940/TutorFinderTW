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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const image_handler_1 = __importDefault(require("./image_handler"));
function registerUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = request.file;
            const imagePath = yield (0, image_handler_1.default)(file);
            console.log('Image ID:', imagePath);
            const newUser = JSON.parse(request.body.data);
            newUser.picPath = imagePath;
            // CHECK FOR DUPLICATE EMAILS
            const emailCheck = yield user_1.default.findOne({ email: newUser.email });
            console.log(emailCheck);
            if (emailCheck) {
                response.status(400);
                response.send('Please provide another e-mail address');
            }
            else {
                console.log(newUser);
                const salt = yield bcrypt_1.default.genSalt(10);
                const passwordHash = yield bcrypt_1.default.hash(newUser.password, salt);
                const newUserRecord = newUser;
                newUserRecord.password = passwordHash;
                const save = yield user_1.default.create(newUserRecord)
                    .then(() => {
                    console.log('here', newUserRecord);
                    response.status(200);
                    response.send('You can now login with your credentials');
                });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500);
            response.send('Failed to register a new user');
        }
    });
}
exports.default = registerUser;
function loginUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = request.body;
            const userCheck = yield user_1.default.findOne({ email: user.email });
            if (!userCheck) {
                response.status(400);
                response.send('Invalid credentials');
            }
            else {
                const passwordCheck = bcrypt_1.default.compare(user.password, userCheck.password);
                if (!passwordCheck) {
                    response.status(400);
                    response.send('Invalid credentials');
                }
                else {
                    console.log('Successful login!');
                    // TODO: HIDE SECRET
                    const token = jsonwebtoken_1.default.sign({ id: userCheck._id }, 'shrek');
                    const userData = userCheck;
                    userData.password = "";
                    response.status(200);
                    response.json({ token, userData });
                }
            }
        }
        catch (error) {
            console.log(error);
            response.status(500);
            response.send('Authentication error');
        }
    });
}
exports.loginUser = loginUser;
