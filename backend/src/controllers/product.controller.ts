import { type NextFunction, type Request, type Response  } from 'express';
import { celebrate, Joi, Segments  } from 'celebrate';

import { TProduct } from '../models/product';
import Product from '../models/product';

// схема для валидации
const productShema = Joi.object<TProduct>({
    title: Joi.string().required().min(2).max(30),
    image: {
        fileName: Joi.string(),
        originalName: Joi.string(),
    },
    category: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().allow(null)
});

export const productRouterValidation = celebrate({
    [Segments.BODY]: productShema
});

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

