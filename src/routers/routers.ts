import { Router } from 'express';
import { authRouter } from './auth_router';
import { courseRouter } from './course_router';

// Constants
const router: Router = Router();

// Paths
router.use('/auth', authRouter);
router.use('/course', courseRouter);

export const mainRouters: Router = router;
