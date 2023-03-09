import { UserTokenRepository } from './../typeorm/repositories/UserTokenRepositories';
import  AppError  from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UsersRepositories';
import EmailService from './EmailService';

interface IRequest {
    email: string;
}
export default class SendForgotPasswordService {
    async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokenRepository)
        const userByEmail = await userRepository.findByEmail(email);
         
        if (!userByEmail) throw new AppError('User does not exists.');

        const token = await userTokensRepository.generate(userByEmail.id)
        
        const sendEmail = new EmailService();
        
        await sendEmail.sendEmail(userByEmail.email, token.token);
    }
}
