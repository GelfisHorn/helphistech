import axios from "axios";
// React
import { useEffect, useState } from "react";
// Components
import AdminLayout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Project from "@/components/admin/Project";
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

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
        <AdminLayout title={"Proyectos recibidos"}>
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
                <div className={`${filteredProjects.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-4'} py-3 h-full`}>
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
        </AdminLayout>
    )
}