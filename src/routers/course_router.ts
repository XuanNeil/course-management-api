import { Router } from 'express';
import { courseController } from '../controllers';
import { credentialMiddleware } from '../middlewares';

// Constants
const router: Router = Router();

// Paths
router.post('/create', credentialMiddleware.verify, courseController.create);
router.get('/list', credentialMiddleware.verify, courseController.list);
router.get('/:course_id', credentialMiddleware.verify, courseController.detail);
router.put('/:course_id/update', credentialMiddleware.verify, courseController.update);
export const courseRouter: Router = router;
