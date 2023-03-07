import { Request, Response } from 'express';
import {SessionUserService} from '../services/CreateSessionsService'
export class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const {email, password} = request.body;

        const session = new SessionUserService();

        const userSession = await session.execute({ email, password});


        return response.json(userSession)
    }
}
