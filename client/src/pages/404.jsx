// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Link from "next/link";
import Image from "next/image";

const LANGS = {
    de: {
        title: "Die gesuchte Seite existiert nicht",
        button: "Geh zurück"
    },
    en: {
        title: "The page you are looking for doesn't exist",
        button: "Go back"
    },
    es: {
        title: "La página que estás buscando no existe",
        button: "Volver atrás"
    }
}

export default function NoPageFound() {
    
    const { darkMode, language } = useContextProvider();

    const router = useRouter();

    return (
        language && (
            <Layout title={LANGS[language]?.title} lang={language}>
                <div className={`flex flex-col items-center justify-center gap-10 ${darkMode ? "bg-[#101010]" : ""}`} style={{height: 'calc(100vh - 5rem)'}}>
                    <div className={"w-80"}>
                        <div className={"image-container"}>
                            <Image src={darkMode ? "/404-dark.webp?v=1" : "/404.webp"} fill className={"image"} alt={"404 image"} />
                        </div>
                    </div>
                    <div className={"flex flex-col items-center gap-5"}>
                        <div className="flex items-center gap-5">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg> */}
                            <h1 className="text-4xl">{LANGS[language]?.title}</h1>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={() => router.back()} className="flex items-center gap-1 w-fit text-white bg-primary hover:bg-primary-2 px-8 py-3 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>{LANGS[language]?.button}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    )
}