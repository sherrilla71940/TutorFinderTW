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
exports.serveImage = void 0;
const path_1 = __importDefault(require("path"));
function handleImage(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldPath = file.path;
        console.log('Image saved here:', oldPath);
        return oldPath;
    });
}
exports.default = handleImage;
function serveImage(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentPath = __dirname;
        const filename = request.params.filename;
        console.log(path_1.default.join(currentPath, `..\\..\\..\\uploads\\${filename}`));
        const image = path_1.default.join(currentPath, `..\\..\\..\\uploads\\${filename}`);
        // response.setHeader('Content-Type', 'image/*');
        response.sendFile(image);
    });
}
exports.serveImage = serveImage;