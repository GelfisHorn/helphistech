// React
import { useState } from "react";
// Super admin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

export default function CreateAccount() {
    
    const { darkMode } = useContextProvider();

    const AccountSchema = Yup.object().shape({
        name: Yup.string()
          .min(4, 'El nombre es muy corto.')
          .max(50, 'El nombre es muy largo.')
          .required('El nombre es obligatorio'),
        email: Yup.string().
            email('El formato es incorrecto').
            required('El correo electrónico es obligatorio'),
        password: Yup.string().
            min(16, 'La contraseña es muy corta').
            max(32, 'La contraseña es muy larga').
            required('La contraseña es obligatoria')
    });

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Crear cuenta"}>
                <div className="flex flex-col gap-8 justify-center py-10 px-2 sm:px-0 sm:w-[30rem] mx-auto text-center h-full">
                    <div className={`${darkMode ? 'text-zinc-200' : 'text-black'} uppercase text-2xl sm:text-3xl`}>Crear cuentas</div>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={AccountSchema}
                        onSubmit={ async (values) => {
                            // Form values
                            const name = values.name;
                            const email = values.email;
                            const password = values.password;

                            // If type, name, email and phone are void return
                            if([name, email, password].includes('')) {
                                return;
                            }

                            // Get authentication token from localStorage
                            const token = localStorage.getItem('auth-token');
                            if(!token) {
                                setFetchingAuth(false);
                                return;
                            }

                            const config = {
                                headers: {
                                    "Content-Type": "application-json",
                                    Authorization: `Bearer ${token}`
                                }
                            }

                            // Send project to server
                            try {
                                const { data } = await axios.post('/api/admin/accounts/createAccount', { name, email, password, config });
                                values.name = '';   
                                values.email = '';  
                                values.password = '';  
                                showMessage(false, data.msg, 5000);
                                resetForm();   
                            } catch (error) {
                                showMessage(true, error.response.data.msg, 5000);
                            }
                        }}
                    >
                        {({ errors, touched }) => (   
                            <Form className="flex flex-col gap-10">
                                <div className={`flex flex-col gap-4 ${darkMode ? 'text-zinc-300' : 'text-black'}`}>
                                    { message.text && (
                                        <div className={`${message.error ? 'bg-red-500' : 'bg-light-main'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
                                    )}
                                    <div>
                                        <label htmlFor="name" className="block text-left">Nombre</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-full px-3`}>
                                            <Field 
                                                className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                name="name" 
                                                type="text"
                                                id="name"
                                                placeholder="Nombre completo"
                                            />
                                        </div>
                                        {errors.name && touched.name ? (
                                            <div className="text-left text-sm text-red-500">{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-left">Correo electrónico</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-full px-3`}>
                                            <Field 
                                                className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                name="email" 
                                                type="email"
                                                id="email"
                                                placeholder="Correo electrónico"
                                            />
                                        </div>
                                        {errors.email && touched.email ? (
                                            <div className="text-left text-sm text-red-500">{errors.email}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-left">Contraseña</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-full px-3`}>
                                            <Field 
                                                className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                name="password" 
                                                type="password"
                                                id="password"
                                                placeholder="Contraseña"
                                            />
                                        </div>
                                        {errors.password && touched.password ? (
                                            <div className="text-left text-sm text-red-500">{errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <button type="submit" className={`flex items-center justify-center gap-2 rounded-full py-2 w-full text-lg font-medium text-white bg-primary hover:bg-primary-2 transition-colors`}>
                                    <span>Crear cuenta</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}