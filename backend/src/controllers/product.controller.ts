import { type NextFunction, type Request, type Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { ServerError, BedRequest, ObjectExists } from '../error';
import Product from '../models/product';

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => Product.find({})
  .then((users) => res.send({
    items: { ...users },
    total: users.length,
  }))
  .catch((err) => next(new ServerError(err.message)));

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title,
    image,
    category,
    description,
    price,
  } = req.body;

  return Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then(() => res.send('Продукт создан'))
    .catch((err) => {
      if (err instanceof Error && err.message.includes('E11000')) {
        next(new ObjectExists('Such a product already exists'));
      }
      if (err instanceof MongooseError) {
        next(new BedRequest('Incorrect data'));
      }
      return next(new ServerError(err.message));
    });
};
