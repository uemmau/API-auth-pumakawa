import { Router } from 'express';
import * as controllers from '../controllers/cIndex.js';

const dataRouter = Router();

dataRouter.get('/data', controllers.authMidware, controllers.fetchData);

export default dataRouter;
