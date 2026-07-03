import { Router } from 'express';
import * as controllers from '../controllers/cIndex.js';

const loginRouter = Router();

loginRouter.get('/login', controllers.loginMenu);
loginRouter.post('/login', controllers.loginAuth);

export default loginRouter;

