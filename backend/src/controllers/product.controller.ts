import { type NextFunction, type Request, type Response  } from 'express';

import Product from '../models/product';

export const getAllProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => Product.find({})
        .then((users) => res.send({
            items: {
                ...users
            },
            total: users.length
        }))
        .catch((err) => next(err));


export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        title,
        image,
        category,
        description,
        price
    } = req.body;

    return Product.create({
        title,
        image,
        category,
        description,
        price
    })
        .then((user) => {
            if (!user) return Promise.reject(new Error('Ошибка создания продукта'));
            return res.send('Продукт создан');
        })
        .catch((err) => next(err));
}

