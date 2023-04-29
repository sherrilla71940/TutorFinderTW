import {Router} from 'express';
const router = Router();
import * as controller from './mvc/controllers/controllers';
import registerUser from './mvc/controllers/signup';

router.get('/', controller.getAllTutors);
router.get('/:id', controller.getTutor);
router.post('/', controller.addTutor);
router.put('/:id', controller.updateTutor);
router.delete('/:id', controller.deleteTutor);

router.post('/signup', registerUser);

export default router;