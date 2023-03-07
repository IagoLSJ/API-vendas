import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
interface IRequest {
    id: string;
}
export class ShowProductService {
    async execute({ id }: IRequest): Promise<Product > {
        const productsRepository = getCustomRepository(ProductRepository);

        const productById = await productsRepository.findOne(id);

        if (!productById) throw new AppError('Product not fund.');

        return productById;
    }
}
