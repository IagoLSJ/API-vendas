import { UsersAvatarController } from './../controllers/UserAvatarController';
import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import isAutheticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);
usersRouter.get('/', isAutheticated, usersController.index);


usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    isAutheticated,
    upload.single('avatar'),
    usersAvatarController.update,
);

export default usersRouter;
