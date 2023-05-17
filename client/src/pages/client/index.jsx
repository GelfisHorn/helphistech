import axios from "axios";
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Components
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/client/Layout";
// Date formatter
import moment from "moment";

export default function ClientIndex() {

    const router = useRouter();

    const { darkMode, auth, fetchingAuth, clientProject, setClientProject, clientProcess, setClientProcess } = useContextProvider();
    const [loading, setLoading] = useState(true);
    // Fixed size process entries to show in the page card.
    const [processEntries, setProcessEntries] = useState([]);

    useEffect(() => {
        if (Object.keys(clientProject).length !== 0 || Object.keys(clientProcess).length !== 0) {
            setProcessEntries(clientProcess.slice(0, 4))
            setLoading(false);
        }

        if (!fetchingAuth && auth.permissions != 'client') {
            router.push('/admin');
            return;
        }

        if (!fetchingAuth && (Object.keys(clientProject).length === 0 && Object.keys(clientProcess).length === 0)) {
            Promise.all([getProject(), getProcess()]).then(() => setLoading(false));
            return;
        }
    }, [fetchingAuth, auth, clientProject, clientProcess])

    async function getProject() {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if (!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`/api/client/getProject`, { config, clientId: auth._id });
            setClientProject(data);
        } catch (err) {
            const error = new Error(err);
            console.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    async function getProcess() {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if (!token) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/client/project/entry/getEntries', { config });
            const sortedByDate = data.sort(function (a, b) {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setProcessEntries(sortedByDate.slice(0, 4));
            setClientProcess(sortedByDate);
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        }
    }

    const { project = {} } = clientProject;
    const { comments = {} } = clientProject;

    return (
        <Layout title={loading ? 'Cargando...' : `Bienvenido: ${auth.name}`}>
            <div className={`w-full h-full ${darkMode ? 'text-dark-text' : 'text-black'} py-5`}>
                {loading && (
                    <div className="grid place-content-center h-full">
                        <LoadingSpinner />
                    </div>
                )}
                {!loading && (Object.keys(auth).length !== 0 && Object.keys(clientProject).length !== 0) && (
                    <div className="flex flex-col gap-10 w-full h-full">
                        <div className="text-3xl font-medium text-left">Willkommen, {auth.name}.</div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <h4 className="uppercase font-medium text-lg">Mein Projekt</h4>
                                <Link className={`w-full ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} p-5 rounded-md`} href={`/client/project/${project._id}`}>
                                    <div className="flex flex-col">
                                        <div className="flex items-end gap-2">
                                            <div className="uppercase font-medium">Name</div>
                                            <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{project?.contact_information?.company_name}</div>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <div className="uppercase font-medium">Kommentare</div>
                                            <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{typeof comments == 'object' && comments.length >= 1 ? `${comments.length} ${comments.length > 1 ? 'Kommentare' : 'Kommentar'}` : 'Es gibt keine Kommentare'}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <h4 className="uppercase font-medium text-lg">Verfahren</h4>
                                    <Link className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors" href={`/client/process/${project._id}`}>
                                        <span>siehe Prozess</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                                <div className={`w-full ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} p-5 rounded-md`}>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-end gap-2">
                                                <div className="uppercase font-medium">Tickets</div>
                                                <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{typeof clientProcess == 'object' && clientProcess.length >= 1 ? `${clientProcess.length} ${clientProcess.length > 1 ? 'Tickets' : 'Ticket'}` : 'Keine Tickets'}</div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="uppercase font-medium">letzte Tickets</div>
                                                <div className="flex flex-col gap-1">
                                                    {processEntries.length > 0 ? processEntries.map(entry => (
                                                        <Link href={`/client/process/entry/${entry._id}`}>
                                                            <div className={`flex items-center justify-between ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-300 hover:bg-neutral-400'} transition-colors px-3 py-2 rounded-lg`}>
                                                                <div className="flex flex-col">
                                                                    <div>{entry.title}</div>
                                                                    <div className={`text-sm uppercase font-semibold ${darkMode ? 'description-dark' : 'description-light'}`}>{moment(entry.createdAt).format('LLL')}</div>
                                                                </div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                    )) : (
                                                        <div>No hay entradas aún</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}