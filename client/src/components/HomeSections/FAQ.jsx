import { useState } from "react";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion, AnimatePresence } from "framer-motion"

export default function FAQSection({ faqs }) {
    
    const { darkMode, language } = useContextProvider();

    const title = {
        "de": "Häufig gestellte Fragen",
        "en": "Frequently asked questions",
        "es": "Preguntas frequentes"
    }

    return (
        <section className={`overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 px-6 sm:px-10 lg:px-20 2xl:px-0 border-t`}>
            {<div className="max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                <div className={"flex flex-col gap-10"}>
                    <div className={`text-5xl font-bold ${darkMode ? "title-dark" : "title-light"}`}>{title[language]}</div>
                    <div className={"flex flex-col gap-1"}>
                        {faqs.element.map((e, index) => (
                            <Element key={index} element={e} />
                        ))}
                    </div>
                </div>
            </div>}
        </section>
    )
}

function Element({ element }) {
    
    const { darkMode } = useContextProvider();
    
    const [ show, setShow ] = useState(false);

    const handleShow = () => {
        setShow(current => !current);
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{
                transition: {
                    type: "tween",
                    duration: 0.15,
                    ease: "circOut",
                },
            }}
            className={`${darkMode ? "bg-[#0e0e11]" : "bg-zinc-200"} select-none rounded-md`}
        >
            <div className={"flex items-center justify-between cursor-pointer p-5"} onClick={handleShow}>
                <div>{element.question}</div>
                {show && (
                    <motion.svg
                        xmlns={"http://www.w3.org/2000/svg"}
                        fill={"none"}
                        viewBox={"0 0 24 24"}
                        strokeWidth={1.5}
                        stroke={"currentColor"}
                        className="w-6 h-6"
                        initial={{ rotate: 90, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        exit={{
                            rotate: 90,
                            opacity: 0,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circIn",
                            },
                        }}
                    >

                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </motion.svg>
                )} 
                {!show && (
                    <motion.svg
                        xmlns={"http://www.w3.org/2000/svg"}
                        fill={"none"}
                        viewBox={"0 0 24 24"}
                        strokeWidth={1.5}
                        stroke={"currentColor"}
                        className="w-6 h-6"
                        initial={{ rotate: 90, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        exit={{
                            rotate: 90,
                            opacity: 0,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circIn",
                            },
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </motion.svg>
                )}
            </div>
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        exit={{ 
                            y: 10, 
                            opacity: 0,
                            transition: {
                                type: "tween",
                                duration: 0.15,
                                ease: "circIn",
                            },
                        }}
                        className={`${darkMode ? "description-dark" : "description-light"} px-5 pb-5`}
                    >{element.answer}</motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}