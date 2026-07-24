import { Router } from 'express';
import dataRouter from './data.js';

const route = Router();

route.get("/", (req, res) => {
    res.json({ text: "Testing" });
});

route.use(dataRouter);

export default route;