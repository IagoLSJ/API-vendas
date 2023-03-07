import { DeleteProductService } from '../services/DeleteProductService';
import { CreateUserService } from '../services/CreateUserService';
import { Request, Response } from 'express';
import { ListUsersService } from '../services/ListUsersService';
import { ShowProductService } from '../services/ShowUserService';

export class UsersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUsersService();
        const users = await listUsers.execute();

        return response.json(users);
    }

    async show(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const showProducts = new ShowProductService();

        const product = await showProducts.execute({id});


        return response.json(product)
    }

    async create(request: Request, response:Response): Promise<Response>{
        const {name, email, password} = request.body;

        const createUser = new CreateUserService();

        const userCreated = await createUser.execute({name, email, password});


        return response.json(userCreated)
    }

   

    async delete(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const deleteProducts = new DeleteProductService();

        await deleteProducts.execute({id});


        return response.json([])
    }
}
