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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Questions:
1. Whenver I save file, TypeScript automatically changes my let declarations to const, how can i disable this without turning off strict in tsconfig
*/
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
const envFileAbsPath = path_1.default.resolve(__dirname, "../../.env");
const dotenv = __importStar(require("dotenv"));
console.log(envFileAbsPath);
dotenv.config({ path: envFileAbsPath });
const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(port, () => {
    console.log(`app listening at http://${host}:${port}`);
});
