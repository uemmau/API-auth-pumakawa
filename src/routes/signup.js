import { Router } from 'express';
import * as controllers from '../controllers/cIndex.js';

const signupRouter = Router();

signupRouter.get('/signup', controllers.signupMenu);
signupRouter.post('/signup', controllers.signupScript);

export default signupRouter;

