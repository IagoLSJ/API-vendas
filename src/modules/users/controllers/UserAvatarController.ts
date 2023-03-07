import { Request, Response } from 'express';
import { UploadProductService } from '../services/UploadUserAvatarService';

export class UsersAvatarController {
    async update(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UploadProductService();

        const user = await updateAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file != undefined ? request.file.filename : '',
        });

        return response.json(user);
    }
}
