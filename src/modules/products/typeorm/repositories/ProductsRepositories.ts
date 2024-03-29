import { Repository, EntityRepository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
    id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id);

        return await this.find({
            where: {
                id: In(productsIds),
            },
        });
    }
}
