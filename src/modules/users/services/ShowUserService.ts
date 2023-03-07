import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
interface IRequest {
    id: string;
}
export class ShowProductService {
    async execute({ id }: IRequest): Promise<User> {
        const productsRepository = getCustomRepository(UserRepository);

        const productById = await productsRepository.findOne(id);

        if (!productById) throw new AppError('Product not fund.');

        return productById;
    }
}
