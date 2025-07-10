import mongoose from 'mongoose';
import { type Request, type Response } from 'express';

import { app, PORT, DB_ADDRESS } from './config';

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

async function startServer() {
    try {
        await mongoose.connect(DB_ADDRESS)
            .then(() => console.log('[MONGO_DB] connect'));
        app.listen(PORT, () => console.log('[SERVER]: start server on PORT: ', PORT));
    } catch (err) {
        console.error(err);
    }
}

startServer();

