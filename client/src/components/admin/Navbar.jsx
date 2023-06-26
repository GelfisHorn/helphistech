// Nextjs
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"
import Link from "next/link";

export default function Navbar() {
    
    const { auth, setAuth, darkMode, handleDarkMode } = useContextProvider();

    // On click account button -> show/hide account menu
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setAuth({});
    }

    return (
        <div className={`w-full h-28 xs:h-14 px-3 sm:px-10 border-b ${darkMode ? 'border-neutral-900 text-dark' : 'border-neutral-100 text-light'}`}>
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-0 items-center justify-center xs:justify-between h-full">
                <Link href={"/admin"}>
                    <div className="text-light-main uppercase font-semibold text-lg">
                        <Image src={`${darkMode ? '/logo/dark/full-256.webp' : '/logo/light/full-256.webp'}`} width={84.7} height={40.7} alt="HelphisTech Logo" />
                    </div>
                </Link>
                <div className="flex items-center gap-5">
                    <div onClick={handleDarkMode} className={`text-2xl cursor-pointer transition-colors`}>
                        { darkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                    </div>
                    <button className="flex items-center bg-primary hover:bg-primary-2 text-white py-2 px-4 rounded-sm transition-colors" onClick={handleLogout}>Cerrar sesión</button>
                </div>
                {/* <div className="block sm:hidden text-2xl"><i className="fa-regular fa-bars"></i></div> */}
            </div>
        </div>
    )
}