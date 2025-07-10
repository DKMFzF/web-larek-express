export type TProductImage = {
    fileName: string;
    originName: string;
}

export type TProduct = {
    title: string;
    image: TProductImage;
    category: string;
    description: string;
    price: number;
}
