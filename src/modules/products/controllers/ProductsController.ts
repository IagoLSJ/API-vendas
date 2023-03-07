import { DeleteProductService } from './../services/DeleteProductService';
import { UpdateProductService } from './../services/UpdateProductService';
import { CreateProductService } from './../services/CreateProductService';
import { Request, Response } from 'express';
import { ListProductService } from '../services/ListProductsService';
import { ShowProductService } from '../services/ShowProductService';

export class ProductsController {
    async index(request: Request, response: Response): Promise<Response> {
        const listProducts = new ListProductService();
        const products = await listProducts.execute();

        return response.json(products);
    }

    async show(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const showProducts = new ShowProductService();

        const product = await showProducts.execute({id});


        return response.json(product)
    }

    async create(request: Request, response:Response): Promise<Response>{
        const {name, price, quantity} = request.body;

        const createProducts = new CreateProductService();

        const productCreated = await createProducts.execute({name, price, quantity});


        return response.json(productCreated)
    }

    async update(request: Request, response:Response): Promise<Response>{
        const {name, price, quantity} = request.body;
        const {id} = request.params;
        const updateProducts = new UpdateProductService();

        const productUpdated = await updateProducts.execute({id, name, price, quantity});


        return response.json(productUpdated)
    }

    async delete(request: Request, response:Response): Promise<Response>{
        const {id} = request.params;

        const deleteProducts = new DeleteProductService();

        await deleteProducts.execute({id});


        return response.json([])
    }
}
