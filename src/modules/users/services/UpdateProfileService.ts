import { UserRepository } from './../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
interface IRequest {
    id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}
export class UpdateProfileServcive {
    async execute({
        id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        // 1 get user and verifi if user os exist
        const userRepository = getCustomRepository(UserRepository);
        const userById = await userRepository.findById(id);

        if (!userById) throw new AppError('User does not exist');

        const emailAvailable = await userRepository.findByEmail(email);

        if (emailAvailable && emailAvailable.id != userById.id) {
            throw new AppError('There is aleready one user with this email');
        }

        if (password && !old_password)
            throw new AppError('Old password requered');

        if(password && old_password){
            const checkPassword = await compare(old_password, userById.password);

            if(!checkPassword) {
                throw new AppError('Old password does not maatch')
            }

            userById.password = await hash(password, 10);

        }

        userById.name = name;

        userById.email = email;

        await userRepository.save(userById);

        return userById;
    }
}
