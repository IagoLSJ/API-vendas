import { ProductRepository } from './../typeorm/repositories/ProductsRepositories';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';

export class ListProductService {
    async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find();

        return products;
    }
}
