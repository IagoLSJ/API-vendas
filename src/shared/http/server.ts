import  uploadConfig  from '@config/upload';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);
app.use(errors());
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'Error',
                message: error.message,
            });
        }

        return response.status(500).json({
            status: 'Error',
            message: 'Internal server error',
        });
    },
);

app.listen(3000, () => {
    console.log('Server on');
});
