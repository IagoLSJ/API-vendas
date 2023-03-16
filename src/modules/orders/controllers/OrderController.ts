import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService.ts';

export class OrdersController {

    async show(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({id});


        return response.json(order)
    }

    async create(request: Request, response:Response): Promise<Response>{
        const {customer_id, products} = request.body;

        const createOrder = new CreateOrderService();

        const orderCreated = await createOrder.execute({customer_id, products});


        return response.json(orderCreated)
    }

}
