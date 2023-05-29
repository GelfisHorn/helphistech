// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Link from "next/link";

const LANGS = {
    de: {
        title: "Die gesuchte Seite existiert nicht",
        button: "Gehen Sie zur Startseite"
    },
    en: {
        title: "The page you are looking for doesn't exist",
        button: "Go to home page"
    },
    es: {
        title: "La página que estás buscando no existe",
        button: "Ir a inicio"
    }
}

export default function NoPageFound() {
    
    const { language } = useContextProvider();
    const router = useRouter();

    return (
        <Layout title={LANGS[language].title} lang={language}>
            <div className="grid place-content-center gap-4" style={{height: 'calc(100vh - 5rem)'}}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <h1 className="text-3xl">{LANGS[language].title}</h1>
                </div>
                <div className="flex justify-center">
                    <Link href={'/'} className="flex items-center gap-1 w-fit hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>{LANGS[language].button}</span>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}