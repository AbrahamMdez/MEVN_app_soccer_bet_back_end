import express from 'express';
import morgan from 'morgan';
import { config as dotenv } from 'dotenv';
import cors from 'cors';
import path from 'path';
//We have to say to ES6 how __dirname works
const __dirname = path.resolve();

import { createRoles } from '../../libs/initialSetup.js';

import authRoutes from '../../routes/auth.routes.js';
import userRoutes from '../../routes/user.routes.js';

const app = express();
createRoles();

app.set('port', process.env.PORT || 3000);

dotenv();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

export default app;