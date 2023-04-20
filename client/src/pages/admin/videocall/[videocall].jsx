import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router"
// Components
import Layout from "@/components/admin/AdminLayout";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function VideoCallDynamic() {
    
    const { auth, darkMode } = useContextProvider();

    const router = useRouter();
    // Get videocall id from url params
    const videoCallId = router.query.videocall;

    // videocall data
    const [ videoCall, setVideoCall ] = useState({});
    const { _id, full_name, email, date, hour, state, createdAt } = videoCall;

    const [ videoCallState, setVideoCallState ] = useState(state);

    // On component load fetch videoCall
    useEffect(() => {
        if(videoCallId) {
            getVideoCall();
        }
    }, [videoCallId])

    // Fetch videocall data
    async function getVideoCall() {
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

        const { data } = await axios.post(`/api/admin/getVideoCall`, { _id: videoCallId, config });
        setVideoCall(data);
        setVideoCallState(data.state)
    }

    async function handleChangeState(state) {

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.post('/api/admin/changeVideoCallState', { _id: videoCallId, state, config });
            setVideoCallState(state)
        } catch (error) {
            console.log(error);
        }
    }

    // Confirm cancel videocall state and menu
    const [ showCancelMenu, setShowCancelMenu ] = useState(false);
    // Cancel menu close animation
    const [ closeCancelMenuAnim, setCloseCancelMenuAnim ] = useState(false);
    function handleShowModal() {
        setShowCancelMenu(current => !current);
    }
    function handleCloseModal() {
        setCloseCancelMenuAnim(true);
        setTimeout(() => {
            handleShowModal()
            setCloseCancelMenuAnim(false);
        }, 170)
    }
    async function handleCancelVideoCall() {
        handleCloseModal();

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        await axios.post('/api/admin/cancelVideoCall', { _id: videoCallId, config })
        router.push(`/admin/videocalls`)
    }
    async function handleRecoverVideoCall() {
        handleCloseModal();

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');
        if(!token) {
            setFetchingAuth(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        await axios.post('/api/admin/changeVideoCallState', { _id: videoCallId, state: "pending", config })
        router.push(`/admin/videocalls`)
    }

    return (
        <Layout title={'Videollamada'}>
            { Object.keys(videoCall).length != 0 && (
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col gap-3 px-5 rounded-lg`}>
                    <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-5 border-b py-3`}>
                        <div className="flex flex-col">
                            <div className="font-bold uppercase text-lg">Nombre completo</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{full_name}</div>    
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold uppercase text-lg">Correo electrónico</div>
                            <a href={`mailto:${email}`} className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} adminpanel-description`}>{email}</a>    
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold uppercase text-lg">Fecha y hora</div>
                            <div className={`flex items-center gap-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                <div>{moment(date).format('LL')},</div>
                                <div>a las {hour}</div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className={"font-bold uppercase text-lg"}>Fecha en que se agendó</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{moment(createdAt).format('LL')}</div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div className="uppercase font-semibold text-lg">Estado</div>
                            <div className={`${videoCallState == 'pending' ? 'bg-orange-500' : videoCallState == 'concluded' ? 'bg-light-main' : 'bg-red-500'} w-fit px-4 py-1 rounded-full text-white uppercase font-semibold select-none transition-colors flex justify-center`}>
                                <span>{videoCallState == 'pending' ? 'Pendiente' : videoCallState == 'concluded' ? 'Concluido' : 'Cancelado'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 sm:gap-0">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="uppercase font-semibold text-lg">Cambiar Estado</div>
                                <select value={videoCallState} onChange={(e) => handleChangeState(e.target.value)} className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} py-1 rounded-lg outline-none w-fit px-4`}>
                                    <option value="pending">Pendiente</option>
                                    <option value="concluded">Concluido</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-2">
                            {auth.permissions === 'superadmin' && (
                                <div className="flex items-start">
                                    <button onClick={handleShowModal} className={`${videoCallState != 'cancelled' ? 'bg-red-500 hover:border-red-500 hover:text-red-500' : 'bg-light-main hover:border-light-main hover:text-light-main'} hover:bg-transparent text-white py-2 px-4 rounded-sm uppercase font-semibold border-2 border-transparent transition-colors whitespace-nowrap`}>{videoCallState != 'cancelled' ? 'Cancelar videollamada' : 'Recuperar videollamada'}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            { showCancelMenu && 
                <CancelVideoCallMenu 
                    closeAnim={closeCancelMenuAnim} 
                    confirm={videoCallState != 'cancelled' ? handleCancelVideoCall : handleRecoverVideoCall} 
                    cancel={handleCloseModal} 
                    videoCallState={videoCallState} 
                />
            }
        </Layout>
    )
}

function CancelVideoCallMenu({ closeAnim, confirm, cancel, videoCallState }) {

    const { darkMode } = useContextProvider();

    return (
        <>
            <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
            <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-sm`}>
                <div className="flex flex-col gap-1">
                    <div className={`${videoCallState != 'cancelled' ? 'text-red-700' : 'text-light-main'} text-xl font-semibold uppercase`}>{videoCallState != 'cancelled' ? 'Cancelar videollamada' : 'Recuperar videollamada'}</div>
                    <div className="text-lg">¿Estás seguro que deseas {videoCallState != 'cancelled' ? 'cancelar' : 'recuperar'} esta videollamada?</div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={cancel}>Cancelar</button>
                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={confirm}>Confirmar</button>
                </div>
            </div>
        </>
    )
}