// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Image from "next/image";

export default function Sidebar() {
    
    const { auth, darkMode } = useContextProvider();

    return (
        <div className={`flex flex-col justify-between w-[3.5rem] lg:w-[17rem] border-r ${darkMode ? 'border-neutral-900' : 'border-neutral-100'} h-sidebar xs:h-sidebar-xs`}>
            <div className="flex flex-col gap-3 lg:px-5 py-5 overflow-y-scroll hide-scroll" style={{height: 'calc(100vh - 6rem)'}}>
                <div className={`flex justify-center lg:justify-start items-center gap-3 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-300'} pb-4`}>
                    <div>
                        {auth.profile_img ? (
                            <div className={"image-container"} style={{ width: '2.25rem' }}>
                                <Image className={"image rounded-full"} src={auth.profile_img} fill />
                            </div>
                        ) : (
                            <div className={`grid place-content-center h-9 w-9 lg:h-10 lg:w-10 rounded-full ${darkMode ? 'bg-neutral-700' : 'bg-neutral-300'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${darkMode ? '#BFBFBF' : '#fff'}`} className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className={`text-xs uppercase font-semibold ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{auth.position}</span>
                        <span className="text-sm font-medium">{`${auth.name} ${auth.surname}`}</span>
                    </div>
                </div>
                <SidebarSection title={"Panel de control"} permissions={["superadmin", "admin"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        }
                        href={`/admin`}
                    >Inicio</SidebarItem>
                    <SidebarItem
                        permissions={["superadmin", "admin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                        </svg>}
                        href={`http://13.48.143.111:1337/admin`}
                        hrefTargetBlank={true}
                    >CMS</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Proyectos"} permissions={["superadmin", "admin", "developer"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin", "developer"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                        </svg>
                        }
                        href={`/admin/projects`}
                    >Recibido</SidebarItem>
                    <SidebarItem 
                        permissions={["superadmin", "admin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                        }
                        href={`/admin/projects/developing`}
                    >En desarrollo</SidebarItem>
                    <SidebarItem 
                        permissions={["superadmin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        }
                        href={`/admin/projects/cancelled`}
                    >Cancelado</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Videollamadas"} permissions={["superadmin", "admin"]}>
                    <SidebarItem 
                        permissions={["superadmin", "admin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        }
                        href={`/admin/videocalls`}
                    >Recibido</SidebarItem>
                    <SidebarItem 
                        permissions={["superadmin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
                        </svg>                      
                        }
                        href={`/admin/videocalls/cancelled`}
                    >Cancelado</SidebarItem>
                </SidebarSection>
                <SidebarSection title={"Usuarios"} permissions={["superadmin"]}>
                    <SidebarItem 
                        permissions={["superadmin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        }
                        href={`/admin/accounts`}
                    >Cuentas</SidebarItem>
                    <SidebarItem 
                        permissions={["superadmin"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                        }
                        href={`/admin/accounts/create`}
                    >Crear cuenta</SidebarItem>
                </SidebarSection>
            </div>

            <div className={`border-t ${darkMode ? 'border-neutral-900' : 'border-neutral-200'} lg:px-5 py-5`}>
                <div className="flex flex-col gap-1">
                    <SidebarItem
                        permissions={["superadmin", "admin", "developer"]}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        }
                        href={"/myaccount"}
                    >Mi cuenta</SidebarItem>
                </div>
            </div>

        </div>
    )
}

function SidebarSection({ children, title, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <div className={`${permissions.indexOf(auth.permissions) != -1 ? 'flex' : 'hidden'} flex flex-col gap-2`}>
            <div className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'} hidden lg:block uppercase font-semibold text-sm`}>{title}</div>
            <div className="flex flex-col gap-1">{children}</div>
        </div>
    )
}

function SidebarItem({ children, icon, href, hrefTargetBlank, permissions }) {
    
    const { darkMode, auth } = useContextProvider();

    return (
        <Link href={href} target={hrefTargetBlank ? "_blank" : ""} className={`${permissions.indexOf(auth.permissions) != -1 ? 'flex' : 'hidden'} flex justify-center`}>
            <button className={`${darkMode ? 'text-dark-text' : 'text-black'} hover:bg-primary flex items-center justify-center lg:justify-start gap-2 lg:rounded-md py-2 lg:px-4 w-full hover:text-white uppercase font-semibold text-left transition-colors select-none`}>
                <div className="text-neutral-400">{icon}</div>
                <div className="hidden lg:block">{children}</div>
            </button>
        </Link>
    )
}