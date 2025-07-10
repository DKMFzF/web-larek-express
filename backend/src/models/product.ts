import mongoose from 'mongoose';

import { TProduct, TProductImage  } from '../utils';

const productShema = new mongoose.Schema<TProduct>({
    title: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 30,
        unique: true,
    },
    image: {
        type: {
            fileName: String,
            originName: String,
        },
        require: true
    },
    category: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        default: null,
    }
});

const Product = mongoose.model<TProduct>('product', productShema);

export default Product;

