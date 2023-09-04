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
import VideoCall from "@/components/admin/Videocall";

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