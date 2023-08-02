import nodemailer from 'nodemailer';
// mail template
import servicesTemplate from '@/hooks/emailTemplates/services';

export default async function handler(req, res) {

    const { name, email, lang } = req.body || {};

    const message = {
        de: "Wir haben Ihre Informationen erhalten und werden uns so schnell wie möglich mit Ihnen in Verbindung setzen!",
        en: "We have received your information, we will contact you as soon as possible!",
        es: "hemos recibido tu información, nos pondremos en contacto contigo lo antes posible!"
    }

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
            subject: `${name}, ${message[lang]}`,
            text: `${name}, ${message[lang]}`,
            html: servicesTemplate.client({ name, message: message[lang] })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        console.log(error)
        const resError = new Error(error?.response?.data?.msg)
        return res.status(400).json({ msg: resError.message });
    }
}