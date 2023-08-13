import nodemailer from 'nodemailer';
// mail template
import contactFormTemplate from '@/hooks/emailTemplates/contactForm';

export default async function handler(req, res) {
    const { name, email, phoneNumber, description } = req.body || {};

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
            subject: `Nuevo cliente`,
            text: `${name} esta interesado en comenzar un proyecto con HelphisTech\n\n
                ${description ? `Dejó un mensaje: ${description}` : `${name} no dejó ningún mensaje.`}\n\n
                Información de contacto:\n
                Correo electrónico: ${email}\n
                ${phoneNumber ? `Número de teléfono: ${phoneNumber}` : ""}
            `,
            html: contactFormTemplate({ name, email, phoneNumber, description })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}