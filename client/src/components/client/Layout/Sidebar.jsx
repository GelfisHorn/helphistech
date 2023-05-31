import axios from "axios";
import { useEffect } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import axiosHeaders from "@/hooks/axiosHeaders";
// Languages
import lang from '../../../lang/client/sidebar.json';

export default function ClientSidebar() {
    
    const { auth, darkMode, clientProject, setClientProject, language } = useContextProvider();

    const router = useRouter();

    useEffect(() => {
        if((Object.keys(auth).length !== 0 && auth.permissions === "client") && Object.keys(clientProject).length === 0) {
            getProject();
        }
    }, [auth, clientProject])

    async function getProject() {
        const config = axiosHeaders();
        if(!config) return;

        try {
            const { data } = await axios.post(`/api/client/getProject`, { config, clientId: auth._id });
            setClientProject(data);
        } catch (err) {
            const error = new Error(err);
            console.error(error.message)
        }
    }

    // On click account button -> show/hide account menu
    const handleAccountMenu = () => {
        // ...
    }

    return (
        <div className={`flex flex-col justify-between gap-10 w-[3.5rem] lg:w-[17rem] border-r ${darkMode ? 'border-neutral-900' : 'border-neutral-100'}`} style={{height: 'calc(100vh - 3.5rem)'}}>
            <div className="flex flex-col gap-3 pt-5">
                <div className={`flex justify-center lg:justify-start items-center gap-3 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-300'} pb-4 px-5`}>
                    <div>
                        <div className={`grid place-content-center h-9 w-9 lg:h-10 lg:w-10 rounded-full ${darkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${darkMode ? '#BFBFBF' : '#fff'}`} className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className={`text-xs uppercase font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{auth.position}</span>
                        <span className="text-sm font-medium">{`${auth.name} ${auth.surname}`}</span>
                    </div>
                </div>
                <SidebarSection title={"Admin"} permissions={["superadmin", "admin"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        }
                        href={`/admin`}
                    >Inicio</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Proyectos"} permissions={["developer"]}>
                    <SidebarItem 
                        permissions={["developer"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        }
                        href={`/admin/projects`}
                    >Recibidos</SidebarItem>
                </SidebarSection>
                <SidebarSection title={lang[language].home.title} permissions={["client"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin", "client"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        }
                        href={`/client`}
                    >{lang[language].home.home}</SidebarItem>
                </SidebarSection>
                <SidebarSection title={lang[language].project.title} permissions={["client"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin", "client"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>
                        }
                        href={`${!clientProject?.project?.client?._id ? '/client' : `/client/project/${clientProject?.project?.client?._id}`}`}
                    >{lang[language].project["my-project"]}</SidebarItem>
                    <SidebarItem 
                        permissions={["superadmin", "admin", "client"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        }
                        href={`${!clientProject?.project?._id ? '/client' : `/client/process/${clientProject?.project?._id}`}`}
                    >{lang[language].project.process}</SidebarItem>
                </SidebarSection>
            </div>
            <div className={`border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} lg:px-5 pb-5 pt-5`}>
                <div className="flex flex-col gap-1">
                    <SidebarItem
                        permissions={["superadmin", "admin", "client", "developer"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        }
                        href={"/myaccount"}
                    >{lang[language].account}</SidebarItem>
                </div>
            </div>

        </div>
    )
}

function SidebarSection({ children, title, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <div className={`${permissions.indexOf(auth.permissions) != -1 ? 'flex' : 'hidden'} flex flex-col gap-2 px-5`}>
            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} hidden lg:block uppercase font-semibold text-sm`}>{title}</div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function SidebarItem({ children, icon, href, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <Link href={href} className={`${permissions.indexOf(auth.permissions) != -1 ? 'flex' : 'hidden'} flex justify-center`}>
            <button className={`${darkMode ? 'text-dark-text' : 'text-black'} hover:bg-primary flex items-center justify-center lg:justify-start gap-2 lg:rounded-md py-2 lg:px-4 w-full hover:text-white uppercase font-semibold text-left transition-colors select-none`}>
                <div className="text-neutral-400">{icon}</div>
                <div className="hidden lg:block">{children}</div>
            </button>
        </Link>
    )
}