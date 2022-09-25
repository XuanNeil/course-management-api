import { Router } from 'express';
import { authController } from '../controllers';

// Constants
const router: Router = Router();

// Paths
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh_token', authController.refreshToken);

export const authRouters: Router = router;
