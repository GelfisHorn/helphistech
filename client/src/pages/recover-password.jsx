import axios from "axios";
// React
import { useRef } from "react";
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

const lang = {
    "de": {
        "title": "Stellen Sie Ihr Passwort wieder her",
        "subtitle": "Wir senden Ihnen eine E-Mail mit den Anweisungen zur Wiederherstellung Ihres Passworts",
        "button": "Passwort wiederherstellen",
        "back": "Zurück"
    },
    "en": {
        "title": "Recover your password",
        "subtitle": "We will send you an email with the instructions to recover your password",
        "button": "Recover password",
        "back": "Back"
    },
    "es": {
        "title": "Recupera tu contraseña",
        "subtitle": "Te enviaremos un email con las instrucciones para recuperar tu contraseña",
        "button": "Recuperar contraseña",
        "back": "Atrás"
    }
}

export default function RecoverPassword() {

    const router = useRouter();

    const { darkMode, language } = useContextProvider();

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
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

function Form() {

    const { language } = useContextProvider();

    const email = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const { data } = await axios.post('/api/user/recoverPassword', { lang: language, email: email.current.value })
            showToast(data.msg, "success")
            email.current.value = '';
        } catch (error) {
            showToast("There was an error recovering the password", "error");
        }
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
                        reference={email}
                        placeholder={"Email"}
                        id={"email"}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        }
                        inputType={"email"}
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