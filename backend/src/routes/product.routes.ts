import { Router, type Request, type Response  } from 'express';

import { productRouterValidation  } from '../utils';
import { getAllProducts, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', productRouterValidation, createProduct);

export default router;

