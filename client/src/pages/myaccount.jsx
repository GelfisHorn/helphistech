// Components
import Layout from "@/components/client/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"

export default function MyAccount() {
    
    const { auth } = useContextProvider();

    return (
        <Layout title={"Mi cuenta"}>
            <AccountSection title={"Datos personales"}>
                <AccountField title={"Nombre"} value={auth.name} />
                {auth.surname && (
                    <AccountField title={"Apellido"} value={auth.surname} />
                )}
                <AccountField title={"Correo electrónico"} value={auth.email} />
            </AccountSection>
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