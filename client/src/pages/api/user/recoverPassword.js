import axios from "axios";
// Email sender
import nodemailer from 'nodemailer';
// Email template
import recoverPassword from "@/hooks/emailTemplates/recoverPassword";

const LANGUAGE = {
    "de": {
        "subject": "Stellen Sie Ihr Passwort wieder her",
        "body": "Stellen Sie Ihr Passwort über diesen Link wieder her"
    },
    "en": {
        "subject": "Recover your password",
        "body": "Recover your password through this link"
    },
    "es": {
        "subject": "Recupera tu contraseña",
        "body": "Recupera tu contraseña a traves este enlace"
    }
}

export default async function handler(req, res) {
    const { email, lang } = req.body;

    try {
        // Create token on database
        const { data } = await axios.request({
            method: 'POST',
            url: `${process.env.SERVER_URI}/v1/${lang}/users/reset-password`,
            data: { email }
        })
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
            subject: LANGUAGE[lang].subject,
            text: `Recover your password through this link: https://helphistech.com/new-password/${data.token}
            `,
            html: recoverPassword({ token: data.token, lang })
        });
        // Return response
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        const resError = new Error(error?.response?.data?.msg || "There was an error")
        return res.status(400).json({ msg: resError.message });
    }
}