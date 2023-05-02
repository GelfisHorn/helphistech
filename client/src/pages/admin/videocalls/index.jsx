import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function VideoCalls() {
    
    const { darkMode } = useContextProvider();

    // videocalls data
    const [ videoCalls, setVideoCalls ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // On component load fetch videocalls
    useEffect(() => {
        getVideoCalls();
    }, [])

    // Fetch videocalls
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
            const sortedByDate = data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setVideoCalls(sortedByDate);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const [ filterByState ] = useState('all');
    const [ filteredByState, setFilteredByState ] = useState([]);

    useEffect(() => {
        const filteredByState = videoCalls.filter(videocall => videocall.state != 'cancelled');
        setFilteredByState(filteredByState);
    }, [videoCalls])

    function handleFilterByState(filter) {
        let filteredByState;
        if(filter == 'all') {
            filteredByState = videoCalls.filter(videocall => videocall.state != 'cancelled');
        } else {
            filteredByState = videoCalls.filter(videocall => videocall.state == filter);
        }
        setFilteredByState(filteredByState);
    }

    return (
        <Layout title={"Videollamadas recibidas"}>
            <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col h-full`}>
                <div className={`flex items-center justify-between sm:text-lg pb-3 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-200'}`}>
                    <div className="uppercase font-semibold">Filtros</div>
                    <div className="">
                        <select className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} outline-none shadow-md py-2 sm:px-2 rounded-sm`} name="" id="" defaultValue={filterByState} onChange={(e) => handleFilterByState(e.target.value)}>
                            <option value="all">Todos</option>
                            <option value="pending">Pendiente</option>
                            <option value="concluded">Concluido</option>
                        </select>
                    </div>
                </div>
                <div className={`${filteredByState.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-1'} py-3 h-full`}>
                    {loading && (
                        <LoadingSpinner />
                    )}
                    {!loading && filteredByState.length !== 0 && filteredByState.map((videocall, i) => (
                        <VideoCall key={i} videocall={videocall} />
                    ))}
                    {!loading && filteredByState.length === 0 && (
                        <div className="grid place-content-center text-center">
                            <span className="text-xl uppercase font-semibold">No hay videollamadas aún.</span>
                            <span className="text-light-description">Prueba usando diferentes filtros.</span>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
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