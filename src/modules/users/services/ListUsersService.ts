import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';

export class ListUsersService {
    async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();

        return users;
    }
}
