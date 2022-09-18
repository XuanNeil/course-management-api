import { Router } from 'express';
import { authController } from '../controllers';

// Constants
const router: Router = Router();

// Paths
router.post('/login', authController.login);

export const authRouter: Router = router;
