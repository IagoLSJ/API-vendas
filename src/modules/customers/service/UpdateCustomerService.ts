import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';
interface IRequest {
    id: string;
    name: string;
    email: string;
}
export class UpdateCustomerServcive {
    async execute({
        id,
        name,
        email,
    }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customerById = await customerRepository.findById(id);

        if (!customerById) throw new AppError('Customer not found');

        const emailAvailable = await customerRepository.findByEmail(email);

        if (emailAvailable && emailAvailable.id != customerById.id) {
            throw new AppError('There is aleready one user with this email');
        }

        customerById.name = name;

        customerById.email = email;

        await customerRepository.save(customerById);

        return customerById;
    }
}
