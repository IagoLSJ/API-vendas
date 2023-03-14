import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

export class CreateCustomerService {
    async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomerRepository);
        const customerByEmail = await customersRepository.findByEmail(email);

        if (customerByEmail) throw new AppError('Email address already exists');


        const customerCreated = customersRepository.create({
            name,
            email,
        });

        await customersRepository.save(customerCreated);

        return customerCreated;
    }
}
