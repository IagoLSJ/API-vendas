import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

interface ICreateProduct {
    name: string;
    price: number;
    quantity: number;
}

export class CreateProductService {
    async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);  
        const productByName = await productsRepository.findByName(name);

        if (productByName) {
            throw new AppError('Product name already exists');
        }
        
        const product =  productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);
        await redisCache.invalidate('api-vendas-PRODUCT_LIST')
        return product;
    }
}
