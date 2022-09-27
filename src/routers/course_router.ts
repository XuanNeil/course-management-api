import { Router } from 'express';
import { courseController } from '../controllers';
import { authMiddleware } from '../middlewares';

// Constants
const router: Router = Router();

// Paths
router.post('/create', authMiddleware.verify, courseController.create);
router.get('/list', authMiddleware.verify, courseController.list);
router.get('/:course_id', authMiddleware.verify, courseController.detail);
router.put('/:course_id/update', authMiddleware.verify, courseController.update);
router.delete('/:course_id/delete', authMiddleware.verify, courseController.delete);

export const courseRouters: Router = router;
