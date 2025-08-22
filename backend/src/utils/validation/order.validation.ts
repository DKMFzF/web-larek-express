import { celebrate, Joi, Segments } from 'celebrate';

import { TOrder } from '../types';

export const orderShema = Joi.object<TOrder>({
  payment: Joi.equal('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().required(),
});

export const orderRouterValidation = celebrate({
  [Segments.BODY]: orderShema,
});
