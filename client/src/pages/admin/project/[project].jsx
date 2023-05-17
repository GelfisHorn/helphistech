import axios from "axios";
// React
import { useEffect, useRef, useState } from "react";
// Nextjs
import { useRouter } from "next/router"
import Link from "next/link";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

// Parse company and project data
const COMPANY = {
    "business_type": {
        "retail": "Minorista",
        "service": "Servicio",
        "manufacturing": "Fabricación"
    },
    "company_vision": {
        "increase-profitability": "Aumentar la rentabilidad",
        "enhance-customer-satisfaction": "Mejorar la satisfacción del cliente",
        "promote-sustainability": "Promover la sostenibilidad"
    },
    "target_audience": {
        "children": "Niños",
        "teenagers": "Adolecentes",
        "young-adults": "Jovenes adultos",
        "adults": "Adultos",
        "seniors": "Mayores"
    },
    "service_or_product": {
        "products": "Productos",
        "services": "Servicios"
    },
    "expected_deilvertime": {
        0: "Menos de 1 mes",
        1: "Entre 1 y 3 meses",
        3: "Entre 3 y 6 meses",
        6: "Más de 6 meses"
    }
}

const PROJECT = {
    "functionalities": {
        "contact-form": "Formulario de contacto",
        "image-gallery": "Galería de imágenes",
        "blog-section": "Sección blog",
        "social-media-integration": "Integración de redes sociales"
    },
    "web_design_type": {
        "responsive": "Responsive",
        "specific-design": "Diseño específico"
    },
    "responsible_for_managing": {
        "client": "El cliente",
        "developer": "El desarrollador"
    },
    "marketing_strategy": {
        "social-media": "Redes sociales",
        "email-marketing": "Correo electrónico",
        "SEO": "SEO",
    }
}

