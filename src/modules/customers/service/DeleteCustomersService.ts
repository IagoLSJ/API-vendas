import CustomerRepository from './../typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}
export class DeleteCustomertService {
    async execute({ id }: IRequest): Promise<void> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customertById = await customerRepository.findOne(id);

        if (!customertById) throw new AppError('Customer not fund.');

        await customerRepository.remove(customertById);
    }
}
