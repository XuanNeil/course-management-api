import { Router } from 'express';
import { authRouter } from './auth_router';

// Constants
const router: Router = Router();

// Paths
router.use('/auth', authRouter);

export const mainRouters: Router = router;
