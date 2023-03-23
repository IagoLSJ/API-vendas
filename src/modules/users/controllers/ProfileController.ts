import { Request, Response } from 'express';
import { ShowUserService } from '../services/ShowUserService';
import { UpdateProfileServcive } from '../services/UpdateProfileService';
import {classToClass} from 'class-transformer'
export default class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const showUser = new ShowUserService();
        const { id } = request.user;
        const user = await showUser.execute({ id });

        return response.json(classToClass(user));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, old_password } = request.body;
        const { id } = request.user;

        const updateProfile = new UpdateProfileServcive();

        const userUpdated = await updateProfile.execute({
            id,
            name,
            email,
            password,
            old_password,
        });

        return response.json(classToClass(userUpdated));
    }
}
