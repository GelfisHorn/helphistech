// Hooks
import showToast from "@/hooks/showToast";
import useContextProvider from "@/hooks/useAppContextProvider";
import axios from "axios";
// Form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// Language
import lang from '../lang/components/BottomContact.json'
// Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BottomContact({ blog, language }) {
    
    const { darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-10 w-full text-center"}>
            <div className={"flex flex-col gap-3"}>
                <h3 className={"text-[2.5rem] uppercase"}>{lang[language].title}</h3>
                <p className={`text-lg font-light ${darkMode ? "description-dark" : "description-light"}`}>{lang[language].subtitle}</p>
            </div>
            <ContactForm blog={blog} language={language} />
            <ToastContainer />
        </div>
    )
}

function ContactForm({ blog, language }) {

    const { darkMode } = useContextProvider();

    const ContactSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(6, lang[language].fullName.validation.min)
            .max(50, lang[language].fullName.validation.max)
            .required(lang[language].fullName.validation.required),
        phone: Yup.number()
            .positive(lang[language].phone.validation.positive)
            .integer(lang[language].phone.validation.integer)
            .min(8, lang[language].phone.validation.min),
        email: Yup.string()
            .email(lang[language].email.validation.email)
            .required(lang[language].email.validation.required),
        message: Yup.string()
    });

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

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

                function resetForm() {
                    values.fullName = "";
                    values.phone = "";
                    values.email = "";
                    values.message = "";
                }

                try {
                    await axios.post('/api/contact/bottomContact/sendMail', { blogTitle: blog.title, blogUrl: blog.url, fullName, phone, email, message })
                    showToast(lang[language].notifications.success, "success");
                    resetForm();
                } catch (error) {
                    showToast(lang[language].notifications.error, "error");
                }
            }}
        >
            {({ errors, touched }) => (
                <Form className="flex flex-col gap-4" onKeyDown={onKeyDown}>
                    <div className={"flex flex-col lg:flex-row items-start gap-4"}>
                        <div className={"flex flex-col gap-1 w-full"}>
                            <Field
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light px-2 h-11 w-full outline-none rounded-sm`}
                                name="fullName"
                                type="text"
                                id="fullName"
                                placeholder={lang[language].fullName.placeholder}
                            />
                            {errors.fullName && touched.fullName ? (
                                <div className="text-left text-sm text-red-500">{errors.fullName}</div>
                            ) : null}
                        </div>
                        <div className={"flex flex-col gap-1 w-full"}>
                            <Field
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light px-2 h-11 w-full outline-none rounded-sm`}
                                name="phone"
                                type="number"
                                id="phone"
                                placeholder={lang[language].phone.placeholder}
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
                                placeholder={lang[language].email.placeholder}
                            />
                            {errors.email && touched.email ? (
                                <div className="text-left text-sm text-red-500">{errors.email}</div>
                            ) : null}
                        </div>
                        <div className={"flex lg:hidden flex-col gap-1 w-full"}>
                            <Field
                                as="textarea"
                                className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light p-2 w-full outline-none rounded-sm resize-none`}
                                name={"message"}
                                id={"message"}
                                cols="30"
                                rows="5"
                                placeholder={lang[language].message.placeholder}
                            />
                            {errors.message && touched.message ? (
                                <div className="text-left text-sm text-red-500">{errors.message}</div>
                            ) : null}
                        </div>
                        <button type={"submit"} className={"bg-primary hover:bg-primary-2 rounded-full transition-colors text-white w-full h-11"}>{lang[language].submit}</button>
                    </div>
                    <div className={"hidden lg:flex flex-col gap-1 w-full"}>
                        <Field
                            as="textarea"
                            className={`bg-transparent border ${darkMode ? "border-neutral-700" : "border-neutral-400"} placeholder:text-neutral-500 font-light p-2 w-full outline-none rounded-sm resize-none`} 
                            name={"message"}
                            id={"message"}
                            cols="30"
                            rows="5"
                            placeholder={lang[language].message.placeholder} 
                        />
                        {errors.message && touched.message ? (
                            <div className="text-left text-sm text-red-500">{errors.message}</div>
                        ) : null}
                    </div>
                </Form>
            )}
        </Formik>
    )
}