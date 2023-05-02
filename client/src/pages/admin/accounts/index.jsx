import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import Link from "next/link";
// Super admin permissions
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Data and hour formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Accounts() {

    const { auth, darkMode } = useContextProvider();

    const [ accounts, setAccounts ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(auth._id) {
            getAccounts();
        }
    }, [auth])

    async function getAccounts() {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/admin/accounts/getAccounts', { config })
            const accounts = data.filter(acc => acc._id !== auth._id);
            setAccounts(accounts);
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={"Cuentas"}>
                <div className={`flex flex-col gap-1 ${darkMode ? 'text-dark-text' : 'text-black'} h-full`}>
                    {loading && (
                        <div className="grid place-content-center h-full">
                            <LoadingSpinner />
                        </div>
                    )}
                    {!loading && accounts.length != 0 && accounts.map((account, index) => (
                        <Account account={account} key={index} />
                    ))}
                    {!loading && accounts.length == 0 && (
                        <div className="grid place-content-center text-center">
                            <span className="text-xl uppercase font-semibold">No hay cuentas aún.</span>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}

function Account({account}) {

    const { darkMode } = useContextProvider();

    return (
        <div className="relative shadow-md px-5 py-4 rounded-sm bg-[#101010]">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Nombre</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-black'}`}>{account.name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Correo electrónico</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-black'}`}>{account.email}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`uppercase font-bold`}>Permisos</div>
                    <div className={`${account.permissions === 'admin' ? 'text-light-main' : account.permissions === 'superadmin' ? 'text-red-500' : null} uppercase font-semibold`}>{account.permissions}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Cuenta confirmada</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-black'}`}>{account.confirmed ? 'Sí' : 'No'}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Cuenta desactivada</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-black'}`}>{account.disabled ? 'Sí' : 'No'}</div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="uppercase font-bold">Creado</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-black'}`}>{moment(account.createdAt).format('LLL')}</div>
                </div>
            </div>
            <Link href={`/admin/accounts/edit/${account._id}`}>
                <button className="absolute top-3 right-3 p-2 hover:bg-zinc-500 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </button>
            </Link>
        </div>
    )
}