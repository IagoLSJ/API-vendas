import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';
import * as bcrypt from 'bcrypt';
interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const userByEmail = await usersRepository.findByEmail(email);

        if (userByEmail) throw new AppError('Email address already exists');

        const hashPassword = await bcrypt.hash(password, 10);

        const userCreated = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await usersRepository.save(userCreated);

        return userCreated;
    }
}
