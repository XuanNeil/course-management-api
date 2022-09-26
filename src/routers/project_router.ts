import { Router } from 'express';
import { credentialMiddleware } from '../middlewares';
import { projectController } from '../controllers';

//constants
const router: Router = Router();

//paths
router.post('/create', credentialMiddleware.verify, projectController.create);
router.put('/:project_id/update', credentialMiddleware.verify, projectController.update);
router.delete('/:project_id/delete', credentialMiddleware.verify, projectController.delete);
router.get('/list', credentialMiddleware.verify, projectController.list);
router.get('/:project_id', credentialMiddleware.verify, projectController.detail);

export const projectRouters: Router = router;
