import nodemailer from 'nodemailer';
// mail template
import pricingTemplate from '@/hooks/emailTemplates/pricing';

export default async function handler(req, res) {
    const { pricing, name, email, phoneNumber, description } = req.body || {};

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
            from: `"${name}" <${email}>`,
            to: "helphis.tech@gmail.com",
            subject: `${name} está interesado/a en un plan de HelphisTech`,
            text: `${name} está interesado/a en un plan de HelphisTech\n
                Plan: ${pricing.plan}\n
                Acerca del proyecto: ${description}\n
                Información de contacto:\n
                Nombre: ${name}
                Correo electrónico: ${email}
                Número de teléfono: ${phoneNumber}
            `,
            html: pricingTemplate({ pricing, name, email, phoneNumber, description })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}