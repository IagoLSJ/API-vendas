import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
export class UpdateProductService {
    async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const productById = await productsRepository.findOne(id);

        if (!productById) throw new AppError('Product not fund.');

        const productByName = await productsRepository.findByName(name);

        if (productByName && name != productById.name) throw new AppError('Product name already exists');

        productById.name = name;
        productById.price = price;
        productById.quantity = quantity;

        await productsRepository.save(productById)
        await redisCache.invalidate('api-vendas-PRODUCT_LIST')
        return productById;
    }
}
