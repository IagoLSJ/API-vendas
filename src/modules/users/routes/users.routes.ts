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
            old_password: Joi.string().min(8),
            password: Joi.string().optional(),
            password_confirmaation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    isAutheticated,
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    isAutheticated,
    upload.single('avatar'),
    usersAvatarController.update,
);

export default usersRouter;
