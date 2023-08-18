
import { useState } from "react";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Styles
import styles from "./Index.module.css";
// Components
import ContactModal from '@/components/Modals/Contact/Index';
// Animations
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

export default function HomeIntroduction() {

    const { darkMode } = useContextProvider();

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <section className={`${styles.backgroundImage} p-4 sm:p-7`} style={{ zIndex: "2" }}>
            <div className={`relative rounded-xl ${styles.glassmorphism}`} style={{ background: darkMode ? "rgba(22, 22, 36, .6)" : "rgba(198, 192, 218, .15)" }}>
                <div className={"flex flex-col gap-16 px-6 sm:px-10 py-10 lg:py-20 text-center"}>
                    <div className={"flex flex-col gap-8"} style={{ position: "relative", zIndex: "2" }}>
                        <div className={"flex flex-col gap-5"}>
                            <div className={"text-primary font-semibold text-lg"}>Einführung</div>
                            <h2 className={`text-3xl lg:text-5xl font-bold`}>Herzlich willkommen bei <span className={"text-primary"}>HelphisTech</span>!</h2>
                        </div>
                        <div className={"lg:text-xl"}>
                            <p>Wir sind ein leidenschaftliches Team von Entwicklern und Designern, das sich dafür einsetzt, die digitale Transformation Ihres Unternehmens voranzutreiben.</p>
                            <p>Wir bieten <Link href={"/website"} className={"text-primary underline hover:text-primary-2 transition-colors"}>Webdesign</Link>-, <Link href={"/mobile-application"} className={"text-primary underline hover:text-primary-2 transition-colors"}>App-Entwicklungs</Link>- und <Link href={"/marketingdigital"} className={"text-primary underline hover:text-primary-2 transition-colors"}>digitale Marketingdienstleistungen</Link> an, um Sie auf die nächste Stufe der technologischen Welt zu bringen.</p>
                        </div>
                        <p className={"lg:text-xl"}>Gemeinsam lassen wir Ihre digitale Vision Wirklichkeit werden! Wir freuen uns darauf, Teil Ihres Erfolgs zu sein.</p>
                    </div>
                    <div className={"flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5"}>
                        <motion.button
                            onClick={handleShowModal}
                            className={"w-full sm:w-fit px-8 py-2 sm:py-3 border-2 border-transparent bg-primary hover:bg-primary-2 transition-colors text-white rounded-full"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >Mehr Erfahren</motion.button>
                        {/* <a href={"/#home-services"} className={"w-full sm:w-fit px-8 py-2 sm:py-3 border-2 border-primary hover:bg-primary text-primary hover:text-white transition-colors rounded-full"}>Preise ansehen</a> */}
                    </div>
                </div>
                <motion.div
                    className={`${darkMode ? "opacity-50" : null} hidden lg:block absolute w-6 h-6 rounded-full top-20 left-24 bg-[#ff98d0]`}
                    style={{ zIndex: "0" }}
                ></motion.div>
                <motion.div
                    className={`${darkMode ? "opacity-50" : null} hidden lg:block absolute w-4 h-4 rounded-full top-20 right-24 bg-[#5566ff]`}
                    style={{ zIndex: "0" }}
                > </motion.div>
                <motion.div
                    className={`${darkMode ? "opacity-50" : null} hidden lg:block absolute w-4 h-4 rounded-full bottom-20 left-36 bg-[#a5d570]`}
                    style={{ zIndex: "0" }}
                ></motion.div>
                <motion.div
                    className={`${darkMode ? "opacity-50" : null} hidden lg:block absolute w-6 h-6 rounded-full bottom-20 right-36 bg-[#ffbe16]`}
                    style={{ zIndex: "0" }}
                ></motion.div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactModal blog={{ title: 'Home', url: "" }} handleClose={handleShowModal} language={'de'} />
                )}
            </AnimatePresence>
        </section>
    )
}