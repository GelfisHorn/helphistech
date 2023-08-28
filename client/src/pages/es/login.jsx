import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image"
// Components
import LoginForm from "@/components/es/login/LoginForm"
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"

export default function Login() {

    const router = useRouter();

    const { auth, darkMode } = useContextProvider();

    useEffect(() => {
        if(!auth.email) {
            return;
        }
        if(auth.permissions === 'client') {
            router.push('/dashboard');
            return;
        }
        router.push('/admin');
    }, [auth])

    return (
        <>
            <Head>
                <title>Helphis Tech | Iniciar sesión</title>
            </Head>
            <div className={`${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
                <div className="">
                    <Image className="h-screen -z-1" src={'/login/login_bg.png'} width={1920} height={1080} alt="Login background image" />
                </div>
                <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:rounded-xl shadow-xl ${darkMode ? 'bg-neutral-900' : 'bg-zinc-100'} opacity-[97%] login-card`}>
                    <div className="h-full">
                        {/* <div className="absolute top-5 left-5 text-2xl text-light-main font-semibold uppercase">Helphis Tech</div> */}
                        <div className="flex justify-center items-center gap-20 min-h-[30rem] h-full md:max-w-5xl mx-auto px-5 sm:px-10">    
                            <button className={`absolute hidden sm:flex items-center gap-1 left-5 top-5 text-white bg-primary hover:bg-primary-2 transition-colors py-1 px-4 rounded-full`} onClick={() => router.back()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Volver</span>
                            </button>
                            <div className="w-1/2 hidden md:block lazy-load-1">
                                <div className="flex justify-center items-center">
                                    <Image className="h-auto w-auto" src={'/login/form_image.png'} width={547} height={461} alt="From image" />
                                </div>
                            </div>
                            <div className="w-full sm:w-2/3 md:w-1/2 lazy-load-1">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}