import express  from "express";
import 'dotenv/config';
import './src/database/conect.db.js'
import authRouter from './src/routes/auth.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log(`You have once again entered the world of survival horror! Good Luck!! Ohh! Also, the server is running on port http://localhost:${PORT} 😁`);
})