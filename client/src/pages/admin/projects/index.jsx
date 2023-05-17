import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/admin/AdminLayout";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Date and Hour Formatter
import moment from "moment";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Projects() {
    
    const { darkMode } = useContextProvider();

    // Projects data
    const [ projects, setProjects ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    // On component load fetch projects
    useEffect(() => {
        getProjects();
    }, [])

    // Fetch projects
    async function getProjects() {
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
            const { data } = await axios.post(`/api/admin/getProjects`, { config });
            const sortedByDate = data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setProjects(sortedByDate);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const [ projectsFilter, setProjectFilter ] = useState('all');
    const [ filteredProjects, setFilteredProjects ] = useState([]);

    useEffect(() => {
        const filteredProjects = projects.filter(project => project.state != 'cancelled');
        setFilteredProjects(filteredProjects);
    }, [projects])

    function handleFilterProjects(filter) {
        let filteredProjects;
        if(filter == 'all') {
            filteredProjects = projects.filter(project => project.state != 'cancelled');
        } else {
            filteredProjects = projects.filter(project => project.state == filter);
        }
        setFilteredProjects(filteredProjects);
    }

    return (
        <Layout title={"Proyectos recibidos"}>
            <div className={`${darkMode ? 'text-dark-text' : 'text-black'} flex flex-col h-full`}>
                <div className={`flex items-center justify-between sm:text-lg pb-3 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-200'}`}>
                    <div className="uppercase font-semibold">Filtros</div>
                    <div className="">
                        <select className={`${darkMode ? 'bg-neutral-900 text-dark-text' : 'bg-white text-black'} outline-none shadow-md py-2 sm:px-2 rounded-sm`} name="" id="" defaultValue={projectsFilter} onChange={(e) => handleFilterProjects(e.target.value)}>
                            <option value="all">Todos</option>
                            <option value="onhold">En espera</option>
                            <option value="inprogress">En desarrollo</option>
                            <option value="completed">Completado</option>
                        </select>
                    </div>
                </div>
                <div className={`${filteredProjects.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-1'} py-3 h-full`}>
                    {loading && (
                        <LoadingSpinner />
                    )}
                    {!loading && filteredProjects.length !== 0 && filteredProjects.map((project, i) => (
                        <Project key={i} project={project} />
                    ))}
                    {!loading && filteredProjects.length === 0 && (
                        <div className="grid place-content-center text-center">
                            <span className="text-xl uppercase font-semibold">No hay proyectos aún.</span>
                            <span className="text-light-description">Prueba usando diferentes filtros.</span>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

function Project({ project }) {

    const { darkMode } = useContextProvider();

    const router = useRouter();

    const language = router.pathname.split('/')[1];

    const redirectToProject = (id) => {
        router.push(`/admin/project/${id}`)
    }

    const { _id, website_type, description, state, createdAt } = project;

    return (
        <div className={`gap-5 px-5 py-4 shadow-md rounded-sm ${darkMode ? 'bg-[#101010]' : 'bg-white'}`}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:gap-2 text-xl">
                    <div className="font-bold uppercase">Tipo de software</div>
                    <div className="hidden sm:block">-</div>
                    <div className={`font-semibold text-primary-2`}>{website_type == 'website' ? 'Sitio web' : website_type == 'ecommerce' ? 'E-Commerce' : website_type == 'app' && 'Aplicación'}</div>    
                </div>
                <div className="flex flex-col">
                    <div className="font-bold uppercase">Descripción</div>
                    <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} text-ellipsis-5`}>{description}</div>    
                </div>
                {/* <div className="flex flex-col">
                    <div className="font-bold uppercase">Presupuesto</div>
                    <div className="flex items-center gap-1">
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Entre</div>
                        <div className="font-semibold">{currencyFormatter(budget.from)}</div>    
                        <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>y</div>
                        <div className="font-semibold">{currencyFormatter(budget.to)}</div>    
                    </div>    
                </div> */}
                <div className="font-semibold text-sm">{moment(createdAt).format('LLL')}</div>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`${state == 'onhold' ? 'bg-yellow-500' : state == 'inprogress' ? 'bg-orange-500' : state == 'completed' ? 'bg-primary' : 'bg-red-500'} px-2 py-1 rounded-sm text-white uppercase w-fit font-semibold select-none`}>{state == 'onhold' ? 'En espera' : state == 'inprogress' ? 'En desarrollo' : state == 'completed' ? 'Completado' : 'Cancelado'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-start w-full">
                            <button onClick={() => redirectToProject(_id)} className="bg-primary hover:bg-transparent text-white py-1 px-4 rounded-sm uppercase font-semibold border-2 border-transparent hover:border-primary hover:text-primary transition-colors whitespace-nowrap w-full sm:w-fit">Ver más</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}