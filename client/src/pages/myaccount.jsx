// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/client/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"

export default function MyAccount() {

    const router = useRouter();
    
    const { auth } = useContextProvider();

    return (
        <Layout title={"Mi cuenta"}>
            <div className="flex flex-col gap-5">
                <button className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                    <span>Volver</span>
                </button>
                <AccountSection title={"Datos personales"}>
                    <AccountField title={"Nombre"} value={auth.name} />
                    {auth.surname && (
                        <AccountField title={"Apellido"} value={auth.surname} />
                    )}
                    <AccountField title={"Correo electrónico"} value={auth.email} />
                </AccountSection>
            </div>
        </Layout>
    )
}

function AccountSection({ title, children }) {
    return(
        <div className="flex flex-col gap-2 bg-neutral-800 rounded-md py-4 px-5">
            <div className="uppercase font-medium text-lg">{title}</div>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}

function AccountField({ title, value }) {
    return (
        <div>
            <div>{title}</div>
            <div className="description-dark">{value}</div>
        </div>
    )
}