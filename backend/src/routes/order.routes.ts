import { Router, type Request, type Response  } from 'express';

import { orderRouterValidation  } from '../utils';
import { createOrder  } from '../controllers/order.controller';

const router = Router();

router.post('/order', orderRouterValidation, createOrder);

export default router;

