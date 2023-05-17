import { useEffect } from "react"
// Nextjs
import Head from "next/head"
import { useRouter } from "next/router"
// Components
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
// Context
import useContextProvider from "@/hooks/useAppContextProvider"

/**
 * Check if user has admin permissions */ 
export default function AdminLayout({ children, title }) {
    
    const router = useRouter();

    const { auth, fetchingAuth, darkMode } = useContextProvider();

    useEffect(() => {
        if(!fetchingAuth && Object.keys(auth).length === 0) {
            router.push('/');
        }

        if(!fetchingAuth && auth.permissions === 'client') {
            router.push('/client');
        }
    }, [auth, fetchingAuth])

    return (
        (Object.keys(auth).length !== 0 && auth.permissions !== 'client') && (
            <div>
                <Head>
                    <title>{title} | Helphis Tech</title>
                </Head>
                <div className={darkMode ? 'bg-darkmode text-zinc-200' : 'bg-white text-black'}>
                    <div>
                        <Navbar />
                    </div>
                    <div className="flex overflow-hidden">
                        <div>
                            <Sidebar />
                        </div>
                        <div className="w-full py-6 px-2 sm:px-4 lg:px-8 overflow-y-scroll lazy-load-1 h-sidebar xs:h-sidebar-xs">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}