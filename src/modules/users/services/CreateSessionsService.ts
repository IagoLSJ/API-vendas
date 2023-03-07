import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: User;
    token: string;
}

export class SessionUserService {
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UserRepository);
        const userByEmail = await usersRepository.findByEmail(email);

        if (!userByEmail)
            throw new AppError('Incorrect email/password combination.', 401);

        const comparePassword = await bcrypt.compare(
            password,
            userByEmail.password,
        );

        if (!comparePassword)
            throw new AppError('Incorrect email/password combination.', 401);

        const token = sign(
            {},
            authConfig.jwt.secret,
            {
                subject: userByEmail.id,
                expiresIn: authConfig.jwt.expiresIn,
            },
        );

        return {
            user: userByEmail,
            token,
        };
    }
}
