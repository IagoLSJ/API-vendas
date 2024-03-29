import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListUsersService } from '../services/ListUsersService';

export class UsersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute();

        return response.json(classToClass(users));
    }

    

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const userCreated = await createUser.execute({
            name,
            email,
            password,
        });

        return response.json(classToClass(userCreated));
    }

   
}
