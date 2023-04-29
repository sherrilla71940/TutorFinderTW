import {Router, response} from 'express';
const router = Router();
import * as controller from './mvc/controllers/controllers';
import registerUser, { loginUser } from './mvc/controllers/auth';
import { verifyToken } from './mvc/verify';

// TODO: ADD PROPER ROUTES
router.get('/', verifyToken, controller.getAllTutors);
router.get('/:id', verifyToken, controller.getTutor);
router.post('/', verifyToken, controller.addTutor);
router.put('/:id', verifyToken, controller.updateTutor);
router.delete('/:id', verifyToken, controller.deleteTutor);

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;