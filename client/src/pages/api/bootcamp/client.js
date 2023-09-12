import nodemailer from 'nodemailer';
// mail template
import template from '@/hooks/emailTemplates/bootcamp';

export default async function handler(req, res) {
    const { email } = req.body || {};

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"HelphisTech" <helphis.tech@gmail.com>`,
            to: email,
            subject: `Hemos recibido tu petición para unirte a nuestro Bootcamp!`,
            text: `Gracias por enviar una petición para unirte a nuestro Bootcamp, nos pondremos en contacto contigo lo antes posible!`,
            html: template.client()
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}