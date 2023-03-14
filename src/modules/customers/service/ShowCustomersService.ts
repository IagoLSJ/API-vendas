import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}
export  class ShowCustomerService {
    async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customerById = await customerRepository.findById(id);

        if (!customerById) {
            throw new AppError('Customer does not found');
        }

        return customerById;
    }
}
