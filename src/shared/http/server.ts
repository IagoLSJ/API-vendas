import express, { NextFunction, Request, Response } from 'express';
import uploadConfig from '@config/upload';
import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import routes from './routes/index';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import '@shared/typeorm';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
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
            error_message: error.stack
        });
    },
);
const port =
    process.env.SERVER_PORT != undefined ? process.env.SERVER_PORT : 3000;
app.listen(port, () => {
    console.log('Server on');
});
