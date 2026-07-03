import express from 'express';
import router from './src/routes/rIndex.js';

const app = express();
app.use(express.json());

app.use('/', router);
//app.use('/auth', authRoute);

export default app;