import axios from "axios";
import { useEffect, useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Components
import Layout from "@/components/client/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Languages
import lang from '../../../lang/client/project.json'

// Parse company and project data
const COMPANY = {
    "business_type": {
        "retail": "Einzelhandel",
        "service": "Service",
        "manufacturing": "Herstellung"
    },
    "company_vision": {
        "increase-profitability": "Steigern Sie die Rentabilität",
        "enhance-customer-satisfaction": "Verbesserung der Kundenzufriedenheit",
        "promote-sustainability": "Nachhaltigkeit fördern"
    },
    "target_audience": {
        "children": "Kinder",
        "teenagers": "Teenager",
        "young-adults": "Junge Erwachsene",
        "adults": "Erwachsene",
        "seniors": "ältere Erwachsene"
    },
    "service_or_product": {
        "products": "Produkte",
        "services": "Dienstleistungen"
    },
    "expected_deilvertime": {
        0: "weniger als 1 Monat",
        1: "Zwischen 1 und 3 Monaten",
        3: "Zwischen 3 und 6 Monaten",
        6: "mehr als 6 Monate"
    }
}

const PROJECT = {
    "functionalities": {
        "contact-form": "Kontakt Formular",
        "image-gallery": "Bildergalerie",
        "blog-section": "Blog-Bereich",
        "social-media-integration": "Social-Media-Integration"
    },
    "responsible_for_managing": {
        "client": "Der Kunde",
        "developer": "der Entwickler"
    },
    "marketing_strategy": {
        "social-media": "Soziale Netzwerke",
        "email-marketing": "Email",
        "SEO": "SEO",
    }
}

export default function ClientProject() {
    
    const router = useRouter();

    const { project: projectId } = router.query;

    const { auth, darkMode, clientProject, setClientProject, language } = useContextProvider();

    const [ loading, setLoading ] = useState(true);
    const [ projectComments, setProjectComments ] = useState([]);
    const [ showCompanyInfo, setShowCompanyInfo ] = useState(false);
    const [ showProjectInfo, setShowProjectInfo ] = useState(false);

    useEffect(() => {
        if(Object.keys(auth).length !== 0 && Object.keys(clientProject).length === 0) {
            getProject();
            return;
        }
        setProjectComments(clientProject.comments || []);
        setLoading(false);
    }, [auth, clientProject])

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
            const { data } = await axios.post(`/api/client/getProject`, {config, clientId: projectId});
            setClientProject(data);
            setProjectComments(data.comments);
        } catch (err) {
            const error = new Error(err);
            console.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const commentTextarea = useRef('');

    async function handleSendComment(e) {
        e.preventDefault();

        const message = commentTextarea.current.value;
        if(message == '') {
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
            commentTextarea.current.value = '';
            const { data } = await axios.post('/api/client/comment/create', { projectId: clientProject.project._id, message, config });
            setProjectComments(current => current.concat([data]));
        } catch (error) {
            const err = new Error(error.response.data.msg);
            console.error(err.message);
        }
    }
    
    return (
        <Layout title={loading ? 'Aufladen...' : !loading && Object.keys(clientProject).length != 0 ? `Projekt: ${clientProject?.project?.client?.name}` : `Dieses Projekt existiert nicht`}>
            {loading && Object.keys(clientProject).length == 0 && (
                <div className="grid place-content-center h-full">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && Object.keys(clientProject).length != 0 && (
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col gap-3 px-5 rounded-lg`}>
                    <div className={`flex flex-col pt-3`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-3">
                            <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                                <div className="uppercase font-semibold">{lang[language]["project-name"]}</div>
                                <div>{clientProject.project.contact_information.company_name}</div>    
                            </div>
                            <div className="flex sm:justify-end font-semibold">{moment(clientProject.project.createdAt).format('LLL')}</div>
                        </div>
                        <div className="flex flex-col gap-2 py-3">
                            <div className="text-lg font-semibold uppercase">{lang[language].description}</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{clientProject.project.description ? clientProject.project.description : "Sin descripción"}</div>    
                        </div>
                        {/* <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col py-3 border-t`}>
                            <div className="text-lg font-semibold uppercase">Presupuesto</div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                                <div className="flex items-center gap-1">
                                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                                    <div className="font-semibold">{currencyFormatter(clientProject.project.budget.from)}</div>     
                                </div>   
                                <div className="flex items-center gap-1">
                                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                                    <div className="font-semibold">{currencyFormatter(clientProject.project.budget.to)}</div>     
                                </div>       
                            </div>    
                        </div> */}
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">{lang[language].contact.title}</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="uppercase font-medium">{lang[language].contact["full-name"]}</div>
                                    <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{clientProject.project.contact_information.full_name}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="uppercase font-medium">{lang[language].contact.email}</div>
                                    <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                        <a href={`mailto:${clientProject.project.contact_information.email}`}>{clientProject.project.contact_information.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">{lang[language].company.title}</div>
                            { showCompanyInfo && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].company["business-type"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{lang[language].company["business-type"][clientProject.project.company_info.business_type]}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].company["company-vision"].title}</div>
                                        <div className="flex flex-col">
                                            {clientProject.project.company_info.company_vision.map((vision, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {lang[language].company["company-vision"][vision]}
                                                    {(clientProject.project.company_info.company_vision.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].company["target-audience"].title}</div>
                                        <div className="flex flex-col">
                                            {clientProject.project.company_info.target_audience.map((audience, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {lang[language].company["target-audience"][audience]}
                                                    {(clientProject.project.company_info.target_audience.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].company["service-or-product"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                            {lang[language].company["service-or-product"][clientProject.project.company_info.service_or_product]}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].company["expected-deilvertime"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                            {lang[language].company["expected-deilvertime"][clientProject.project.company_info.expected_deilvertime.from]}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div onClick={() => setShowCompanyInfo(current => !current)} className="text-primary hover:text-primary-2 cursor-pointer w-fit">{showCompanyInfo ? lang[language].hide : lang[language].show}</div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">{lang[language].project.title}</div>
                            {showProjectInfo && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project.functionalities.title}</div>
                                        <div className="flex flex-col">
                                            {clientProject.project.project_info.functionalities.map((func, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {lang[language].project.functionalities[func]}
                                                    {(clientProject.project.project_info.functionalities.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project["ecommerce-functionalities"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{clientProject.project.project_info.ecommerce_funtionabilites ? 'Ja' : 'No'}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project["client-content"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{clientProject.project.project_info.content_to_include ? 'Ja' : 'No'}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project["preferred-technologies"].title}</div>
                                        <div className="flex flex-col">
                                            {clientProject.project.project_info.preferred_technologies.map((tech, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {tech}
                                                    {(clientProject.project.project_info.preferred_technologies.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project["responsible-for-managing"].title}</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{lang[language].project["responsible-for-managing"][clientProject.project.project_info.responsible_for_managing]}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">{lang[language].project["marketing-strategy"].title}</div>
                                        <div className="flex flex-col">
                                            {clientProject.project.project_info.marketing_strategy.map((strat, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {lang[language].project["marketing-strategy"][strat]}
                                                    {(clientProject.project.project_info.marketing_strategy.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    { clientProject.project.project_info.competitor_websites ? (
                                        <div className="flex flex-col">
                                            <div className="uppercase font-medium">{lang[language].project["competitor-websites"].title}</div>
                                            {clientProject.project.project_info?.competitor_websites_examples ? clientProject.project.project_info.competitor_websites_examples.split(',').map((url, index) => (
                                                <div className="flex items-center">
                                                    <Link key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'} href={url.slice(0,6) == 'https://' ? url.trim() : `https://${url.trim()}`} target="_blank">{url}</Link>
                                                    {(clientProject.project.project_info.competitor_websites_examples.split(',').length - 1) > index ? ',' : ''}
                                                </div>
                                            )) : null}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                            <div onClick={() => setShowProjectInfo(current => !current)} className="text-primary hover:text-primary-2 cursor-pointer w-fit">{showProjectInfo ? lang[language].hide : lang[language].show}</div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t pt-3`}>
                            <Link href={`/client/process/${clientProject.project._id}`} className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors">
                                <span>{lang[language]["go-tickets"]}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-5 pt-5 pb-5 border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'}`}>
                        {clientProject.project.client._id === auth._id && (
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
                                        <button type="submit" className="py-2 px-6 bg-primary hover:bg-primary-2 transition-colors text-white uppercase rounded-sm font-medium">{lang[language].comments.button}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            {projectComments.length != 0 && projectComments.map((comment, index) => (
                                <ProjectComment 
                                    key={index}
                                    comment={comment}
                                    comments={projectComments}
                                    setComments={setProjectComments}
                                />
                            ))}
                            {projectComments.length == 0 && (
                                <div className="text-center">{lang[language].comments["no-comments"]}</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!loading && Object.keys(clientProject).length == 0 &&(
                <div className="grid place-content-center gap-2 h-full text-center">
                    <div className="text-lg">Dieses Projekt existiert nicht</div>
                    <div className="flex items-center justify-center gap-1 cursor-pointer text-primary hover:text-primary-2 transition-colors" onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Zurückkehren</span>
                    </div>
                </div>
            )}
        </Layout>
    )
}

function ProjectComment({ comment, comments, setComments }) {
    
    const { darkMode, auth, clientProject, language } = useContextProvider();

    const projectId = clientProject.project._id;
    
    const { _id, user, message, createdAt, seen } = comment;

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
            await axios.post('/api/client/comment/edit', { commentId: _id, message: textArea, config });
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
            await axios.post('/api/client/comment/delete', { commentId: _id, config });
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
            await axios.post('/api/client/comment/seen', { commentId: _id, config });
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
                        <div className={`text-sm ${darkMode ? 'description-dark' : 'description-light'}`}>{seen ? `(${lang[language].comments.seen})` : ''}</div>
                    </div>
                    {auth.permissions != 'client' && !seen && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-7 h-7 p-1 hover:bg-neutral-700 rounded-full transition-colors" onClick={handleMarkAsSeen}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </div>
                { auth._id === user._id && (
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`cursor-pointer w-7 h-7 p-1 ${darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-400'} rounded-full transition-colors`} onClick={handleEditingComment}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-7 h-7 p-1 hover:bg-red-700 hover:text-white rounded-full transition-colors" onClick={handleShowModal}>
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
                        placeholder="Machen Sie einen Kommentar" 
                        rows="3">
                    </textarea>
                    <div className="flex justify-end gap-2">
                        <button onClick={handleEditingComment} className="py-1 px-3 text-white bg-red-500 hover:bg-red-800 transition-colors rounded-sm">{lang[language].comments.edit.cancel}</button>
                        <button onClick={handleEditComment} className="py-1 px-3 text-white bg-primary hover:bg-primary-2 transition-colors rounded-sm">{lang[language].comments.edit.save}</button>
                    </div>
                </div>
            ) : (
                <div className={`break-words ${darkMode ? 'description-dark' : 'description-light'}`}>{message}</div>
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