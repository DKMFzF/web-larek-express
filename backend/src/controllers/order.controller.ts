import { type Request, type Response, type NextFunction  } from 'express';
import { faker  } from '@faker-js/faker';

import { BedRequest, NotFoundError } from '../error';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            total,
            items
        } = req.body;

        if (!items.length) return next(new BedRequest('Items Not Found'));

        let resTotal = 0;

        for (let i = 0; i < items.length; i++) {
            const product = await Product.findOne({ _id: items[i] });
            if (!product) return next(new NotFoundError('There is no such product'));
            if (!product.price) return next(new BedRequest('There is a priceless item in the list of goods'));
            resTotal += product.price;
        }

        if (resTotal !== total) return next(new BedRequest('The sum does not add up'));

        res.send({
            id: faker.string.uuid(),
            total: total,
        })
    } catch (err) {
        next(err);
    }
}

