import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import express, {
    json,
    urlencoded
} from 'express';

import { requestLogger, errorLogger  } from './middlewares';
import { configApi } from './config';
import { logger } from './utils';
import productRouter from './routes/product.routes';

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true  }));
app.use(json());

app.use(requestLogger);
app.use(errorLogger);
//app.use(celebrate());

app.use('/', productRouter);

async function startServer() {
    try {
        const DB_HOST = configApi.get<string>('database.host')
        const SERVER_PORT = configApi.get<number>('server.port');
        
        await mongoose.connect(DB_HOST)
            .then(() => logger.info('[MONGO_DB] connect done'))
            .catch(() => logger.error('[MONGO_DB] error connect'));
       
        app.listen(SERVER_PORT, () => logger.info(`[SERVER]: start server on PORT: ${SERVER_PORT}`));
    } catch (err) {
        logger.error(`start server`);
    }
}

startServer();

