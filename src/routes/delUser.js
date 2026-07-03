import { Router } from 'express';
import * as controllers from '../controllers/cIndex.js';

const delRouter = Router();

delRouter.get('/deleteUser', controllers.deleteMenu);
delRouter.post('/deleteUser', controllers.deleteScript)

export default delRouter;