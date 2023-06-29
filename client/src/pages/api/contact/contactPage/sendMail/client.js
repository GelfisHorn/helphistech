import nodemailer from 'nodemailer';
// mail template
import template from '@/hooks/emailTemplates/contactPage';

const lang = {
    "de": {
        "title": "Wir haben ihre Anfrage erhalten!",
        "subtitle": "Danke, dass Sie uns kontaktiert haben. Wir werden Ihre Anfrage bearbeiten und uns zeitnah bei Ihnen melden.",
        "from": "Vom HelphisTech-Team.",
        "projectName": "Projekt-/Firmenname",
        "fullName": "Vollständiger Name",
        "email": "Email",
        "projectType": "Projekttyp",
        "deliverTerm": "Lieferfrist",
        "targetPublic": "Zielpublikum",
        "businessType": "Unternehmensart",
        "vision": "Vision/Mission",
        "service": "Was bietet das Unternehmen",
        "functionalities": "Merkmale",
        "ecommerce": "E-Commerce-Funktionalitäten",
        "technologies": "Sprachen/Technologien",
        "management": "Geschäftsführer",
        "marketing": "Vermarktungsstrategie",
        "competitiors": "Mitbewerber-Websites",
        "description": "Projektbeschreibung",
        "company": {
            "business_type": {
                "retail": "Einzelhandel",
                "service": "Service",
                "manufacturing": "Herstellung"
            },
            "company_vision": {
                "increase-profitability": "Steigern Sie die Rentabilität",
                "enhance-customer-satisfaction": "Verbesserung der Kundenzufriedenheit",
                "promote-sustainability": "Nachhaltigkeit fördern"
            },
            "target_audience": {
                "children": "Kinder",
                "teenagers": "Teenager",
                "young-adults": "Junge Erwachsene",
                "adults": "Erwachsene",
                "seniors": "Senioren"
            },
            "service_or_product": {
                "products": "Produkte",
                "services": "Dienstleistungen"
            },
            "expected_deilvertime": {
                0: "weniger als 1 Monat",
                1: "Zwischen 1 und 3 Monaten",
                3: "Zwischen 3 und 6 Monaten",
                6: "Mehr als 6 Monate"
            }
        },
        "project": {
            "project_type": {
                "website": "Webseite",
                "ecommerce": "E-Commerce",
                "application": "Anwendung"
            },
            "functionalities": {
                "contact-form": "Kontakt Formular",
                "image-gallery": "Bildergalerie",
                "blog-section": "Blog-Bereich",
                "social-media-integration": "Social-Media-Integration"
            },
            "web_design_type": {
                "responsive": "Responsive",
                "specific-design": "Spezifisches Design"
            },
            "responsible_for_managing": {
                "client": "Klient",
                "developer": "Entwickler"
            },
            "marketing_strategy": {
                "social-media": "Soziale Netzwerke",
                "email-marketing": "Email",
                "SEO": "SEO",
            },
            "yes": "Ja",
            "no": "Nein"
        }
    },
    "en": {
        "title": "We have received your request!",
        "subtitle": "Thank you for contacting us. We will work on your request and get back to you soon.",
        "from": "From the HelphisTech team.",
        "projectName": "Project/company name",
        "fullName": "Full name",
        "email": "Email",
        "projectType": "Project Type",
        "deliverTerm": "Delivery term",
        "targetPublic": "Target audiences",
        "businessType": "Business Type",
        "vision": "Vision/mission",
        "service": "What does the company offer",
        "functionalities": "Features",
        "ecommerce": "E-Commerce functionalities",
        "technologies": "Languages/technologies",
        "management": "Management manager",
        "marketing": "Marketing strategy",
        "competitiors": "Competitor Websites",
        "description": "Project description",
        "company": {
            "business_type": {
                "retail": "Retail",
                "service": "Service",
                "manufacturing": "Manufacturing"
            },
            "company_vision": {
                "increase-profitability": "Increase profitability",
                "enhance-customer-satisfaction": "Improving customer satisfaction",
                "promote-sustainability": "Promote sustainability"
            },
            "target_audience": {
                "children": "Children",
                "teenagers": "Teenagers",
                "young-adults": "Young adults",
                "adults": "Adults",
                "seniors": "Seniors"
            },
            "service_or_product": {
                "products": "Products",
                "services": "Services"
            },
            "expected_deilvertime": {
                0: "Less than 1 month",
                1: "Between 1 and 3 months",
                3: "Between 3 and 6 months",
                6: "More than 6 months"
            }
        },
        "project": {
            "project_type": {
                "website": "Website",
                "ecommerce": "E-Commerce",
                "application": "Application"
            },
            "functionalities": {
                "contact-form": "Contact Form",
                "image-gallery": "Image gallery",
                "blog-section": "Blog section",
                "social-media-integration": "Social media integration"
            },
            "web_design_type": {
                "responsive": "Responsive",
                "specific-design": "Specific design"
            },
            "responsible_for_managing": {
                "client": "Client",
                "developer": "Developer"
            },
            "marketing_strategy": {
                "social-media": "Social networks",
                "email-marketing": "Email",
                "SEO": "SEO",
            },
            "yes": "Yes",
            "no": "No"
        }
    },
    "es": {
        "title": "¡Hemos recibido su petición!",
        "subtitle": "Gracias por contactarnos. Trabajaremos en su solicitud y nos pondremos en contacto con usted pronto.",
        "from": "Del equipo de HelphisTech.",
        "projectName": "Nombre del proyecto/compañia",
        "fullName": "Nombre completo",
        "email": "Correo electrónico",
        "projectType": "Tipo de proyecto",
        "deliverTerm": "Plazo de entrega",
        "targetPublic": "Público objetivo",
        "businessType": "Tipo de negocio",
        "vision": "Visión/misión",
        "service": "Qué ofrece la empresa",
        "functionalities": "Funcionalidades",
        "ecommerce": "Funcionalidades de E-Commerce",
        "technologies": "Lenguajes/tecnologías",
        "management": "Responsable de gestión",
        "marketing": "Estrategia de marketing",
        "competitiors": "Sitios web de la competencia",
        "description": "Descripción del proyecto",
        "company": {
            "business_type": {
                "retail": "Minorista",
                "service": "Servicio",
                "manufacturing": "Fabricación"
            },
            "company_vision": {
                "increase-profitability": "Aumentar la rentabilidad",
                "enhance-customer-satisfaction": "Mejorar la satisfacción del cliente",
                "promote-sustainability": "Promover la sostenibilidad"
            },
            "target_audience": {
                "children": "Niños",
                "teenagers": "Adolecentes",
                "young-adults": "Jovenes adultos",
                "adults": "Adultos",
                "seniors": "Mayores"
            },
            "service_or_product": {
                "products": "Productos",
                "services": "Servicios"
            },
            "expected_deilvertime": {
                0: "Menos de 1 mes",
                1: "Entre 1 y 3 meses",
                3: "Entre 3 y 6 meses",
                6: "Más de 6 meses"
            }
        },
        "project": {
            "project_type": {
                "website": "Sitio web",
                "ecommerce": "E-Commerce",
                "application": "Aplicación"
            },
            "functionalities": {
                "contact-form": "Formulario de contacto",
                "image-gallery": "Galería de imágenes",
                "blog-section": "Sección blog",
                "social-media-integration": "Integración de redes sociales"
            },
            "web_design_type": {
                "responsive": "Responsive",
                "specific-design": "Diseño específico"
            },
            "responsible_for_managing": {
                "client": "El cliente",
                "developer": "El desarrollador"
            },
            "marketing_strategy": {
                "social-media": "Redes sociales",
                "email-marketing": "Correo electrónico",
                "SEO": "SEO",
            },
            "yes": "Sí",
            "no": "No"
        }
    }
}

export default async function handler(req, res) {
    const { email, project, language } = req.body || {};

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
                ${lang[language].title}\n\n
                ${lang[language].description}\n\n
                ${lang[language].from}\n
            `,
            html: template.client({ project, lang: lang[language] })
        });

        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        const resError = new Error(error.response.data.msg)
        return res.status(400).json({ msg: resError.message });
    }
}