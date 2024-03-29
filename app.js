import express  from "express";
import 'dotenv/config';
import './src/database/conect.db.js'
import authRouter from './src/routes/auth.routes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).send('404')
    next();
});

app.listen(PORT, () => {
    console.log(`You have once again entered the world of survival horror! Good Luck!! Ohh! Also, the server is running on port http://localhost:${PORT} 😁`);
})