import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepositories';
import { hash } from 'bcrypt';

interface IRequest {
    token: string;
    password: string;
}
export default class ResetPasswordService {
    async execute({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokenRepository);
        const userByToken = await userTokensRepository.findByToke(token);

        if (!userByToken) throw new AppError('User token does not exists.');

        const user = await userRepository.findById(userByToken.user_id);
        if (!user) throw new AppError('User does not exists.');

        const isValide = isAfter(
            Date.now(),
            addHours(userByToken.created_at, 2),
        );

        if (isValide) throw new AppError('Token expireded.');

        const newPassword = await hash(password, 10);

        await userRepository.update(user.id, { password: newPassword });
    }
}
