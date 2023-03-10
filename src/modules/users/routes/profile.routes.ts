import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAutheticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/', isAutheticated, profileController.show);

profileRouter.put(
    '/profile',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            old_password: Joi.string().min(8).required(),
        },
    }),
    isAutheticated,
    profileController.update,
);

export default profileRouter;
