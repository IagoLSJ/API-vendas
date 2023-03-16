import Customer from '@modules/customers/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

interface IProduct {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {
    async findById(id: string): Promise<Order | undefined> {
        return await this.findOne(id, {
            relations: ['order_products', 'customer'],
        });
    }

    async createOrder({ customer, products }: IRequest): Promise<Order> {
        const orderCreated = this.create({
            customer,
            order_products: products,
        });

        await this.save(orderCreated)

        return orderCreated;
    }
}
