import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';


interface IRequest {
    id: string;
}
export  class ShowOrderService {
    async execute({ id }: IRequest): Promise<Order> {
        const orderRepository = getCustomRepository(OrdersRepository);

        const orderById = await orderRepository.findById(id);

        if (!orderById) {
            throw new AppError('Order does not found');
        }

        return orderById;
    }
}
