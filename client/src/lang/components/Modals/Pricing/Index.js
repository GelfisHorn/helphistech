const de = {
    title: "Kontaktinformationen",
    subtitle: "Jetzt benötigen wir nur noch Ihre Kontaktdaten",
    labels: {
        name: "Name",
        email: "E-Mail",
        phoneNumber: "Telefon",
        description: "Erzählen Sie uns von Ihrem Projekt oder Ihrer Idee"
    },
    legal: {
        text1: "Mit dem Absenden dieses Formulars stimme ich den",
        link1: {
            text: "Datenschutzbestimmungen",
            href: "/datenschutz"
        },
        text2: "und den",
        link2: {
            text: "rechtlichen Bestimmungen zu",
            href: "/impressum"
        }
    },
    submit: "Schicken",
    notifications: {
        error: {
            fields: "Sie müssen alle Felder ausfüllen",
            legal: "Sie müssen die rechtlichen Bedingungen akzeptieren, bevor Sie das Formular absenden",
            catch: "Es gab einen Fehler beim Abschicken des Formulars"
        },
        success: "Das Formular wurde erfolgreich versendet!"
    },
    plans: {
        basic: "Grundplan",
        pro: "Pro-Plan",
        premium: "Premium-Plan",
    }
}
const en = {
    title: "Contact information",
    subtitle: "Now we only need your contact details",
    labels: {
        name: "Name",
        email: "E-Mail",
        phoneNumber: "Phone number",
        description: "Tell us about your project or idea"
    },
    legal: {
        text1: "By submitting this form I agree to the",
        link1: {
            text: "Privacy Policy",
            href: "/datenschutz"
        },
        text2: "and the",
        link2: {
            text: "legal notice",
            href: "/impressum"
        }
    },
    submit: "Submit",
    notifications: {
        error: {
            fields: "You must fill in all the fields",
            legal: "You must accept the legal terms before submitting the form",
            catch: "There was an error submitting the form"
        },
        success: "The form was sent successfully!"
    },
    plans: {
        basic: "Basic plan",
        pro: "Pro plan",
        premium: "Premium plan",
    }
}
const es = {
    title: "Información del contacto",
    subtitle: "Ahora solo necesitamos tus datos de contacto",
    labels: {
        name: "Nombre",
        email: "Correo electrónico",
        phoneNumber: "Número de teléfono",
        description: "Cuéntanos acerca de tu proyecto o idea"
    },
    legal: {
        text1: "Al enviar este formulario acepto las",
        link1: {
            text: "políticas de privacidad",
            href: "/datenschutz"
        },
        text2: "y el",
        link2: {
            text: "aviso legal",
            href: "/impressum"
        }
    },
    submit: "Enviar",
    notifications: {
        error: {
            fields: "Debes llenar todos los campos",
            legal: "Debe aceptar los términos legales antes de enviar el formulario",
            catch: "Hubo un error el enviar el formulario"
        },
        success: "Se envió el formulario correctamente!"
    },
    plans: {
        basic: "Plan Básico",
        pro: "Plan Pro",
        premium: "Plan Premium",
    }
}

const LANG = {
    de,
    en,
    es
}

export {
    de,
    en,
    es
}

export default LANG;