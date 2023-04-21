import {Router} from 'express';
const router = Router();
import * as controller from './mvc/controllers/controllers';

router.get('/', controller.getAllTutors);
router.get('/:id', controller.getTutor);
router.post('/', controller.addTutor);
router.put('/:id', controller.updateTutor);
router.delete('/:id', controller.deleteTutor);

export default router;