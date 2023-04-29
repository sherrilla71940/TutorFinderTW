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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = __importStar(require("./mvc/controllers/controllers"));
const auth_1 = __importStar(require("./mvc/controllers/auth"));
const verify_1 = require("./mvc/verify");
// TODO: ADD PROPER ROUTES
router.get('/', verify_1.verifyToken, controller.getAllTutors);
router.get('/:id', verify_1.verifyToken, controller.getTutor);
router.post('/', verify_1.verifyToken, controller.addTutor);
router.put('/:id', verify_1.verifyToken, controller.updateTutor);
router.delete('/:id', verify_1.verifyToken, controller.deleteTutor);
router.post('/signup', auth_1.default);
router.post('/login', auth_1.loginUser);
exports.default = router;
