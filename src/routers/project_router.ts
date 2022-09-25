import { Router } from 'express';
import { credentialMiddleware } from '../middlewares';
import { projectController } from '../controllers';

//constants
const router: Router = Router();

//paths
router.post('/create', credentialMiddleware.verify, projectController.create);

export const projectRouters: Router = router;
