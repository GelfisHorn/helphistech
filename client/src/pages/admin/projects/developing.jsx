import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
// Components
import AdminLayout from "@/components/admin/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Project from "@/components/admin/Project";
import SuperAdminPermissions from "@/components/admin/SuperAdminPermissions";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function DevelopingProjects() {
    
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
            const projects = data.filter(project => project.state === 'inprogress');
            setProjects(projects);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SuperAdminPermissions>
            <AdminLayout title={'Proyectos en desarrollo'}>
                <div className={`${darkMode ? 'text-dark-text' : 'text-black'} h-full lazy-load-1`}>
                    <div className={`${projects.length === 0 ? 'grid place-content-center' : 'flex flex-col gap-4'} py-3 h-full`}>
                        {loading && (
                            <LoadingSpinner />
                        )}
                        {!loading && projects.length !== 0 && projects.map((project, i) => (
                            <Project key={i} project={project} />
                        ))}
                        {!loading && projects.length === 0 && (
                            <div className="grid place-content-center text-center">
                                <span className="text-xl uppercase font-semibold">No hay proyectos en desarrollo aún.</span>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </SuperAdminPermissions>
    )
}