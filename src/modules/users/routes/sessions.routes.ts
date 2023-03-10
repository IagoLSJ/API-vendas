import { Router } from 'express';
import { SessionsController } from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        },
    }),
    sessionsController.create,
);


export default sessionRouter;
