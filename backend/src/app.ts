import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import express, { json, urlencoded, static as static_ } from 'express';
import path from 'path';

import {
  errorsHandler,
  requestLogger,
  errorLogger,
  errorNotFoundRoute,
} from './middlewares';
import { configApi } from './config';
import { logger, limiter } from './utils';

import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';
import { errors } from 'celebrate';

const app = express();

app.disable('x-powered-by');

app.use(static_(path.join(__dirname, 'public')));

app.use(helmet());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(limiter);

app.use(requestLogger);

app.use('/', productRouter);
app.use('/', orderRouter);
app.use(errorNotFoundRoute);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

async function startServer() {
  try {
    const DB_HOST = configApi.get<string>('database.host');
    const SERVER_PORT = configApi.get<number>('server.port');

    await mongoose
      .connect(DB_HOST)
      .then(() => logger.info('[MONGO_DB] connect done'))
      .catch(() => logger.error('[MONGO_DB] error connect'));

    app.listen(SERVER_PORT, () =>
      logger.info(`[SERVER]: start server on PORT: ${SERVER_PORT}`)
    );
  } catch (err) {
    logger.error(`start server`);
  }
}

startServer();
