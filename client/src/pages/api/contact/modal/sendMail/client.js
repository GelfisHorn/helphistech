import nodemailer from 'nodemailer';
// mail template
import template from '@/hooks/emailTemplates/blogModal';

const lang = {
    "de": {
        "title": "Wir haben Ihre Anfrage erhalten!",
        "description": "Vielen Dank, dass Sie sich mit uns in Verbindung gesetzt haben. Wir werden an Ihrer Anfrage arbeiten und uns bald mit Ihnen in Verbindung setzen.",
        "from": "Ihr HelphisTech-Team.",
        "type": "Projekttyp:",
        "functionalities": "Merkmale:",
        "message": "Nachricht:"
    },
    "en": {
        "title": "We have received your request!",
        "description": "Thank you for contacting us. We will work on your request and get back to you soon.",
        "from": "From the HelphisTech team.",
        "type": "Project Type:",
        "functionalities": "Features:",
        "message": "Message:"
    },
    "es": {
        "title": "¡Hemos recibido su petición!",
        "description": "Gracias por contactarnos. Trabajaremos en su solicitud y nos pondremos en contacto con usted pronto.",
        "from": "Del equipo de HelphisTech.",
        "type": "Tipo de proyecto:",
        "functionalities": "Funcionalidades:",
        "message": "Mensaje:"
    }
}

export default async function handler(req, res) {
    const { email, project, language } = req.body || {};

    const { type, functionalities, message } = project;

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
            subject: `${lang[language].title}`,
            text: `
                ${lang[language].description}\n\n
                ${lang[language].type}\n
                ${type}\n\n
                ${lang[language].functionalities}\n
                ${functionalities.map(func => func)}
                \n\n
                ${lang[language].message}\n
                ${message}\n\n
            `,
            html: template.client({ project, lang: lang[language] })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}