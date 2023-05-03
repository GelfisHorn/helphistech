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

function VideoCall({ videocall }) {

    const { darkMode } = useContextProvider();

    const router = useRouter();

    const redirectToVideoCall = (id) => {
        router.push(`/admin/videocall/${id}`)
    }

    const { _id, full_name, email, date, hour, state, createdAt } = videocall;

    return (
        <div className={`gap-5 px-5 py-4 shadow-md rounded-sm ${darkMode ? 'bg-[#101010]' : 'bg-white'}`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Nombre completo</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{full_name}</div>    
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Correo electrónico</div>
                    <a href={`mailto:${email}`} className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} text-ellipsis-5`}>{email}</a>    
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Fecha y hora</div>
                    <div className={`flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <div>{moment(date).format('LL')},</div>
                        <div>a las {hour}</div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`${state == 'pending' ? 'bg-orange-500' : state == 'concluded' ? 'bg-primary' : 'bg-red-500'} px-2 py-1 rounded-sm text-white uppercase w-fit font-semibold select-none`}>{state == 'pending' ? 'Pendiente' : state == 'concluded' ? 'Concluido' : 'Cancelado'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-start w-full">
                            <button onClick={() => redirectToVideoCall(_id)} className="bg-primary hover:bg-transparent text-white py-1 px-4 rounded-sm uppercase font-semibold border-2 border-transparent hover:border-primary hover:text-primary transition-colors whitespace-nowrap w-full sm:w-fit">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}