import express, { urlencoded, json} from 'express';
import cors from 'cors';

export const {
    PORT = 3000,
    DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek',
} = process.env;

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true  }));
app.use(json());

export { app };

