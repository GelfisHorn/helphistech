import axios from "axios";
import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/router";
// Hooks
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/client/Layout";
import useContextProvider from "@/hooks/useAppContextProvider"

export default function ClientIndex() {
    
    const router = useRouter();

    const { darkMode, auth, fetchingAuth, clientProject, setClientProject } = useContextProvider();

    useEffect(() => {
        if(!fetchingAuth && auth.permissions != 'client') {
            router.push('/admin');
            return;
        }

        if(!fetchingAuth && Object.keys(clientProject).length === 0) {
            getProject();
        }
    }, [fetchingAuth, auth])

    async function getProject() {
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
            const { data } = await axios.post(`/api/client/getProject`, {config, clientId: auth._id});
            setClientProject(data);
        } catch (err) {
            const error = new Error(err);
            console.error(error.message)
        }
    }

    return (
        <Layout title={"Panel de administración"}>
            <div className={`h-full ${darkMode ? 'text-dark-text' : 'text-black'} lazy-load-1`}>
                { Object.keys(auth).length === 0 ? (
                    <div className="grid place-content-center h-full">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="flex justify-center items-start h-full text-3xl font-medium text-center">
                        <div>Bienvenido, {auth.name}.</div>
                    </div>
                )}
            </div>
        </Layout>
    )
}