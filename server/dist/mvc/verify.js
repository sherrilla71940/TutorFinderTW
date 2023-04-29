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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = request.get('Authorization');
            if (!token) {
                response.status(403);
                response.send('Access denied');
                return;
            }
            else {
                // TODO: HIDE SECRET
                const decrypt = jsonwebtoken_1.default.verify(token, 'shrek');
                console.log(decrypt);
                request.body.user = decrypt;
                next();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.verifyToken = verifyToken;
