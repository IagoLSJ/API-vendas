import { ListCustomersService } from './../service/ListCustomersService';
import { Request, Response } from 'express';
import { ShowCustomerService } from '../service/ShowCustomersService';
import { CreateCustomerService } from '../service/CreateCustomersService';
import { UpdateCustomerServcive } from '../service/UpdateCustomerService';
import { DeleteCustomertService } from '../service/DeleteCustomersService';


export class CustomersController {
    async index(request: Request, response: Response): Promise<Response> {
        const listCustomers = new ListCustomersService();
        const customers = await listCustomers.execute();

        return response.json(customers);
    }

    async show(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({id});


        return response.json(customer)
    }

    async create(request: Request, response:Response): Promise<Response>{
        const {name, email,} = request.body;

        const createCustomer = new CreateCustomerService();

        const customerCreated = await createCustomer.execute({name, email});


        return response.json(customerCreated)
    }

    async update(request: Request, response:Response): Promise<Response>{
        const {name, email} = request.body;
        const {id} = request.params;
        const updateCustomer = new UpdateCustomerServcive();

        const customerUpdated = await updateCustomer.execute({id, name, email});


        return response.json(customerUpdated)
    }

    async delete(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const deleteCustomer = new DeleteCustomertService();

        await deleteCustomer.execute({id});


        return response.json([])
    }
}
