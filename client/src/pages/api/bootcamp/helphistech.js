import nodemailer from 'nodemailer';
// mail template
import template from '@/hooks/emailTemplates/bootcamp';

export default async function handler(req, res) {
    const { name, surname, country, phoneNumber, email, age, howYouKnowUs, gender, bootcamp, schedule, motivation } = req.body || {};

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
            to: "info@helphistech.com",
            subject: `Nuevo alumno para Bootcamp`,
            text: ``,
            html: template.helphistech({ name, surname, country, phoneNumber, email, age, howYouKnowUs, gender, bootcamp, schedule, motivation })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}