import axios from 'axios';
import { useEffect, useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router"
// Components
import Layout from "@/components/client/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Date and Hour Formatter
import moment from 'moment';
import Image from 'next/image';
// Languages
import lang from '../../../../lang/client/entry.json'

export default function ClientProjectEntry() {

    const router = useRouter();

    const { auth, darkMode, clientProject, language } = useContextProvider();

    const { entry: entryId } = router.query;

    const [ loading, setLoading ] = useState(true);
    const [ entry, setEntry ] = useState({});
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        if(Object.keys(auth).length != 0) {
            getEntry();
            return;
        }
    }, [auth])

    async function getEntry() {
        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post('/api/client/project/entry/get', { entryId, config });
            setEntry(data.entry);
            setComments(data.comments);
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    // Comment state and handler
    const commentTextarea = useRef(null);

    async function handleSendComment(e) {
        e.preventDefault();

        const message = commentTextarea.current.value;
        if(message == '') {
            return;
        }

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
            const { data } = await axios.post('/api/client/project/entry/comment/create', { entryId, message, config });
            setComments(current => current.concat([data]));
        } catch (error) {
            console.log(error.response.data.msg)
        } finally {
            commentTextarea.current.value = '';
        }
    }

    // Show fullScreen image state and handler
    const [ showImage, setShowImage ] = useState(false);
    const [ imageToShow, setImageToShow ] = useState("");
    function handleShowImage(url) {
        setShowImage(!showImage);
        setImageToShow(url || "");
    }

    return (
        <Layout title={loading ? 'Aufladen...' : !loading && (entry && Object.keys(entry).length != 0) ? entry.title : 'Dieser Eintrag existiert nicht'}>
            {loading && (
                <div className='grid place-content-center h-full'>
                    <LoadingSpinner />
                </div>
            )}
            {!loading && (entry &&  Object.keys(entry).length != 0) && (
                <div className="flex flex-col gap-5">
                    <button className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>{lang[language]["go-back"]}</span>
                    </button>
                    <div className='flex flex-col gap-1'>
                        <div className={`text-2xl`}>{entry.title}</div>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'} text-lg`}>{entry.description}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="uppercase font-medium text-lg">{lang[language].images}</div>
                        {entry.images.length != 0 ? (
                            <div className='grid grid-cols-4 gap-2'>
                                {entry.images.map((image, index) => (
                                    <Image className='rounded-md cursor-pointer' key={index} src={image} width={1920} height={1080} alt={"Entry image"} loading='eager' onClick={() => handleShowImage(image)} />
                                ))}
                            </div>
                        ) : 
                            <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{lang[language]["no-images"]}</div>
                        }
                        { showImage && (
                            <div onClick={handleShowImage}>
                                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
                                <div className={`fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-10 overflow-y-scroll h-screen hide-scroll`} style={{width: 'calc(100vw - 5rem)'}}>
                                    <Image className={`rounded-md border-2 ${darkMode ? 'border-neutral-700' : 'border-neutral-400'}`} src={imageToShow} width={1920} height={1080} alt={"Entry image"} loading='eager' />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="uppercase font-medium text-lg">{lang[language]["work-hours"]}</div>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{entry.work_hours}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="uppercase font-medium text-lg">{lang[language].date}</div>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{moment(entry.createdAt).format('LLL')}</div>
                    </div>
                    <div className={`flex flex-col gap-5 pt-5 pb-5 border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'}`}>
                        {clientProject?.project?.client?._id === auth._id && (
                            <div className={`flex flex-col gap-4 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} pb-4`}>
                                <div className="text-xl">{lang[language].comments.title}</div>
                                <form className="flex flex-col gap-2" onSubmit={handleSendComment}>
                                    <textarea 
                                        ref={commentTextarea}
                                        className={`bg-transparent border ${darkMode ? 'border-neutral-900 placeholder:text-neutral-500' : 'border-neutral-200 placeholder:text-neutral-300'} w-full px-3 py-2 resize-none outline-none`} 
                                        placeholder={lang[language].comments.placeholder}
                                        rows="3">
                                    </textarea>
                                    <div className="flex justify-end">
                                        <button type="submit" className="py-2 px-6 bg-primary text-white uppercase rounded-sm font-medium">{lang[language].comments.button}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {comments.length != 0 && comments.map((comment, index) => (
                                <EntryComment 
                                    key={index}
                                    comment={comment}
                                    comments={comments}
                                    setComments={setComments}
                                />
                            ))}
                            {comments.length == 0 && (
                                <div className="text-center">{lang[language].comments["no-comments"]}</div>
                            )}
                        </div>
                    </div>
                </div>
            )} 
            {!loading && !entry && (
                <div className="grid place-content-center gap-2 h-full text-center">
                    <div className="text-lg">{lang[language]["no-entry"]}</div>
                    <div className="flex items-center justify-center gap-1 cursor-pointer text-primary hover:text-primary-2 transition-colors" onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>{lang[language]["go-back"]}</span>
                    </div>
                </div>
            )}
        </Layout>
    )
}

function EntryComment({ comment, comments, setComments }) {
    
    const { darkMode, auth, language } = useContextProvider();
    
    const { _id, user, message, seen, createdAt } = comment;

    // Edit comment state
    const [ editingComment, setEditingComment ] = useState(false);
    // textarea value
    const [ textArea, setTextArea ] = useState(message);
    function handleEditingComment() {
        setEditingComment(!editingComment);
    }
    // On click "guardar" edit comment
    async function handleEditComment() {
        handleEditingComment();

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
            await axios.post('/api/client/project/entry/comment/edit', { comment: { _id, message: textArea }, config });
            const newComments = comments.map(comment => {
                if(comment._id == _id) {
                    comment.message = textArea;
                    return comment;
                }
                return comment;
            })
            setComments(newComments);
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    // Delete comment state
    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }
    // On click "confirm" in modal, delete comment.
    async function handleDeleteComment() {
        handleShowModal();

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
            await axios.post('/api/client/project/entry/comment/delete', { commentId: _id, config });
            const newComments = comments.filter(comment => comment._id != _id);
            setComments(newComments);
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    // Mark comment as seen
    async function handleMarkAsSeen() {
        // If project is already marked as seen
        if(seen) {
            return;
        }

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
            await axios.post('/api/client/project/entry/comment/seen', { commentId: _id, config });
            const newComments = comments.map(comment => {
                if(comment._id == _id) {
                    comment.seen = true;
                    return comment;
                }
                return comment;
            })
            setComments(newComments);
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <div className={`flex flex-col px-5 py-4 rounded-md shadow-md ${darkMode ? 'bg-[#101010]' : 'bg-zinc-100'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <div>{`${user.surname ? `${user.name} ${user.surname}` : `${user.name}` }` }</div>
                        <div className={`text-sm ${darkMode ? 'description-dark' : 'description-light'}`}>{seen ? `(${lang[language].seen})`: ''}</div>
                    </div>
                    {auth.permissions != 'client' && !seen && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-7 h-7 p-1 hover:bg-neutral-700 rounded-full transition-colors" onClick={handleMarkAsSeen}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </div>
                { (auth._id === user._id || auth.permissions === 'superadmin') && (
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-7 h-7 p-1 hover:bg-neutral-700 rounded-md transition-colors" onClick={handleEditingComment}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-7 h-7 p-1 hover:bg-red-700 rounded-md transition-colors" onClick={handleShowModal}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                )}
            </div>
            { editingComment ? (
                <div className="flex flex-col gap-2 mt-1 mb-3">
                    <textarea 
                        value={textArea}
                        onChange={(e) => setTextArea(e.target.value)}
                        className={`bg-transparent border ${darkMode ? 'border-neutral-900 placeholder:text-neutral-500' : 'border-neutral-200 placeholder:text-neutral-300'} w-full px-3 py-2 resize-none outline-none`} 
                        placeholder="Haz un comentario" 
                        rows="3">
                    </textarea>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleEditingComment} className="py-1 px-3 bg-red-500 hover:bg-red-800 transition-colors rounded-sm">{lang[language].comments.edit.cancel}</button>
                        <button onClick={handleEditComment} className="py-1 px-3 bg-primary hover:bg-primary-2 transition-colors rounded-sm">{lang[language].comments.edit.save}</button>
                    </div>
                </div>
            ) : (
                <div className={`${darkMode ? 'description-dark' : 'description-light'} break-words`}>{message}</div>
            )}
            <div className={`text-right text-sm font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{moment(createdAt).format('LLL')}</div>
            <Modal showModal={showModal}>
                <div className="flex flex-col gap-1">
                    <div className={`text-red-500 text-xl font-semibold uppercase`}>{lang[language].comments.delete.title}</div>
                    <div className="text-lg">{lang[language].comments.delete.description}</div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleShowModal}>{lang[language].comments.delete.cancel}</button>
                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleDeleteComment}>{lang[language].comments.delete.confirm}</button>
                </div>
            </Modal>
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
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen"></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md`}>
                    {children}
                </div>
            </>
        )
    )
}