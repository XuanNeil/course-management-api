import { Router } from 'express';
import { courseController } from '../controllers';

// Constants
const router: Router = Router();

// Paths
router.post('/create', courseController.create);

export const courseRouter: Router = router;
