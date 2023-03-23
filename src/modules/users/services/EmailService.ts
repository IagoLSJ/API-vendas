import nodemailer from 'nodemailer';
import mailConfig from '@config/mail/mailConfig';

export default class EmailService {
    async sendEmail(email: string, token:string) {

        const transport = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            auth: mailConfig.auth,
        });

        const message = {
            from: 'noreplay@API-vendas.com',
            to: email,
            subject: 'Recuperar senha',
            html: `<h1>Recuperar Senha</h1>
                <h3>Token: ${token}</h3>
            `,
        };

        await transport.sendMail(message);
    }
}
