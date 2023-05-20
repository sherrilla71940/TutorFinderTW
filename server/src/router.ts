import { Router, request, response } from 'express';
const router = Router();
import * as controller from './mvc/controllers/controllers';
import registerUser, { loginUser } from './mvc/controllers/auth';
import { verifyToken } from './mvc/verify';
import { updateUserDetails } from './mvc/controllers/controllers';
import { serveImage } from './mvc/controllers/image_handler';

router.get('/', (request, response) => response.send("Hello!"));
router.get('/tutors', verifyToken, controller.getAllTutors);
router.get('/contacts', verifyToken, controller.getContacts);
router.get('/images/:filename', serveImage);

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.put('/updateuserinfo', verifyToken, updateUserDetails)
router.post('/chat', verifyToken, controller.getAChat);
router.post('/postmessage', verifyToken, controller.postMessage);

export default router;