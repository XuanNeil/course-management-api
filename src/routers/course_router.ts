import { Router } from 'express';
import { courseController } from '../controllers';
import { credentialMiddleware } from '../middlewares';

// Constants
const router: Router = Router();

// Paths
router.post('/create', credentialMiddleware.verify, courseController.create);

export const courseRouter: Router = router;
