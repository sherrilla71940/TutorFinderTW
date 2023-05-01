import {Router, response} from 'express';
const router = Router();
import * as controller from './mvc/controllers/controllers';
import registerUser, { loginUser, updateUserInfo } from './mvc/controllers/auth';
import { verifyToken } from './mvc/verify';

// LEGACY ROUTES
// TODO: ADD PROPER ROUTES
router.get('/', verifyToken, controller.getAllTutors);
router.get('/:id', verifyToken, controller.getTutor);
// THIS ROUTE CONFLICTS WITH USER UPDATE ROUTE
// router.put('/:id', verifyToken, controller.updateTutor);
router.delete('/:id', verifyToken, controller.deleteTutor);

// NEW TUTOR ROUTES
router.post('/newtutor', verifyToken, controller.addTutor);

// STUDENT ROUTES
router.post('/newstudent', verifyToken, controller.addStudent);

// USER SIGN-UP AND LOG IN ROUTES
router.post('/signup', registerUser);
router.post('/login', loginUser);

// UPDATE USER INFO ROUTE
router.put('/updateuserinfo', verifyToken, updateUserInfo)

// CHAT ROUTES
router.get('/chats', verifyToken, controller.getChats);
// GET A SPECIFIC CHAT
router.post('/chat', verifyToken, controller.getAChat);
router.post('/postmessage', verifyToken, controller.postMessage);

export default router;