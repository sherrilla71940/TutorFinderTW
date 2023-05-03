"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
// const storage = multer.memoryStorage()
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use((0, cors_1.default)({ origin: `*` }));
app.use(exports.upload.single('file'));
app.use(express_1.default.json());
app.use(router_1.default);
exports.default = app;
