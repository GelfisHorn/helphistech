import { useState } from "react";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion, AnimatePresence } from "framer-motion"

const lang = {
    de: {
        headTitle: "FAQ",
        title: "Häufig gestellte Fragen",
        description: "Hier finden Sie Antworten auf die häufigsten Fragen zu unserem Entwicklungsprozess für mobile Apps, Preisen, Technologien und mehr."
    },
    en: {
        headTitle: "FAQ",
        title: "Frequently asked questions",
        description: "Here you will find answers to the most common questions about our mobile app development process, pricing, technologies, and more."
    },
    es: {
        headTitle: "FAQ",
        title: "Preguntas frequentes",
        description: "Aquí encontrarás respuestas a las preguntas más comunes sobre nuestro proceso de desarrollo de aplicaciones móviles, precios, tecnologías y más."
    }
}

export default function AppsFAQ({ faqs }) {

    const { darkMode, language } = useContextProvider();

    return (
        <section className={`flex flex-col gap-20 overflow-hidden ${darkMode ? 'bg-[#101010] border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 px-6 sm:px-10 lg:px-20 2xl:px-0 border-t`} id={"faq"}>
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                <div className={"flex flex-col gap-20"}>
                    <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                        <div className={"flex flex-col gap-5"}>
                            <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>{lang[language].headTitle}</div>
                            <motion.h2
                                className={"text-3xl sm:text-5xl font-bold text-primary"}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: .2, origin: 1 }}
                            >{lang[language].title}</motion.h2>
                        </div>
                        <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>{lang[language].description}</p>
                    </div>
                    <motion.div
                        className={"flex flex-col gap-1"}
                        initial={{ opacity: 0, x: 150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >
                        {faqs.map((e, index) => (
                            <Element key={index} element={e} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function Element({ element }) {

    const { darkMode } = useContextProvider();

    const [show, setShow] = useState(false);

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
            className={`${darkMode ? "bg-neutral-900 hover:bg-neutral-800" : "bg-zinc-200 hover:bg-zinc-300"} transition-colors rounded-md`}
        >
            <div className={"flex items-center justify-between gap-3 cursor-pointer p-5"} onClick={handleShow}>
                <div className={"font-medium select-none"}>{element.title}</div>
                <div className={"w-6 h-6"}>
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
                    >{element.description}</motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}