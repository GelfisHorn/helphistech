
// React
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import ContactSimple from "@/components/Modals/ContactSimple/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Styles
import styles from "./Index.module.css";
// Animations
import { motion, AnimatePresence } from "framer-motion";

export default function MDIntroduction() {

    const { darkMode } = useContextProvider();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    return (
        <section className={`${styles.sectionBg} overflow-hidden`}>
            <div className={`${styles.cardGlassEffect} p-4 sm:p-7 m-5 rounded-xl border-2 ${darkMode ? "border-[#202035c7]" : "border-[#c6c0da6b]"}`} style={{ background: darkMode ? "rgba(22, 22, 36, .8)" : "rgba(198, 192, 218, .3)", zIndex: "2" }}>
                <div className={`relative rounded-xl`}>
                    <div className={"flex flex-col items-center gap-14 px-6 sm:px-10 py-10 lg:pt-12 pb-12 text-center"}>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"uppercase font-semibold text-primary"}>Online-Erfolgsstrategien</div>
                            <div className={"flex flex-col items-center gap-8"} style={{ position: "relative", zIndex: "2" }}>
                                <div className={"lg:text-xl"}>
                                    <p>Um in diesem digitalen Zeitalter erfolgreich zu sein, ist eine solide Online-Präsenz unerlässlich. Dafür benötigen Sie eine gut gestaltete <Link className={"text-primary hover:text-primary-2 transition-colors underline"} href={"/website"}>Website</Link> und strategisches Online-Marketing. Sie ermöglichen es Ihnen nicht nur, ein breiteres Publikum zu erreichen, sondern auch eine starke Marke aufzubauen und neue Kunden zu gewinnen.</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className={"flex flex-col items-center gap-8"}>
                            <motion.button
                                onClick={handleModal.show}
                                className={"bg-primary hover:bg-primary-2 transition-colors text-white rounded-full py-2 sm:py-3 px-6 sm:px-8 w-fit text-lg sm:text-xl"}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: .2, origin: 1 }}
                            >Kontakt uns</motion.button>
                            <div className={`flex flex-col items-center gap-3 text-primary text-lg`}>
                                <span>Entdecken Sie unsere Leistungen</span>
                                <i className={`fa-regular fa-arrow-down-long ${styles.animationScrollDown}`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactSimple service={"Online Marketing"} handleClose={handleModal.close} language={"de"} />
                )}
            </AnimatePresence>
        </section>
    )
}
