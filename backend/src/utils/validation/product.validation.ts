import { celebrate, Joi, Segments  } from 'celebrate';

import { type TProduct  } from '../types';

export const productShema = Joi.object<TProduct>({
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

