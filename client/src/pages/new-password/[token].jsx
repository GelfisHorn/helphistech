import axios from "axios";
// React
import { useEffect, useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
// Components
import Button from "@/components/Button";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Notifications
import showToast from "@/hooks/showToast";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosHeaders from "@/hooks/axiosHeaders";
import Link from "next/link";

const lang = {
    "de": {
        "title": "Ändern Sie Ihr Passwort",
        "subtitle": "Schreiben Sie ein sicheres Passwort, wir empfehlen die Verwendung von Symbolen und Zahlen.",
        "button": "Kennwort ändern",
        "placeholder": {
            "pass": "Passwort",
            "repeatPass": "Passwort wiederholen"
        },
        "back": "Zurück",
        "notifications": {
            "notMatch": "Passwörter stimmen nicht überein",
            "length": "Das Passwort ist zu kurz",
            "void": "Felder dürfen nicht leer sein"
        },
        "noToken": {
            "title": "Dieses Token ist ungültig",
            "subtitle": "Versuchen Sie, Ihr Passwort wiederherzustellen, um ein neues Token zu erhalten",
            "button": "Geh zurück"
        },
        "success": {
            "title": "Sie haben Ihr Passwort erfolgreich geändert!",
            "subtitle": "Sie können sich nun mit Ihrem neuen Passwort anmelden",
            "button": {
                "text": "Anmeldung",
                "href": "/login"
            }
        }
    },
    "en": {
        "title": "Change your password",
        "subtitle": "Write a secure password, we recommend that you use symbols and numbers.",
        "button": "Change Password",
        "placeholder": {
            "pass": "Password",
            "repeatPass": "Repeat password"
        },
        "back": "Back",
        "notifications": {
            "notMatch": "Passwords do not match",
            "length": "The password is too short",
            "void": "Fields cannot be empty"
        },
        "noToken": {
            "title": "This token is not valid",
            "subtitle": "Try to recover your password to get a new token",
            "button": "Go back"
        },
        "success": {
            "title": "You changed your password successfully!",
            "subtitle": "You can now log in with your new password",
            "button": {
                "text": "Log in",
                "href": "/en/login"
            }
        }
    },
    "es": {
        "title": "Cambia tu contraseña",
        "subtitle": "Escribe una contraseña segura, te recomendamos que uses simbolos y números.",
        "button": "Cambiar contraseña",
        "placeholder": {
            "pass": "Contraseña",
            "repeatPass": "Repetir contraseña"
        },
        "back": "Atrás",
        "notifications": {
            "notMatch": "Las contraseñas no coinciden",
            "length": "La contraseña es muy corta",
            "void": "Los campos no pueden estar vacíos"
        },
        "noToken": {
            "title": "Este token no es válido",
            "subtitle": "Intenta recuperar tu contraseña para obtener un nuevo token",
            "button": "Volver atrás"
        },
        "success": {
            "title": "Cambiaste tu contraseña correctamente!",
            "subtitle": "Ya puedes iniciar sesión con tu nueva contraseña",
            "button": {
                "text": "Iniciar sesión",
                "href": "/es/login"
            }
        }
    }
}

export default function NewPassword({ validToken }) {

    const router = useRouter();

    const { token } = router.query;

    const { darkMode, language } = useContextProvider();

    const [ changedPassword, setChangedPassword ] = useState(false);

    return (
        <>
            <Head>
                <title>{lang[language].title} | HelphisTech</title>
            </Head>
            <div className={`${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
                <div className="">
                    <Image className="h-screen -z-1" src={'/login/login_bg.png'} width={1920} height={1080} alt="Login background image" />
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:rounded-xl shadow-xl ${darkMode ? 'bg-neutral-900' : 'bg-zinc-100'} opacity-[97%] login-card`}>
                    <div className="h-full">
                        {/* <div className="absolute top-5 left-5 text-2xl text-light-main font-semibold uppercase">Helphis Tech</div> */}
                        <div className="flex justify-center items-center gap-20 min-h-[30rem] h-full md:max-w-5xl mx-auto px-5 sm:px-10">
                            <button className={`absolute flex items-center gap-1 left-5 top-5 text-white bg-primary hover:bg-primary-2 transition-colors py-1 px-4 rounded-full`} onClick={() => router.back()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>{lang[language].back}</span>
                            </button>
                            <div className="w-1/2 hidden md:block lazy-load-1">
                                <div className="flex justify-center items-center">
                                    <Image className="h-auto w-auto" src={'/login/form_image.png'} width={547} height={461} alt="From image" />
                                </div>
                            </div>
                            <div className="w-full sm:w-2/3 md:w-1/2 lazy-load-1">
                                {!changedPassword && validToken && (
                                    <Form token={token} changedPassword={{ get: changedPassword, set: setChangedPassword }} />
                                )}
                                {!changedPassword && !validToken && (
                                    <div className={"flex flex-col gap-8"}>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-3xl text-light-main">{lang[language].noToken.title}</div>
                                            <div className="text-light-subtitle">{lang[language].noToken.subtitle}</div>
                                        </div>
                                        <button onClick={() => router.back()} className="flex items-center gap-1 w-fit text-primary hover:text-primary-2 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                            </svg>
                                            <span>{lang[language].noToken.button}</span>
                                        </button>
                                    </div>
                                )}
                                {changedPassword && (
                                    <div className={"flex flex-col gap-8"}>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-3xl text-light-main">{lang[language].success.title}</div>
                                            <div className="text-light-subtitle">{lang[language].success.subtitle}</div>
                                        </div>
                                        <Link href={lang[language].success.button.href} className="flex items-center gap-1 w-fit text-primary hover:text-primary-2 transition-colors">
                                            <span>{lang[language].success.button.text}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

function Form({ token, changedPassword }) {

    const { language } = useContextProvider();

    const password = useRef(null);
    const repeatPassword = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();

        // Validations
        if([password.current.value, repeatPassword.current.value].includes('')) {
            showToast(lang[language].notifications.void, "error");
            return;
        }
        if(repeatPassword.current.value != password.current.value) {
            showToast(lang[language].notifications.notMatch, "error");
            return;
        }
        if(password.current.value.length < 12) {
            showToast(lang[language].notifications.length, "error");
            return;
        }

        try {
            const { data } = await axios.post('/api/user/newPassword', { lang: language, password: password.current.value, token })
            showToast(data.msg, "success");
            resetForm();
            changedPassword.set(true);
        } catch (error) {
            showToast("There was an error recovering the password", "error");
        }
    }

    function resetForm() {
        password.current.value = '';
        repeatPassword.current.value = '';
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <div className="text-3xl text-light-main">{lang[language].title}</div>
                    <div className="text-light-subtitle">{lang[language].subtitle}</div>
                </div>
                <div className="flex flex-col gap-1 lazy-load-2">
                    <Input
                        reference={password}
                        placeholder={lang[language].placeholder.pass}
                        id={"pass"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        }
                        inputType={"password"}
                    />
                    <Input
                        reference={repeatPassword}
                        placeholder={lang[language].placeholder.repeatPass}
                        id={"repeatPass"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        }
                        inputType={"password"}
                    />
                </div>
            </div>
            <div className='lazy-load-4'>
                <Button properties={{
                    classes: "py-3",
                    handler: { action: handleSubmit }
                }}
                >{lang[language].button}</Button>
            </div>
        </form>
    )
}

// form input component
function Input({ reference, placeholder, id, icon, inputType }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} flex items-center h-14 rounded-md`}>
            <div className="grid place-content-center w-[3.5rem] h-full text-neutral-600">
                {icon}
            </div>
            <div className="w-full">
                <input ref={reference} className={`${darkMode ? 'text-zinc-200' : 'text-black'} w-full pr-3 outline-none font-light bg-transparent`} type={inputType} name="" id={id} placeholder={placeholder} />
            </div>
        </div>
    )
}

export const getStaticProps = async (context) => {

    const { token } = context.params;

    try {
        const { data } = await axios.get(`${process.env.SERVER_URI}/v1/de/users/reset-password/${token}`)
        return {
            props: {
                validToken: true
            }
        }
    } catch (error) {
        return {
            props: {
                validToken: false
            }
        }
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}