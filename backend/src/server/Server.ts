import express from 'express';
import dotenv from 'dotenv';
import { router } from '../start/routes';
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router)

export { app }