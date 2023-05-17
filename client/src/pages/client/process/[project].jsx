import axios from "axios";
import { useEffect, useState } from "react";
// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/client/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
// Date and Hour Formatter
import moment from "moment";
// Hasher for cloudinary signature
import sha1 from 'sha1';

export default function ClientProjectProcess() {
    
    const { auth, clientProcess, setClientProcess } = useContextProvider();

    const [ loading, setLoading ] = useState(true);
    // Entries/Process state
    const [ entries, setEntries ] = useState([]);
    const [ hoursCount, setHoursCount ] = useState(0);

    useEffect(() => {
        if(clientProcess.length !== 0) {
            setEntries(clientProcess);
            setLoading(false);
        }
        if(Object.keys(auth).length != 0 && clientProcess.length === 0) {
            getProcess();
        }
    }, [auth, clientProcess]);

    useEffect(() => {
        calculateHours(entries);
    }, [entries])

    async function getProcess() {
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
            const { data } = await axios.post('/api/client/project/entry/getEntries', { config });
            const sortedByDate = data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setClientProcess(sortedByDate)
            setEntries(sortedByDate);
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    function calculateHours(array) {
        let total = 0;

        array.map(item => {
            total += item.work_hours;
        })

        setHoursCount(total);
    }

    return (
        <Layout title={loading ? 'Aufladen...' : 'Verfahren'}>
            {loading && (
                <div className="grid place-content-center h-full w-full">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && entries.length != 0 ? (
                <div className="flex flex-col divide-y px-3">
                    <div className="pb-3 text-lg">Gesamtstunden: {hoursCount}</div>
                    {entries.map((entry, index) => (
                        <EntryRow key={index} entry={entry} entries={entries} setEntries={setEntries} />
                    ))}
                </div>
            ) : (
                <div className="grid place-content-center h-full text-lg">Es sind noch keine Inhalte zum Anzeigen vorhanden</div>
            )}
        </Layout>
    )
}

function EntryRow({ entry, entries, setEntries }) {

    const { auth, darkMode } = useContextProvider();

    // Entry edit modal state and handler
    const [ editModal, setEditModal ] = useState(false);
    const handleShowEditModal = () => setEditModal(!editModal);
    const [ title, setTitle ] = useState(entry.title);
    const [ description, setDescription ] = useState(entry.description);
    const [ images, setImages ] = useState(entry.images || []);
    const [ workHours, setWorkHours ] = useState(entry.work_hours);
    async function handleEditEntry() {
        if([title, description, workHours].includes('') || images.length === 0) {
            return;
        }

        // Close modal
        handleShowEditModal();

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.post('/api/client/project/entry/edit', { entry: { _id: entry._id, title, description, images, work_hours: workHours}, config });
            setEntries(item => item.map(mapEntry => {
                if(mapEntry._id === entry._id) {
                    return {_id: mapEntry._id, user: mapEntry.user, title, description, images, work_hours: workHours, createdAt: entry.createdAt}
                }
                return mapEntry;
            }));
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        }
    }

    // Entry delete modal state and handler
    const [ deleteModal, setDeleteModal ] = useState(false);
    const handleShowDeleteModal = () => setDeleteModal(!deleteModal);
    async function handleDeleteEntry() {
        // Close modal
        handleShowDeleteModal();

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await deleteImages();
            await axios.post('/api/client/project/entry/delete', { entryId: entry._id, config });
            const newEntries = entries.filter(item => item._id !== entry._id);
            const sortedByDate = newEntries.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setEntries(sortedByDate);
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        }

        async function deleteImages() {
            for(const image of images) {
                const public_id = `entries/${image.split('/')[8].split('.')[0]}`;
                const timestamp = Math.floor(Date.now() / 1000);
                const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;  
                const api_secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
                const signature = sha1(`public_id=${public_id}&timestamp=${timestamp}` + api_secret)
                let formData = new FormData();
                formData.append('public_id', public_id);
                formData.append('signature', signature);
                formData.append('api_key', api_key);
                formData.append('timestamp', timestamp);
                try {
                    await axios.request({
                        url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
                        maxBodyLength: Infinity,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    })
                } catch (error) {
                    console.log(error.response.data)
                }
            }
        }
    }

    return (
        <div className={`${darkMode ? 'border-neutral-800' : 'border-neutral-400'} rounded-sm py-4 relative`}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <div className="uppercase font-semibold">der Überschrift</div>
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{entry.title}</div>
                </div>
                <div className="flex flex-col">
                    <div className="uppercase font-semibold">Beschreibung</div>
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{entry.description}</div>
                </div>
                <div className="flex flex-col">
                    <div className="uppercase font-semibold">Bilder</div>
                    {entry.images.length != 0 ? (
                        <div className="text-primary hover:text-primary-2 transition-colors cursor-pointer w-fit">Zeigen</div>
                    ) : 
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>Keine Bilder</div>
                    }
                </div>
                <div className="flex flex-col">
                    <div className="uppercase font-semibold">Arbeitsstunden</div>
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{entry.work_hours}</div>
                </div>
                <div className="flex flex-col">
                    <div className="uppercase font-semibold">Datum</div>
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{moment(entry.createdAt).format('LL')}</div>
                </div>
            </div>
            <div className="flex items-center gap-2 xs:absolute pt-4 xs:pt-0 bottom-3 right-3">
                {auth._id === entry.user && (
                    <>
                        <button className={`p-2 rounded-full ${darkMode ? 'bg-neutral-900 hover:bg-primary' : 'bg-neutral-300 hover:bg-neutral-400'} transition-colors`} onClick={handleShowEditModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                        <button className={`p-2 rounded-full ${darkMode ? 'bg-neutral-900 hover:bg-red-800' : 'bg-neutral-300 hover:bg-neutral-400'} transition-colors`} onClick={handleShowDeleteModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                        <Modal showModal={editModal}>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="title">Titulo</label>
                                        <input id="title" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2`} type="text" onChange={e => setTitle(e.target.value)} value={title} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label>Descripción</label>
                                        <textarea rows={4} className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2 resize-none`} type="text" onChange={e => setDescription(e.target.value)} value={description} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="title">Imágenes {"(en desarrollo)"}</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="aspect-video bg-neutral-700 rounded-md"></div>
                                            <div className="aspect-video bg-neutral-700 rounded-md"></div>
                                            <div className="aspect-video bg-neutral-700 rounded-md"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="hours">Horas</label>
                                        <input id="hours" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2`} type="text" onChange={e => setWorkHours(e.target.value)} value={workHours} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="py-2 px-4 bg-red-500 hover:bg-red-800 transition-colors text-white rounded-sm" onClick={handleShowEditModal}>Cancelar</button>
                                    <button className="py-2 px-4 bg-primary hover:bg-primary-2 transition-colors text-white rounded-sm" onClick={handleEditEntry}>Guardar</button>
                                </div>
                            </div>
                        </Modal>
                        <Modal showModal={deleteModal}>
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-2">
                                    <div className="text-xl text-red-500">Eliminar entrada</div>
                                    <div>¿Estás seguro que quieres eliminar esta entrada?</div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <button className="py-2 px-4 bg-primary hover:bg-primary-2 transition-colors text-white rounded-sm" onClick={handleShowDeleteModal}>Cancelar</button>
                                    <button className="py-2 px-4 bg-red-500 hover:bg-red-800 transition-colors text-white rounded-sm" onClick={handleDeleteEntry}>Eliminar</button>
                                </div>
                            </div>
                        </Modal>
                    </>
                )}
                <Link href={`/client/process/entry/${entry._id}`} className={`p-2 rounded-full ${darkMode ? 'bg-neutral-900 hover:bg-neutral-800' : 'bg-neutral-300 hover:bg-neutral-400'} transition-colors`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </Link>
            </div>
        </div>
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
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen z-10"></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md z-10 w-[95%] xs:w-[22rem] md:w-[25rem]`}>
                    {children}
                </div>
            </>
        )
    )
}