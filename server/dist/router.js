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
// LEGACY ROUTES
// TODO: ADD PROPER ROUTES
router.get('/', verify_1.verifyToken, controller.getAllTutors);
router.get('/:id', verify_1.verifyToken, controller.getTutor);
// THIS ROUTE CONFLICTS WITH USER UPDATE ROUTE
// router.put('/:id', verifyToken, controller.updateTutor);
router.delete('/:id', verify_1.verifyToken, controller.deleteTutor);
// NEW TUTOR ROUTES
router.post('/newtutor', verify_1.verifyToken, controller.addTutor);
// STUDENT ROUTES
router.post('/newstudent', verify_1.verifyToken, controller.addStudent);
// USER SIGN-UP AND LOG IN ROUTES
router.post('/signup', auth_1.default);
router.post('/login', auth_1.loginUser);
// UPDATE USER INFO ROUTE
router.put('/updateuserinfo', verify_1.verifyToken, auth_1.updateUserInfo);
// CHAT ROUTES
router.get('/chats', verify_1.verifyToken, controller.getChats);
// GET A SPECIFIC CHAT
router.post('/chat', verify_1.verifyToken, controller.getAChat);
router.post('/postmessage', verify_1.verifyToken, controller.postMessage);
exports.default = router;
