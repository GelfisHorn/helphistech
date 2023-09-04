import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Layout
import AdminLayout from "@/components/admin/AdminLayout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Money formatter
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and hour formatter
import moment from "moment";
// Components
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
import LoadingSpinner from "@/components/LoadingSpinner";
import VideoCall from "@/components/admin/Videocall";

export default function CancelledVideoCalls() {
    
    const { darkMode } = useContextProvider();

    // VideoCalls data
    const [ videoCalls, setVideoCalls ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // On component load fetch videoCalls
    useEffect(() => {
        getVideoCalls();
    }, [])

    // Fetch videoCalls
    async function getVideoCalls() {
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
            const { data } = await axios.post(`/api/admin/getVideoCalls`, { config });
            const videoCalls = data.filter(videocall => videocall.state === 'cancelled');
            setVideoCalls(videoCalls);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={'Proyectos canelados'}>
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} h-full lazy-load-1`}>
                    <div className={`${videoCalls.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-1'} py-3 h-full`}>
                        {loading && (
                            <LoadingSpinner />
                        )}
                        {!loading && videoCalls.length !== 0 && videoCalls.map((videocall, i) => (
                            <VideoCall key={i} videocall={videocall} />
                        ))}
                        {!loading && videoCalls.length === 0 && (
                            <div className="grid place-content-center text-center">
                                <span className="text-xl uppercase font-semibold">No hay videollamadas canceladas aún.</span>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}