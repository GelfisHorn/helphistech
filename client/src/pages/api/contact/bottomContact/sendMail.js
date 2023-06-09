import nodemailer from 'nodemailer';
// mail template
import blogFormTemplate from '@/hooks/emailTemplates/blogForm';

export default async function handler(req, res) {
    const { blogTitle, blogUrl, message, fullName, phone, email } = req.body || {};

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
            from: `"${fullName}" <${email}>`,
            to: "bar@example.com, baz@example.com",
            subject: `Nuevo contacto de Servicios`,
            text: `A ${fullName} le interesó un blog: https://helphistech.com/website/${blogUrl}\n\n
                ${message ? `Dejó un mensaje: ${message}` : `${fullName} no dejó ningún mensaje.`}\n\n
                Información de contacto:\n
                Correo electrónico: ${email}\n
                ${phone ? `Número de teléfono: ${phone}` : ""}
            `,
            html: blogFormTemplate({ blogTitle, blogUrl, message, fullName, phone, email })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}