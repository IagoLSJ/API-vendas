import { UserRepository } from './../typeorm/repositories/UsersRepositories';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs'
interface IRequest {
    userId: string;
    avatarFilename: string;
}
export class UploadProductService {
    async execute({ userId, avatarFilename }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findById(userId);

        if(!user) throw new AppError('User not fund')

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename;

        await userRepository.save(user)

        return user;
    }
}
