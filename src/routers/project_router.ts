import { Router } from 'express';
import { authMiddleware } from '../middlewares';
import { projectController } from '../controllers';

//constants
const router: Router = Router();

//paths
router.post('/create', authMiddleware.verify, projectController.create);
router.put('/:project_id/update', authMiddleware.verify, projectController.update);
router.delete('/:project_id/delete', authMiddleware.verify, projectController.delete);
router.get('/list', authMiddleware.verify, projectController.list);
router.get('/:project_id', authMiddleware.verify, projectController.detail);

export const projectRouters: Router = router;
