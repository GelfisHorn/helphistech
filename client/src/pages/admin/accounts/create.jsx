// React
import { useState } from "react";
// Super admin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Form validation
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
// Account config
import { POSITION, PERMISSIONS } from '../../../config/user'

export default function CreateAccount() {
    
    const { darkMode } = useContextProvider();

    const AccountSchema = Yup.object().shape({
        name: Yup.string()
          .min(4, 'El nombre es muy corto.')
          .max(50, 'El nombre es muy largo.')
          .required('El nombre es obligatorio'),
        surname: Yup.string()
          .min(4, 'El apellido es muy corto.')
          .max(50, 'El apellido es muy largo.')
          .required('El apellido es obligatorio'),
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

    // Form fields state
    const [ position, setPosition ] = useState('');
    const [ permissions, setPermissions ] = useState('');

    // Show password state
    const [ showPassword, setShowPassword ] = useState(false);

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Crear cuenta"}>
                <div className="flex flex-col gap-8 justify-center py-10 px-2 sm:px-0 sm:w-[30rem] mx-auto text-center">
                    <div className={`${darkMode ? 'text-zinc-200' : 'text-black'} uppercase text-2xl sm:text-3xl`}>Crear cuentas</div>
                    <Formik
                        initialValues={{
                            name: '',
                            surname: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={AccountSchema}
                        onSubmit={ async (values) => {
                            // Form values
                            const name = values.name;
                            const surname = values.surname;
                            const email = values.email;
                            const password = values.password;

                            // If type, name, email and phone are void return
                            if([name, surname, position, permissions, email, password].includes('')) {
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

                            function resetForm() {
                                values.name = ''
                                values.surname = ''
                                values.email = ''
                                values.password = '' 
                                setPosition('');
                                setPermissions('');
                            }

                            // Send project to server
                            try {
                                const { data } = await axios.post('/api/admin/accounts/createAccount', { name, surname, position, permissions, email, password, config });
                                resetForm();
                                showMessage(false, data.msg, 5000);  
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
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
                                            <Field 
                                                className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                name="name" 
                                                type="text"
                                                id="name"
                                                placeholder="Nombre"
                                            />
                                        </div>
                                        {errors.name && touched.name ? (
                                            <div className="text-left text-sm text-red-500">{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="surname" className="block text-left">Apellido</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
                                            <Field 
                                                className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                name="surname" 
                                                type="text"
                                                id="surname"
                                                placeholder="Apellido"
                                            />
                                        </div>
                                        {errors.surname && touched.surname ? (
                                            <div className="text-left text-sm text-red-500">{errors.surname}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="position" className="block text-left">Posición</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
                                            <select name="position" id="position" className="w-full py-2 outline-none bg-transparent" value={position} onChange={e => setPosition(e.target.value)}>
                                                <option value="">Seleccionar opción</option>
                                                {Object.values(POSITION).map(pos => (
                                                    <option value={pos}>{pos}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="permissions" className="block text-left">Permisos</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
                                            <select name="permissions" id="permissions" className="w-full py-2 outline-none bg-transparent" value={permissions} onChange={e => setPermissions(e.target.value)}>
                                                <option value="">Seleccionar opción</option>
                                                {Object.keys(PERMISSIONS).map(perm => (
                                                    <option value={perm}>{PERMISSIONS[perm]}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-left">Correo electrónico</label>
                                        <div className={`flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
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
                                    <div className={"flex flex-col gap-2"}>
                                        <div>
                                            <label htmlFor="password" className="block text-left">Contraseña</label>
                                            <div className={`relative flex items-center border ${darkMode ? 'border-neutral-800' : 'border-zinc-300'} rounded-md px-3`}>
                                                <Field
                                                    className={`bg-transparent outline-none py-2 w-full placeholder:text-neutral-400 placeholder:font-light`}
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    id="password"
                                                    placeholder="Contraseña"
                                                />
                                                {!showPassword && (
                                                    <svg onClick={() => setShowPassword(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`cursor-pointer text-neutral-500 ${darkMode ? " hover:text-neutral-300" : "hover:text-neutral-700"} transition-colors w-5 h-5 absolute right-2`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                )}
                                                {showPassword && (
                                                    <svg onClick={() => setShowPassword(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`cursor-pointer text-neutral-500 ${darkMode ? " hover:text-neutral-300" : "hover:text-neutral-700"} transition-colors w-5 h-5 absolute right-2`}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                    </svg>
                                                )}
                                            </div>
                                            {errors.password && touched.password ? (
                                                <div className="text-left text-sm text-red-500">{errors.password}</div>
                                            ) : null}
                                        </div>
                                        <GeneratePassword />
                                    </div>
                                </div>
                                <button type="submit" className={`flex items-center justify-center gap-2 rounded-md py-2 w-full text-lg font-medium text-white bg-primary hover:bg-primary-2 transition-colors`}>
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

function GeneratePassword() {

    const formikProps = useFormikContext();

    function getRandomPassword() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        formikProps.setFieldValue("password", password)
    }

    return (
        <button onClick={getRandomPassword} type={"button"} className={"flex justify-start w-fit text-primary hover:text-primary-2 transition-colors"}>Generar contraseña</button>
    )
}