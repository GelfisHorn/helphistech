// Nextjs
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider"

export default function Navbar() {
    
    const { auth, setAuth, darkMode } = useContextProvider();

    // On click account button -> show/hide account menu
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setAuth({});
    }

    return (
        <div className={`w-full h-14 px-10 border-b ${darkMode ? 'border-neutral-900' : 'border-neutral-100'}`}>
            <div className="flex items-center justify-between h-full">
                <div className="text-light-main uppercase font-semibold text-lg">
                    <Image src={darkMode ? '/logo/dark/full-logo.webp' : '/logo/light/full-logo.webp'} width={150} height={36.8} alt="HelphisTech Logo" />
                </div>
                <button className="flex items-center bg-primary hover:bg-primary-2 text-white py-2 px-4 rounded-sm transition-colors" onClick={handleLogout}>Cerrar sesión</button>
                <div className="block sm:hidden text-2xl"><i className="fa-regular fa-bars"></i></div>
            </div>
        </div>
    )
}