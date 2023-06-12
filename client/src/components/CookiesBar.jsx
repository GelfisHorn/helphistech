import { useEffect, useState } from "react";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
// Language
import lang from '../lang/cookies/bar/index.json'

export default function CookiesBar() {

    const { 
        showCookiesWindow, 
        handleShowCookiesWindow, 
        cookiesAllowed, 
        handleAllowCookies, 
        language, 
        darkMode 
    } = useContextProvider();

    const handleAllow = () => {
        handleShowCookiesWindow();
        handleAllowCookies();
    }

    const handleDecline = () => {
        localStorage.setItem('allow-cookies', false);
        handleShowCookiesWindow();
    }

    return (
        showCookiesWindow && !cookiesAllowed && (
            <AnimatePresence>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    transition={{ duration: .3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className={`fixed bottom-0 left-0 w-full h-fit px-6 md:px-12 py-6 ${darkMode ? "bg-[#090909] text-zinc-200" : "bg-neutral-300 text-neutral-900"} z-20`}
                >
                    <div className={"flex flex-col md:flex-row items-center gap-5"}>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-lg"}>{lang[language].title}</div>
                            <p className={`text-sm ${darkMode ? "description-dark" : "description-light"}`}>{lang[language].description}</p>
                        </div>
                        <div className={"flex flex-col gap-2 w-full md:w-fit"}>
                            <button className={"md:whitespace-nowrap py-1 px-3 text-zinc-200 bg-primary hover:bg-primary-2 transition-colors rounded-sm"} onClick={handleAllow}>{lang[language].allow}</button>
                            <button className={`md:whitespace-nowrap py-1 px-3 text-neutral-900 ${darkMode ? "bg-neutral-800 hover:bg-neutral-900" : "bg-neutral-400 hover:bg-neutral-500"} transition-colors rounded-sm`} onClick={handleDecline}>{lang[language].decline}</button>
                        </div>
                    </div>
                    <button className={"absolute top-2 right-2 hover:text-primary transition-colors"} onClick={handleShowCookiesWindow}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </motion.div>
            </AnimatePresence>
        )
    )
}