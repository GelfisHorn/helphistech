import nodemailer from 'nodemailer';
// mail template
import template from '@/hooks/emailTemplates/blogModal';

const lang = {
    "de": {
        "title": "Ein Kunde möchte ein Projekt starten",
        "description": "Es gibt einen Kunden, der daran interessiert ist, ein Projekt mit HelphisTech zu starten.",
        "type": "Projekttyp:",
        "functionalities": "Merkmale:",
        "message": "Nachricht:",
        "contact": {
            "title": "Kontaktinformationen",
            "name": "Name: ",
            "email": "Email: ",
            "phone": "Telefonnummer: "
        }
    },
    "en": {
        "title": "A client wants to start a project",
        "description": "There is a client interested in starting a project with HelphisTech.",
        "type": "Project Type:",
        "functionalities": "Features:",
        "message": "Message:",
        "contact": {
            "title": "Contact information",
            "name": "Name: ",
            "email": "Email: ",
            "phone": "Phone number: "
        }
    },
    "es": {
        "title": "Un cliente quiere empezar un proyecto",
        "description": "Hay un cliente interesado en empezar un proyecto con HelphisTech.",
        "type": "Tipo de proyecto:",
        "functionalities": "Funcionalidades:",
        "message": "Mensaje:",
        "contact": {
            "title": "Información de contacto",
            "name": "Nombre: ",
            "email": "Correo electrónico: ",
            "phone": "Número de teléfono: "
        }
    }
}

export default async function handler(req, res) {
    const { project, contact, language } = req.body || {};

    const { type, functionalities, message } = project;
    const { name, phone, email } = contact;

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
            to: "helphis.tech@gmail.com",
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
                ${lang[language].contact.title}\n
                ${lang[language].contact.name}${name}\n
                ${lang[language].contact.email}${email}\n
                ${lang[language].contact.phone}${phone}\n
            `,
            html: template.fromHome({ project, contact, lang: lang[language] })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}