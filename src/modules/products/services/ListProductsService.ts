import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';

export class ListProductService {
    async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
             products = await productsRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        return products;
    }
}
