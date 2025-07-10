import { Router, type Request, type Response  } from 'express';

import { getAllProducts, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', createProduct);

export default router;

