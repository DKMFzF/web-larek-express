import { type Request, type Response  } from 'express';

import Product from '../models/product';

export const getAllProducts = (req: Request, res: Response) => {
    Product.find({})
        .then((users) => res.send(users))
        .catch((err) => res.status(405).send(err));
}

export const createProduct = (req: Request, res: Response) => {
    const {
        title,
        image,
        category,
        description,
        price
    } = req.body;

    Product.create({
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
        .catch((err) => res.send(err));
}

