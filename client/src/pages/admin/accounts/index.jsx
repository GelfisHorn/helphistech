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
import Account from "@/components/admin/Account";

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
                <div className={`flex flex-col gap-4 ${darkMode ? 'text-dark-text' : 'text-black'}`}>
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