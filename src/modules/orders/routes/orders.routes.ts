import { Router } from 'express';
import { OrdersController } from '../controllers/OrderController';
import { celebrate, Joi, Segments } from 'celebrate';

const orderRouter = Router();
const ordersController = new OrdersController();

orderRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    ordersController.show,
);

orderRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.array().required()
        },
    }),
    ordersController.create,
);

export default orderRouter;
