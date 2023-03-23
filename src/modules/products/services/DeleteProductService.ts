import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
interface IRequest {
    id: string;
}
export class DeleteProductService {
    async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const productById = await productsRepository.findOne(id);

        if (!productById) throw new AppError('Product not fund.');

        await productsRepository.remove(productById);
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    }
}
