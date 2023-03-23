import AppError from '@shared/errors/AppError';
import { UserRepository } from './../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
interface IRequest {
    id: string;
}
export  class ShowUserService {
    async execute({ id }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const userById = await userRepository.findById(id);

        if (!userById) {
            throw new AppError('User does not exist');
        }
        return userById;
    }
}
