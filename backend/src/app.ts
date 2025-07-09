import mongoose from 'mongoose';
import express, { json, type Request, type Response } from 'express';
import cors from 'cors';

const app = express();

const { PORT = 3000 } = process.env;

app.use(json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/weblarek');

app.get('/ping', (req: Request, res: Response) => {
    res.send('ping');
})

app.listen(PORT, () => console.log('start server on PORT: ', PORT))

