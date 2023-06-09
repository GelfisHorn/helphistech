// Hooks
import showToast from "@/hooks/showToast";
import useContextProvider from "@/hooks/useAppContextProvider";
import axios from "axios";
// Form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function BottomContact({ blog }) {
    
    const { darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-10 w-full text-center"}>
            <div className={"flex flex-col gap-3"}>
                <h3 className={"text-[2.5rem] uppercase"}>¿Te gusta lo que ves?</h3>
                <p className={`text-lg font-light ${darkMode ? "description-dark" : "description-light"}`}>Contactanos y crea tu sitio web con profesionales, es el momento de empezar a vender en línea</p>
            </div>
            <ContactForm blog={blog} />
        </div>
    )
}

function ContactForm({ blog }) {

    const { darkMode } = useContextProvider();

    const ContactSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(6, 'El nombre es muy corto.')
            .max(50, 'El nombre es muy largo.')
            .required('El nombre es obligatorio'),
        phone: Yup.number()
            .positive('El número de teléfono no puede ser negativo')
            .integer("El número de teléfono no puede ser decimal")
            .min(8, 'El número de teléfono es muy corto.'),
        email: Yup.string()
            .email('El formato es incorrecto')
            .required('El correo electrónico es obligatorio'),
        message: Yup.string()
    });

    return (
        <Formik
            initialValues={{
                fullName: '',
                phone: '',
                email: '',
                message: ''
            }}
            validationSchema={ContactSchema}
            onSubmit={async (values) => {
                // Form values
                const fullName = values.fullName;
                const phone = values.phone;
                const email = values.email;
                const message = values.message;

                try {
                    await axios.post('/api/contact/bottomContact/sendMail', { blogTitle: blog.title, blogUrl: blog.url, fullName, phone, email, message })
                    showToast("Enviaste el mensaje correctamente", "success");
                } catch (error) {
                    showToast("Hubo un error al enviar el formulario", "error");
                }
            }}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-4">
                    <div className={"flex items-start gap-4"}>
                        <div className={"flex flex-col gap-1 w-full"}>
                            <Field
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light px-2 h-11 w-full outline-none rounded-sm`}
                                name="fullName"
                                type="text"
                                id="fullName"
                                placeholder={"Nombre completo"}
                            />
                            {errors.fullName && touched.fullName ? (
                                <div className="text-left text-sm text-red-500">{errors.fullName}</div>
                            ) : null}
                        </div>
                        <div className={"flex flex-col gap-1 w-full"}>
                            <Field
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light px-2 h-11 w-full outline-none rounded-sm`}
                                name="phone"
                                type="tel"
                                id="phone"
                                placeholder={"Teléfono (opcional)"}
                            />
                            {errors.phone && touched.phone ? (
                                <div className="text-left text-sm text-red-500">{errors.phone}</div>
                            ) : null}
                        </div>
                        <div className={"flex flex-col gap-1 w-full"}>
                            <Field
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light px-2 h-11 w-full outline-none rounded-sm`}
                                name="email"
                                type="email"
                                id="email"
                                placeholder={"Correo electrónico"}
                            />
                            {errors.email && touched.email ? (
                                <div className="text-left text-sm text-red-500">{errors.email}</div>
                            ) : null}
                        </div>
                        <button type={"submit"} className={"bg-primary hover:bg-primary-2 rounded-full transition-colors text-white w-full h-11"}>Enviar</button>
                    </div>
                    <div className={"flex flex-col gap-1 w-full"}>
                        <Field
                            as="textarea"
                            className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light p-2 w-full outline-none rounded-sm resize-none`} 
                            name={"message"}
                            id={"message"}
                            cols="30"
                            rows="5"
                            placeholder={"Mensaje (opcional)"} 
                        />
                        {errors.email && touched.email ? (
                            <div className="text-left text-sm text-red-500">{errors.email}</div>
                        ) : null}
                    </div>
                </Form>
            )}
        </Formik>
    )
}