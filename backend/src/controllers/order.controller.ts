import { type Request, type Response, type NextFunction  } from 'express';
import { faker  } from '@faker-js/faker';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            total,
            items
        } = req.body;

        let resTotal = 0;

        for (let i = 0; i < items.length; i++) {
            const product = await Product.findOne({ _id: items[i] });
            if (!product) return next(new Error('Такого товара нет'));
            if (!product.price) return next(new Error('Prict товара равен null'));
            resTotal += product.price;
        }

        if (resTotal !== total) return next(new Error('Сумма не сходится'));

        res.send({
            id: faker.string.uuid(),
            total: total,
        })
    } catch (err) {
        next(err);
    }
}

