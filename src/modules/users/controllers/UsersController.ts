import { CreateUserService } from '../services/CreateUserService';
import { Request, Response } from 'express';
import { ListUsersService } from '../services/ListUsersService';

export class UsersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute();

        return response.json(users);
    }

    async create(request: Request, response:Response): Promise<Response>{
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const userCreated = await createUser.execute({name, email, password});


        return response.json(userCreated)
    }

}
