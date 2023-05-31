import { useEffect } from "react";
// Nextjs
import Head from "next/head"
import { useRouter } from "next/router"
// Components
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"

export default function ClientLayout({ children, title }) {
    
    const router = useRouter();

    const { darkMode, auth, fetchingAuth } = useContextProvider();

    useEffect(() => {
        if(!fetchingAuth && Object.keys(auth).length === 0) {
            router.push('/');
            return;
        }
    }, [auth, fetchingAuth])

    return (
        Object.keys(auth).length !== 0 && (
            <>
                <Head>
                    <title>{`${title} - HelphisTech`}</title>
                </Head>
                <div className={darkMode ? 'bg-darkmode text-zinc-200' : 'bg-white text-black'}>
                    <div>
                        <Navbar />
                    </div>
                    <div className="flex overflow-hidden">
                        <div>
                            <Sidebar />
                        </div>
                        <div className={`${darkMode ? 'blog-bg-dark' : 'blog-bg-light'} w-full py-6 px-4 lg:px-8 overflow-y-scroll lazy-load-1`} style={{height: 'calc(100vh - 3.5rem)'}}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    )
}