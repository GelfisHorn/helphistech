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
import LoadingSpinner from "@/components/LoadingSpinner";

export default function VideoCallDynamic() {
    
    const { auth, darkMode } = useContextProvider();

    const router = useRouter();
    // Get videocall id from url params
    const videoCallId = router.query.videocall;

    // videocall data
    const [ loading, setLoading ] = useState(true);
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

        try {
            const { data } = await axios.post(`/api/admin/getVideoCall`, { _id: videoCallId, config });
            setVideoCall(data);
            setVideoCallState(data.state)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    function handleShowDeleteModal() {
        setShowDeleteModal(!showDeleteModal);
    }
    async function handleDeleteVideoCall() {
        handleShowDeleteModal();

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

        await axios.post('/api/admin/videocalls/delete', { _id: videoCallId, config });
        router.push(`/admin/videocalls`);
    }

    return (
        <Layout title={'Videollamada'}>
            {loading && (
                <div className="grid place-content-center h-full">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && Object.keys(videoCall).length != 0 && (
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col gap-3 px-5 rounded-lg`}>
                    <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-5 border-b py-3`}>
                        <div className="flex flex-col">
                            <div className="font-bold uppercase text-lg">Nombre completo</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{full_name}</div>    
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold uppercase text-lg">Correo electrónico</div>
                            <a href={`mailto:${email}`} className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} text-ellipsis-5`}>{email}</a>    
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
                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 sm:gap-0">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <div className="uppercase font-semibold text-lg">Cambiar Estado</div>
                                    <select value={videoCallState} onChange={(e) => handleChangeState(e.target.value)} className={`${darkMode ? 'bg-neutral-300 text-black' : 'bg-neutral-500 text-white'} py-2 rounded-lg outline-none w-fit px-4`}>
                                        <option value="pending">Pendiente</option>
                                        <option value="concluded">Concluido</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-2">
                                {auth.permissions === 'superadmin' && (
                                    <div className="flex items-start">
                                        <button onClick={handleShowModal} className={`${videoCallState != 'cancelled' ? 'bg-red-500 hover:border-red-500 hover:text-red-500' : 'bg-light-main hover:border-light-main hover:text-light-main'} hover:bg-transparent text-white py-2 px-4 rounded-md uppercase font-semibold border-2 border-transparent transition-colors whitespace-nowrap`}>{videoCallState != 'cancelled' ? 'Cancelar videollamada' : 'Recuperar videollamada'}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        { videoCallState == 'cancelled' && auth.permissions === 'superadmin' && (
                            <>
                                <div className="flex flex-col gap-1 items-start">
                                    <div className="uppercase text-lg font-medium">Eliminar videollamada</div>
                                    <button onClick={handleShowDeleteModal} className="py-2 px-6 rounded-sm bg-red-500 hover:bg-red-800">Eliminar videollamada</button>
                                </div>
                                <Modal showModal={showDeleteModal}>
                                    <div className="flex flex-col gap-1">
                                        <div className={'text-red-700 text-xl font-semibold uppercase'}>Eliminar Videollamada</div>
                                        <div className="text-lg">¿Estás seguro que deseas eliminar esta videollamada?</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button className="bg-light-main hover:bg-indigo-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={handleShowDeleteModal}>Cancelar</button>
                                        <button className="bg-red-500 hover:bg-red-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={handleDeleteVideoCall}>Confirmar</button>
                                    </div>
                                </Modal>
                            </>
                        )}
                    </div>
                </div>
            )}
            {!loading && Object.keys(videoCall).length == 0 && (
                <div className={`grid place-content-center gap-2 ${darkMode ? 'text-dark-text' : 'text-black'} h-full`}>
                    <h3 className="text-2xl">Esta videollamada no existe.</h3>
                    <button className="flex items-center justify-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.push('/admin/videocalls')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Volver a videollamadas</span>
                    </button>
                </div>
            )}
            <Modal showModal={showCancelMenu}>
                <div className="flex flex-col gap-1">
                    <div className={`${videoCallState != 'cancelled' ? 'text-red-700' : 'text-light-main'} text-xl font-semibold uppercase`}>{videoCallState != 'cancelled' ? 'Cancelar videollamada' : 'Recuperar videollamada'}</div>
                    <div className="text-lg">¿Estás seguro que deseas {videoCallState != 'cancelled' ? 'cancelar' : 'recuperar'} esta videollamada?</div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={handleCloseModal}>Cancelar</button>
                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-sm px-4 py-2 uppercase font-semibold transition-colors" onClick={videoCallState == 'cancelled' ? handleRecoverVideoCall : handleCancelVideoCall}>Confirmar</button>
                </div>
            </Modal>
        </Layout>
    )
}

function Modal({ showModal, children }) {

    const { darkMode } = useContextProvider();

    const [ show, setShow ] = useState(false);
    const [ closeAnim, setCloseAnim ] = useState(false);

    function handleShowModal() {
        setShow(true);
    }

    function handleCloseModal() {
        setCloseAnim(true);
        setTimeout(() => {
            setCloseAnim(false);
            setShow(false);
        }, 170)
    }

    useEffect(() => {
        if(showModal) {
            handleShowModal();
            return;
        }
        handleCloseModal();
    }, [showModal])

    return (
        show && (
            <>
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md`}>
                    {children}
                </div>
            </>
        )
    )
}