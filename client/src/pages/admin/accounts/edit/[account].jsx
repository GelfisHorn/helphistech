import axios from "axios";
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Check superadmin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Form validation
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// Components
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AccountDynamic() {

    const { darkMode } = useContextProvider();

    const router = useRouter();
    const accountId = router.query.account;

    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (accountId) {
            // Get authentication token from localStorage
            const token = localStorage.getItem('auth-token');
            if (!token) {
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application-json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                (async () => {
                    const { data } = await axios.post('/api/admin/accounts/getAccount', { _id: accountId, config });
                    setAccount(data);
                    setLoading(false);
                })();
            } catch (error) {
                console.log(error.response.data.msg);
                setLoading(false);
            }
        }
    }, [accountId])

    const AccountSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'El nombre es muy corto.')
            .max(50, 'El nombre es muy largo.')
            .required('El nombre es obligatorio'),
        email: Yup.string().
            email('El formato es incorrecto').
            required('El correo electrónico es obligatorio'),
        password: Yup.string().
            min(16, 'La contraseña es muy corta').
            max(32, 'La contraseña es muy larga')
    });

    // On user submit form show a message
    const [message, setMessage] = useState({ error: false, text: '' });

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    function handleShowDeleteModal() {
        setShowDeleteModal(!showDeleteModal);
    }

    async function handleDeleteAccount() {
        setShowDeleteModal();

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/admin/accounts/deleteAccount', { accountId: account._id, config });
            showMessage(false, data.msg, 3000);
            setTimeout(() => {
                router.push('/admin/accounts');
            }, 3000);
        } catch (error) {
            showMessage(true, error.response.data.msg, 5000);
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Editar cuenta"}>
                <div className={`${darkMode ? 'text-zinc-200' : 'text-black'} h-full`}>
                    {loading && (
                        <div className="grid place-content-center h-full">
                            <LoadingSpinner />
                        </div>
                    )}
                    {!loading && Object.keys(account).length != 0 && (
                        <div className="flex flex-col gap-10 py-10 w-[30rem] mx-auto">
                            <div className="text-2xl sm:text-3xl text-center">Editar cuenta</div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    name: account.name,
                                    email: account.email,
                                    password: ''
                                }}
                                validationSchema={AccountSchema}
                                onSubmit={async (values) => {
                                    // Form values
                                    const name = values.name;
                                    const email = values.email;
                                    const password = values.password;

                                    // If type, name, email and phone are void return
                                    if ([name, email].includes('')) {
                                        return;
                                    }

                                    // Get authentication token from localStorage
                                    const token = localStorage.getItem('auth-token');
                                    if (!token) {
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
                                        const { data } = await axios.post('/api/admin/accounts/editAccount', { _id: account._id, name, email, password, config });
                                        showMessage(false, data.msg, 3000);
                                        setTimeout(() => {
                                            router.push('/admin/accounts');
                                        }, 3000)
                                    } catch (error) {
                                        showMessage(true, error.response.data.msg, 5000);
                                    }
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="flex flex-col gap-10">
                                        <div className={`flex flex-col gap-4 ${darkMode ? 'text-zinc-300' : 'text-black'}`}>
                                            {message.text && (
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
                                            <span>Guardar cambios</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className={`flex flex-col gap-1 border-t ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} pt-8`}>
                                <div className={`${darkMode ? 'text-zinc-200' : 'text-black'} text-lg`}>Eliminar cuenta</div>
                                <button onClick={handleShowDeleteModal} className="py-2 px-6 bg-red-800 hover:bg-red-500 transition-colors rounded-sm w-fit text-white font-medium">Eliminar cuenta</button>
                            </div>
                            <Modal showModal={showDeleteModal}>
                                <div className="flex flex-col gap-1">
                                    <div className={`text-red-700 text-xl font-semibold uppercase`}>Eliminar cuenta</div>
                                    <div className="text-lg">¿Estás seguro que deseas eliminar esta cuenta?</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleShowDeleteModal}>Cancelar</button>
                                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleDeleteAccount}>Confirmar</button>
                                </div>
                            </Modal>
                        </div>
                    )}
                    {!loading && Object.keys(account).length == 0 && (
                        <div className={`grid place-content-center gap-2 ${darkMode ? 'text-dark-text' : 'text-black'} h-full`}>
                            <h3 className="text-2xl">Esta cuenta no existe.</h3>
                            <button className="flex items-center justify-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.push('/admin/accounts')}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Volver a cuentas</span>
                            </button>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}

function Modal({ showModal, children }) {

    const { darkMode } = useContextProvider();

    const [show, setShow] = useState(false);
    const [closeAnim, setCloseAnim] = useState(false);

    function handleShowModal() {
        setShow(true);
    }

    function handleCloseModal() {
        setCloseAnim(true);
        setTimeout(() => {
            setCloseAnim(false);
            setShow(false);
        }, 170)
    }

    useEffect(() => {
        if (showModal) {
            handleShowModal();
            return;
        }
        handleCloseModal();
    }, [showModal])

    return (
        show && (
            <>
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md`}>
                    {children}
                </div>
            </>
        )
    )
}