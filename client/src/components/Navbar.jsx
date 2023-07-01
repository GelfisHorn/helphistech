import { useEffect, useState } from "react";
// Next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Hooks
import useContextProvider from "../hooks/useAppContextProvider";
// Routes
import routes from '../lang/routes.json';
import { AnimatePresence } from "framer-motion";
import ContactModal from "./Modals/Contact/Index";

// Redirects routes
const REDIRECTS = {
    "hero": "/",
    "our-services": "/internetseite",
    "our-process": "/custom-web-entwicklung",
    "our-technologies": "/technologien",
    "my-project": "/contact",
}


export default function Navbar({ textColor }) {
    
    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }
    // Mobile hamburger menu
    const [ showMenu, setShowMenu ] = useState(false);
    const [ closeAnimation, setCloseAnimation ] = useState(false);
    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }
    useEffect(() => {
        showMenu ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
    }, [showMenu])
    function handleCloseAnimation() {
        setCloseAnimation(true);
        setTimeout(() => {
            setShowMenu(false);
            setCloseAnimation(false);
        }, 270)
    }

    // Get functions and variables from context
    const { darkMode, handleDarkMode, language, setLanguage } = useContextProvider();

    const router = useRouter();
    function handleChangeLanguage(e) {

        const newLanguage = e.target.value;

        const path = router.asPath;
        const route = routes.urls[language][`/${(path.split('/')[0] || path.split('/')[1])?.split('#')[0]}`];
        const redirectTo = routes.redirects[newLanguage][route];

        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        router.push(`/${redirectTo}`)

        /* if(language != 'de') {
            router.push(`/${language}`)
        } else {
            router.push(`/web-seiten`)
        } */
    }

    function handleNavButton(hash) {
        if(router.pathname === '/') {
            const element = document.getElementById(`${hash}`);
            if(element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        router.push(REDIRECTS[hash]);
    }

    function redirectToSection(hash) {
        const element = document.getElementById(`${hash}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return(
        <>
            <header className="relative flex flex-col" style={{zIndex: '1'}}>
                <div className={`flex items-center justify-between h-20 px-10 ${textColor ? `${textColor}` : `text-${darkMode ? 'dark' : 'light'}`}`}>
                    <div>
                        <Link href={"/"}>
                            <Image className="w-auto h-[3.8rem]" src={`${router.pathname == '/' ? "/logo/dark/full-256.webp" : darkMode ? '/logo/dark/full-256.webp' : '/logo/light/full-256.webp'}`} width={255} height={122} alt="HelphisTech logo" priority />
                        </Link>
                    </div>
                    <nav className="hidden xl:flex items-center gap-5 font-light text-lg">
                        <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                            <span className="hover:underline hover:text-primary transition-colors">Startseite</span>
                        </div>
                        <div className="cursor-pointer" onClick={() => handleNavButton("our-services")}>
                            <span className="hover:underline hover:text-primary transition-colors">Dienstleistungen</span>
                        </div>
                        <div className="cursor-pointer" onClick={() => handleNavButton("our-process")}>
                            <span className="hover:underline hover:text-primary transition-colors">Verfahren</span>
                        </div>
                        <div className="cursor-pointer" onClick={() => handleNavButton("our-technologies")}>
                            <span className="hover:underline hover:text-primary transition-colors">Technologien</span>
                        </div>
                        <Link href={"/contact"}>
                            <span className="hover:underline hover:text-primary transition-colors">Kontakt</span>
                        </Link>
                    </nav>
                    <div className="hidden sm:flex items-center gap-3">
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
                        {/* <div className="flex items-center gap-2">
                            <div className="text-lg">
                                <select className="cursor-pointer bg-transparent outline-none" name="" id="" value={'de'} onChange={handleChangeLanguage}>
                                    <option value="de">DE</option>
                                    <option value="en">EN</option>
                                    <option value="es">ES</option>
                                </select>
                            </div>
                        </div> */}
                        <Link className="hover:underline hover:text-primary" href="/login">
                            <span>Anmeldung</span>
                        </Link>
                        <div onClick={handleShowModal}>
                            <button className="btn-primary py-2 px-4 uppercase font-medium text-white bg-primary hover:bg-primary-2 transition-colors rounded-sm">
                                <span>Projekt starten</span>
                            </button>
                        </div>
                    </div>
                    <div onClick={handleShowMenu} className="block sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </div>
                </div>
                <nav className={`hidden sm:flex xl:hidden items-center justify-center gap-5 font-light text-lg ${darkMode ? 'font-light' : 'font-normal'} pb-5`}>
                    <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                        <span className="hover:underline hover:text-primary transition-colors">Startseite</span>
                    </div>
                    <div className="cursor-pointer" onClick={() => handleNavButton("our-services")}>
                        <span className="hover:underline hover:text-primary transition-colors">Dienstleistungen</span>
                    </div>
                    <div className="cursor-pointer" onClick={() => handleNavButton("our-process")}>
                        <span className="hover:underline hover:text-primary transition-colors">Verfahren</span>
                    </div>
                    <div className="cursor-pointer" onClick={() => handleNavButton("our-technologies")}>
                        <span className="hover:underline hover:text-primary transition-colors">Technologien</span>
                    </div>
                    <Link href={"/contact"}>
                        <span className="hover:underline hover:text-primary transition-colors">Kontakt</span>
                    </Link>
                </nav>
            </header>
            { showMenu && (
                <NavbarMobileMenu 
                    closeAnimation={closeAnimation} 
                    closeMenu={handleCloseAnimation}
                />
            )}
            <AnimatePresence>
                {showModal && (
                    <ContactModal blog={{ title: 'Home', url: "" }} handleClose={handleShowModal} language={'de'} />
                )}
            </AnimatePresence>
        </>
    )
}

function NavbarMobileMenu({ closeAnimation, closeMenu }) {

    const { darkMode, handleDarkMode, language, setLanguage } = useContextProvider();

    const router = useRouter();
    function handleChangeLanguage(e) {

        const newLanguage = e.target.value;

        const path = router.asPath;
        const route = routes.urls[language][`/${(path.split('/')[0] || path.split('/')[1])?.split('#')[0]}`];
        const redirectTo = routes.redirects[newLanguage][route];

        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        router.push(`/${redirectTo}`)

        /* if(language != 'de') {
            router.push(`/${language}`)
        } else {
            router.push(`/web-seiten`)
        } */
    }

    function handleNavButton(hash) {
        if(router.pathname === '/en') {
            const element = document.getElementById(`${hash}`);
            if(element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        router.push(REDIRECTS[hash]);
    }

    function redirectToSection(hash) {
        const element = document.getElementById(`${hash}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        closeMenu();
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-60 z-20" onClick={closeMenu}></div>
            <div className={`${closeAnimation ? 'full-screen-menu-close' : 'full-screen-menu-open'} fixed top-0 right-0 w-[85vw] h-screen ${darkMode ? 'bg-darkmode text-dark-text border-l border-neutral-900' : 'bg-white text-black'} shadow-lg transition-colors z-20`}>
                <div className={`${closeAnimation ? 'hidden' : null} h-full`}>
                    <div className="flex items-center justify-between absolute top-4 left-4 right-4">
                        <Image src={darkMode ? '/logo/dark/icon-256.webp' : '/logo/light/icon-256.webp'} width={50} height={50} alt="HelphisTech Logo" />
                        <button onClick={closeMenu} className="text-3xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col justify-between items-center gap-10 h-full mx-auto pt-24 pb-16">
                        <div className="flex flex-col items-center gap-10 w-full px-6">
                            <div className={`flex flex-col text-xl ${darkMode ? 'font-normal' : 'font-medium'} items-start gap-5 w-full`}>
                                <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                                    <span className="hover:underline hover:text-primary transition-colors">Startseite</span>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleNavButton("our-services")}>
                                    <span className="hover:underline hover:text-primary transition-colors">Dienstleistungen</span>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleNavButton("our-process")}>
                                    <span className="hover:underline hover:text-primary transition-colors">Verfahren</span>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleNavButton("our-technologies")}>
                                    <span className="hover:underline hover:text-primary transition-colors">Technologien</span>
                                </div>
                                <Link href={"/contact"}>
                                    <span className="hover:underline hover:text-primary transition-colors">Kontakt</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-6">
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
                                {/* <div className="text-xl">
                                    <select className={`cursor-pointer bg-transparent ${darkMode ? 'text-white' : 'text-black'}`} onChange={handleChangeLanguage} name="" id="" value={language}>
                                        <option value="de">DE</option>
                                        <option value="en">EN</option>
                                        <option value="es">ES</option>
                                    </select>
                                </div> */}
                            </div>
                            <Link className="hover:underline hover:text-primary" href="/login">
                                <span>Anmeldung</span>
                            </Link>
                            <div onClick={() => redirectToSection("my-project")}>
                                <button className={`btn-primary py-2 px-6 bg-primary hover:bg-primary-2 text-white transition-colors`}>Projekt starten</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}