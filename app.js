import express from 'express';
import router from './src/routes/rIndex.js';
import authRoute from './src/routes/auth.js';

const app = express();
app.use(express.json());

app.use('/', router);
app.use('/auth', authRoute);

export default app;