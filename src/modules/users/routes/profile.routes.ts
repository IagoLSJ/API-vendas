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
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(8),
            old_password: Joi.string().min(8),
        },
    }),
    isAutheticated,
    profileController.update,
);

export default profileRouter;
