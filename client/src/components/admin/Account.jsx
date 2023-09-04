// Nextjs
import Link from "next/link";
// Data and hour formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

const PERMISSIONS = {
    de: {
        superadmin: "Superadministrator",
        admin: "Administrator",
        client: "Kunde",
        developer: "Entwickler"
    },
    en: {
        superadmin: "Super Administrator",
        admin: "Administrator",
        client: "Client",
        developer: "Developer"
    },
    es: {
        superadmin: "Super administrador",
        admin: "Administrador",
        client: "Cliente",
        developer: "Desarrollador"
    }
}

export default function Account({ account }) {

    const { darkMode, language } = useContextProvider();

    return (
        <Link href={`/admin/accounts`} className={`relative flex flex-col gap-3 px-8 py-6 shadow-md rounded-xl border ${darkMode ? 'border-neutral-800' : 'border-neutral-200'} hover:border-primary transition-colors cursor-pointer`}>
            <div className={`text-xl font-medium capitalize`}>{PERMISSIONS.es[account.permissions]}</div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-user text-lg text-primary w-6"></i>
                    <div className={`${darkMode ? 'text-neutral-300' : 'text-black'}`}>{account.name}</div>
                </div>
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-envelope text-lg text-primary w-6"></i>
                    <div className={`${darkMode ? 'text-neutral-300' : 'text-black'}`}>{account.email}</div>
                </div>
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-lg text-primary w-6"></i>
                    <div className={`${darkMode ? 'text-neutral-300' : 'text-black'}`}>{account.confirmed ? 'Sí' : 'No'}</div>
                </div>
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-user-slash text-lg text-primary w-6"></i>
                    <div className={`${darkMode ? 'text-neutral-300' : 'text-black'}`}>{account.disabled ? 'Sí' : 'No'}</div>
                </div>
            </div>
            <div className={`${darkMode ? 'text-neutral-300' : 'text-black'} uppercase font-semibold`}>{moment(account.createdAt).format('LLL')}</div>
        </Link>
    )
}