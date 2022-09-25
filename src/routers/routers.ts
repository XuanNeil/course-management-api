import { Router } from 'express';
import { authRouters } from './auth_router';
import { courseRouters } from './course_router';
import { projectRouters } from './project_router';

// Constants
const router: Router = Router();

// Paths
router.use('/auth', authRouters);
router.use('/course', courseRouters);
router.use('/project', projectRouters);

export const mainRouters: Router = router;
