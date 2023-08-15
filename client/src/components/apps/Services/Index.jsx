
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion } from "framer-motion";
// Styles
import styles from './Index.module.css'

export function AppsServices() {

    const { darkMode } = useContextProvider();

    return (
        <section className={`${darkMode ? "bg-[#101010] border-[#242424]" : "section-bg-light border-[#e0e0e0]"} py-20 border-t`}>
            <div className={"flex flex-col items-center gap-20"}>
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Dienstleistungen</div>
                        <motion.h2
                            className={"text-3xl sm:text-5xl font-bold"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >Unsere <span className={"text-primary"}>Entwicklungs-leistungen</span></motion.h2>
                    </div>
                    <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Wir verwandeln deine Ideen in maßgeschneiderte, funktionale mobile Anwendungen, die einzigartige Erlebnisse für deine Nutzer schaffen.</p>
                </div>
                <div className={`flex justify-center ${styles.backgroundImage} w-full`}>
                    <motion.div
                        className={`grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-fit gap-5 px-6 sm:px-10 lg:px-20`}
                        initial={{ opacity: 0, x: 150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className={`flex flex-col items-center text-center gap-4 2xl:w-96 border-2 bg-transparent ${darkMode ? "border-[#2e2e2e2d]" : "border-[#e0e0e07a]"} ${styles.glassmorphism} px-6 py-10 rounded-2xl`}>
                            <div className={`w-[4.5rem] h-[4.5rem] ${darkMode ? "bg-[#866bfe73]" : "bg-[#866bfea4]"} rounded-xl p-2`}>
                                <div className={"image-container h-[4.5rem]"}>
                                    <Image src={"/apps/services/native.webp?v=1"} className={"image opacity-75"} fill alt={"Custom development"} />
                                </div>
                            </div>
                            <div className={"text-2xl font-semibold"}>Native App Development</div>
                            <p>We are working on Native applications specifically for a particular operating system Android & iOS.</p>
                        </div>
                        <div className={`flex flex-col items-center text-center gap-4 2xl:w-96 border-2 bg-transparent ${darkMode ? "border-[#2e2e2e2d]" : "border-[#e0e0e07a]"} ${styles.glassmorphism} px-6 py-10 rounded-2xl`}>
                            <div className={`w-[4.5rem] h-[4.5rem] ${darkMode ? "bg-[#866bfe73]" : "bg-[#866bfea4]"} rounded-xl p-2`}>
                                <div className={"image-container h-[4.5rem]"}>
                                    <Image src={"/apps/services/hybrid.webp?v=1"} className={"image opacity-75"} fill alt={"Custom development"} />
                                </div>
                            </div>
                            <div className={"text-2xl font-semibold"}>Hybrid App Development</div>
                            <p>We know what we have to serve our clients. Hybrid applications are run on both devices.</p>
                        </div>
                        <div className={`flex flex-col items-center lg:col-start-1 2xl:col-start-auto 2xl:col-end-auto lg:col-end-3 w-full 2xl:w-96 text-center gap-4 border-2 bg-transparent ${darkMode ? "border-[#2e2e2e2d]" : "border-[#e0e0e07a]"} ${styles.glassmorphism} px-6 py-10 rounded-2xl`}>
                            <div className={`w-[4.5rem] h-[4.5rem] ${darkMode ? "bg-[#866bfe73]" : "bg-[#866bfea4]"} rounded-xl p-2`}>
                                <div className={"image-container h-[4.5rem]"}>
                                    <Image src={"/apps/services/custom.webp?v=1"} className={"image opacity-75"} fill alt={"Custom development"} />
                                </div>
                            </div>
                            <div className={"text-2xl font-semibold"}>Custom App Development</div>
                            <p>We have a team who works on your custom projects to offer your customers what you want in your design way.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}