export default function ProjectDynamic() {
    
    const { auth, darkMode } = useContextProvider();

    const router = useRouter();
    // Get project id from url params
    const projectId = router.query.project;

    // Project data
    const [ loading, setLoading ] = useState(true);
    const [ project, setProject ] = useState({});
    const [ projectComments, setProjectComments ] = useState([]);
    const { project_info, company_info, website_type, contact_information, budget, description, state } = project;

    const [ projectState, setProjectState ] = useState(state);

    // On component load fetch project
    useEffect(() => {
        if(projectId) {
            getProject();
        }
    }, [projectId])

    // Fetch project data
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
            const { data } = await axios.post(`/api/admin/getProject`, { _id: projectId, config });
            setProject(data.project);
            setProjectComments(data.comments);
            setProjectState(data.project.state)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleChangeState() {
        if(projectState == 'cancelled') return;

        let state;

        if(projectState == 'onhold') {
            setProjectState('inprogress');
            state = 'inprogress';
        }
        if(projectState == 'inprogress') {
            setProjectState('completed');
            state = 'completed';
        }
        if(projectState == 'completed') {
            setProjectState('onhold');
            state = 'onhold';
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

        await axios.post('/api/admin/changeProjectState', { _id: project._id, state, config });
    }

    // Confirm cancel project state and menu
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
    async function handleCancelProject() {
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

        await axios.post('/api/admin/cancelProject', { _id: project._id, config })
        router.push(`/admin/projects`)
    }
    async function handleRecoverProject() {
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

        await axios.post('/api/admin/changeProjectState', { _id: project._id, state: "onhold", config })
        router.push(`/admin/projects`)
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
            const comment = { userId: auth._id, projectId, message }
            const { data } = await axios.post('/api/admin/projectComments/create', { config, comment });
            setProjectComments(current => current.concat([data.comment]));
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const [ showCompanyInfo, setShowCompanyInfo ] = useState(false);
    const [ showProjectInfo, setShowProjectInfo ] = useState(false);

    // Create entry modal state
    const [ showEntryModal, setShowEntryModal ] = useState(false);
    // Switch "showEntryModal" state
    const handleShowEntryModal = () => setShowEntryModal(!showEntryModal);

    // Entry modal fields state
    const entryTitle = useRef('');
    const entryDescription = useRef('');
    const entryImages = '';
    // const entryImages = useRef('');
    const entryWorkHours = useRef('');
    // Create entry
    async function handleCreateEntry(e) {
        e.preventDefault();

        const title = entryTitle.current.value;
        const description = entryDescription.current.value;
        const work_hours = entryWorkHours.current.value;

        if([title, description, work_hours].includes('')) {
            return;
        }

        // Get authentication token from localStorage
        const token = localStorage.getItem('auth-token');

        const config = {
            headers: {
                "Content-Type": "application-json",
                Authorization: `Bearer ${token}`
            }
        }

        handleShowEntryModal();

        async function resetForm() {
            Promise.resolve(() => {
                entryTitle.current.value = '';
                entryDescription.current.value = '';
                entryWorkHours.current.value = '';
            });
        }

        const entry = { title, description, images: entryImages, work_hours };
        try {
            const { data } = await axios.post('/api/admin/projects/project/entry/create', { projectId, entry, config });
            await resetForm();
            router.push(`/client/process/entry/${data._id}`);
        } catch (err) {
            const error = new Error(err.response.data.msg);
            console.error(error.message);
        }
    } 

    return (
        <Layout title={'Proyecto'}>
            {loading && (
                <div className="grid place-content-center h-full">
                    <LoadingSpinner />
                </div>
            )}
            {!loading && Object.keys(project).length != 0 && (
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col gap-3 px-5 rounded-lg`}>
                    <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col border-b py-3`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 pb-3">
                            <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                                <div className="uppercase font-semibold">Proyecto:</div>
                                <div>{website_type == 'website' ? 'Sitio web' : website_type == 'ecommerce' ? 'E-Commerce' : website_type == 'app' && 'Aplicación'}</div>    
                            </div>
                            <div className="flex sm:justify-end font-semibold">{moment(project.createdAt).format('LLL')}</div>
                        </div>
                        <div className="flex flex-col gap-2 py-3">
                            <div className="text-lg font-semibold uppercase">Descripción</div>
                            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{description ? description : "Sin descripción"}</div>    
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col py-3 border-t`}>
                            <div className="text-lg font-semibold uppercase">Presupuesto</div>
                            <div className="flex flex-col xs:flex-row xs:items-center gap-1">
                                <div className="flex items-center gap-1">
                                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                                    <div className="font-semibold">{currencyFormatter(budget.from)}</div>     
                                </div>   
                                <div className="flex items-center gap-1">
                                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                                    <div className="font-semibold">{currencyFormatter(budget.to)}</div>     
                                </div>       
                            </div>    
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">Información de contacto</div>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="uppercase font-medium">Nombre completo</div>
                                    <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{contact_information.full_name}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="uppercase font-medium">Correo electrónico</div>
                                    <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                        <a href={`mailto:${contact_information.email}`}>{contact_information.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">Información de la compañía</div>
                            { showCompanyInfo && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Tipo de negocio</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{COMPANY["business_type"][company_info.business_type]}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Visión</div>
                                        <div className="flex flex-col">
                                            {company_info.company_vision.map((vision, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {COMPANY["company_vision"][vision]}
                                                    {(company_info.company_vision.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Público objetivo</div>
                                        <div className="flex flex-col">
                                            {company_info.target_audience.map((audience, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {COMPANY["target_audience"][audience]}
                                                    {(company_info.target_audience.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Negocio</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                            {COMPANY["service_or_product"][company_info.service_or_product]}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Plazo de entrega</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                            {COMPANY["expected_deilvertime"][company_info.expected_deilvertime.from]}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div onClick={() => setShowCompanyInfo(current => !current)} className="text-primary hover:text-primary-2 cursor-pointer w-fit">{showCompanyInfo ? 'Ocultar' : 'Mostrar'}</div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col gap-2 border-t py-3`}>
                            <div className="text-lg font-semibold uppercase">Información del proyecto</div>
                            {showProjectInfo && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Funcionabilidades</div>
                                        <div className="flex flex-col">
                                            {project_info.functionalities.map((func, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {PROJECT["functionalities"][func]}
                                                    {(project_info.functionalities.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Tipo de diseño</div>
                                        <div className="flex flex-col">
                                            {project_info.web_design_type.map((design, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {PROJECT["web_design_type"][design]}
                                                    {(project_info.web_design_type.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Funcionabilidades de e-commerce</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{project_info.ecommerce_funtionabilites ? 'Sí' : 'No'}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Contenido del cliente</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{project_info.content_to_include ? 'Sí' : 'No'}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Tecnologías preferidas</div>
                                        <div className="flex flex-col">
                                            {project_info.preferred_technologies.map((tech, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {tech}
                                                    {(project_info.preferred_technologies.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Responsable del matenimiento</div>
                                        <div className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>{PROJECT["responsible_for_managing"][project_info.responsible_for_managing]}</div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="uppercase font-medium">Estrategia de marketing</div>
                                        <div className="flex flex-col">
                                            {project_info.marketing_strategy.map((strat, index) => (
                                                <div key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
                                                    {PROJECT["marketing_strategy"][strat]}
                                                    {(project_info.marketing_strategy.length - 1) > index ? ',' : ''}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    { project_info.competitor_websites ? (
                                        <div className="flex flex-col">
                                            <div className="uppercase font-medium">Sitios web de la cometencia</div>
                                            {project_info?.competitor_websites_examples ? project_info.competitor_websites_examples.split(',').map((url, index) => (
                                                <div className="flex items-center">
                                                    <Link key={index} className={darkMode ? 'text-zinc-400' : 'text-zinc-600'} href={url.slice(0,6) == 'https://' ? url.trim() : `https://${url.trim()}`} target="_blank">{url}</Link>
                                                    {(project_info.competitor_websites_examples.split(',').length - 1) > index ? ',' : ''}
                                                </div>
                                            )) : null}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                            <div onClick={() => setShowProjectInfo(current => !current)} className="text-primary hover:text-primary-2 cursor-pointer w-fit">{showProjectInfo ? 'Ocultar' : 'Mostrar'}</div>
                        </div>
                        <div className={`${darkMode ? 'border-neutral-900' : 'border-neutral-200'} flex flex-col xs:flex-row xs:items-center gap-2 border-t pt-3`}>
                            <div className="uppercase font-semibold text-lg">Estado</div>
                            <div className={`${projectState == 'onhold' ? 'bg-yellow-500' : projectState == 'inprogress' ? 'bg-orange-500' : projectState == 'completed' ? 'bg-light-main' :  'bg-red-500'} w-fit px-4 py-1 rounded-full text-white uppercase font-semibold select-none transition-colors flex justify-center`}>
                                <span>{projectState == 'onhold' ? 'En espera' : projectState == 'inprogress' ? 'En desarrollo' : projectState == 'completed' ? 'Completado' : 'Cancelado'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 sm:gap-0 pb-3">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="uppercase font-semibold text-lg">Cambiar Estado</div>
                                <select value={projectState} onChange={(e) => handleChangeState(e.target.value)} className={`${darkMode ? 'bg-white text-black' : 'bg-black text-white'} py-1 rounded-lg outline-none w-fit px-4`}>
                                    <option value="onhold">En espera</option>
                                    <option value="inprogress">En desarrollo</option>
                                    <option value="completed">Completado</option>
                                </select>
                            </div>
                        </div>
                        <div className="pt-2">
                            {auth.permissions === 'superadmin' && (
                                <div className="flex items-start">
                                    <button onClick={handleShowModal} className={`${projectState != 'cancelled' ? 'bg-red-500 hover:border-red-500 hover:text-red-500' : 'bg-light-main hover:border-light-main hover:text-light-main'} hover:bg-transparent text-white py-2 px-4 rounded-md uppercase font-semibold border-2 border-transparent transition-colors whitespace-nowrap`}>{projectState != 'cancelled' ? 'Cancelar proyecto' : 'Recuperar proyecto'}</button>
                                </div>
                            )}
                        </div>
                    </div>
                    {auth.permissions === 'developer' && (
                        <>
                            <div className={`flex flex-col gap-5 border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} pt-5 pb-2`}>
                                <div className="uppercase font-medium text-lg">Desarrollador</div>
                                <div className="flex items-center justify-between ">
                                    <button className="text-primary hover:text-primary-2 transition-colors hover:underline" onClick={() => router.push(`/client/process/${projectId}`)}>Ver entradas</button>
                                    <button className="text-primary hover:text-primary-2 transition-colors hover:underline" onClick={handleShowEntryModal}>Crear entrada</button>
                                </div>
                            </div>
                            <Modal showModal={showEntryModal}>
                                <div className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="title">Titulo</label>
                                            <input id="title" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2`} type="text" ref={entryTitle} placeholder="Escribe un titulo" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label>Descripción</label>
                                            <textarea rows={4} className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2 resize-none`} type="text" ref={entryDescription} placeholder="Escribe un descripción" />
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
                                            <input id="hours" className={`bg-transparent outline-none border ${darkMode ? 'border-neutral-700' : 'border-neutral-400'} rounded-md py-1 px-2`} type="text" ref={entryWorkHours} placeholder="Horas de trabajo" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <button className="py-2 px-4 bg-red-500 hover:bg-red-800 transition-colors text-white rounded-sm" onClick={handleShowEntryModal}>Cancelar</button>
                                        <button className="py-2 px-4 bg-primary hover:bg-primary-2 transition-colors text-white rounded-sm" onClick={handleCreateEntry}>Crear</button>
                                    </div>
                                </div>
                            </Modal>
                        </>
                    )}
                    <div className={`flex flex-col gap-5 py-5 border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'}`}>
                        <div className={`flex flex-col gap-4 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} pb-4`}>
                            <div className="text-xl">Comentarios</div>
                            <form className="flex flex-col gap-2" onSubmit={handleSendComment}>
                                <textarea 
                                    ref={commentTextarea}
                                    className={`bg-transparent border ${darkMode ? 'border-neutral-900 placeholder:text-neutral-500' : 'border-neutral-200 placeholder:text-neutral-300'} w-full px-3 py-2 resize-none outline-none`} 
                                    placeholder="Haz un comentario" 
                                    rows="3">
                                </textarea>
                                <div className="flex justify-end">
                                    <button type="submit" className="py-2 px-6 bg-primary text-white uppercase rounded-sm font-medium">Comentar</button>
                                </div>
                            </form>
                        </div>
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
                                <div className="text-center">No hay comentarios</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {!loading && Object.keys(project).length == 0 && (
                <div className={`grid place-content-center gap-2 ${darkMode ? 'text-dark-text' : 'text-black'} h-full`}>
                    <h3 className="text-2xl">Este proyecto no existe.</h3>
                    <button className="flex items-center justify-center gap-1 text-primary hover:text-primary-2 transition-colors" onClick={() => router.push('/admin/projects')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Volver a proyectos</span>
                    </button>
                </div>
            )}
            { showCancelMenu && 
                <Modal showModal={showCancelMenu}>
                    <div className="flex flex-col gap-1">
                        <div className={`${projectState != 'cancelled' ? 'text-red-700' : 'text-light-main'} text-xl font-semibold uppercase`}>{projectState != 'cancelled' ? 'Cancelar proyecto' : 'Recuperar proyecto'}</div>
                        <div className="text-lg">¿Estás seguro que deseas {projectState != 'cancelled' ? 'cancelar' : 'recuperar'} este proyecto?</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-red-500 hover:bg-red-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={() => setShowCancelMenu(false)}>Cancelar</button>
                        <button className="bg-light-main hover:bg-indigo-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={projectState == 'cancelled' ? handleRecoverProject : handleCancelProject}>Confirmar</button>
                    </div>
                </Modal>
            }
        </Layout>
    )
}

function ProjectComment({ comment, comments, setComments }) {
    
    const { darkMode, auth } = useContextProvider();
    
    const { _id, user, message, createdAt } = comment;

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
            await axios.post('/api/admin/projectComments/edit', { commentId: _id, message: textArea, config });
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
            await axios.post('/api/admin/projectComments/delete', { commentId: _id, config });
            const newComments = comments.filter(comment => comment._id != _id);
            setComments(newComments);
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }


    return (
        <div className={`flex flex-col px-5 py-4 rounded-md shadow-md ${darkMode ? 'bg-[#101010]' : 'bg-zinc-100'}`}>
            <div className="flex items-center justify-between">
                <div className={`${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{user.name}:</div>
                { auth._id === user._id && (
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
                        <button onClick={handleEditingComment} className="py-1 px-3 bg-red-500 hover:bg-red-800 transition-colors rounded-sm">Cancelar</button>
                        <button onClick={handleEditComment} className="py-1 px-3 bg-primary hover:bg-primary-2 transition-colors rounded-sm">Guardar</button>
                    </div>
                </div>
            ) : (
                <div className="break-words">{message}</div>
            )}
            <div className={`text-right text-sm font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{moment(createdAt).format('LLL')}</div>
            <Modal showModal={showModal}>
                <div className="flex flex-col gap-1">
                    <div className={`text-red-500 text-xl font-semibold uppercase`}>Eliminar comentario</div>
                    <div className="text-lg">¿Estás seguro que deseas eliminar este comentario?</div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-red-500 hover:bg-red-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleShowModal}>Cancelar</button>
                    <button className="bg-light-main hover:bg-indigo-900 text-white rounded-md px-4 py-2 uppercase font-semibold transition-colors" onClick={handleDeleteComment}>Confirmar</button>
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
                <div className="fixed bg-black opacity-75 top-0 left-0 w-screen h-screen z-10"></div>
                <div className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} ${closeAnim ? 'modal-close' : 'modal-open'} fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-7 shadow-md px-5 py-4 rounded-md z-10 w-[95%] xs:w-[22rem] md:w-[25rem]`}>
                    {children}
                </div>
            </>
        )
    )
}