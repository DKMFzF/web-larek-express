import { type Request, type Response, type NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { BedRequest, NotFoundError } from '../error';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items } = req.body;

    if (!items.length) {
      return next(new BedRequest('Items Not Found'));
    }

    const products = await Promise.all(
      items.map((id: string) => Product.findOne({ _id: id })),
    );

    const resTotal = products.reduce((sum, product) => {
      if (!product) {
        next(new NotFoundError('There is no such product'));
        return sum;
      }
      if (!product.price) {
        next(new BedRequest('There is a priceless item in the list of goods'));
        return sum;
      }
      return sum + product.price;
    }, 0);

    if (resTotal !== total) {
      return next(new BedRequest('The sum does not add up'));
    }

    return res.send({
      id: faker.string.uuid(),
      total,
    });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
