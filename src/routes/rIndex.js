import { Router } from 'express';
import loginRouter from './login.js';
import signupRouter from './signup.js';
import delRouter from './delUser.js';
import dataRouter from './data.js';

const route = Router();

route.get("/", (req, res) => {
    res.json({ text: "Testing" });
});

route.use(loginRouter);
route.use(signupRouter);
route.use(delRouter);
route.use(dataRouter);

export default route;