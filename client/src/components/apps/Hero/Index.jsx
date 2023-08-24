
// React
import { useState } from "react";
// Nextjs
import Image from 'next/image';
// Components
import ContactSimple from "@/components/Modals/ContactSimple/Index";
// Styles
import styles from "./Index.module.css";
// Animations
import { motion, AnimatePresence } from "framer-motion";

export default function AppsHero() {

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    return (
        <section className={`${styles.backgroundImage} overflow-hidden`}>
            <div className={"flex items-center gap-20 h-full place-content-center px-6 sm:px-20"} style={{ position: "relative", zIndex: "2" }}>
                <div className={"flex flex-col gap-14 justify-center items-center lg:items-start h-full text-center lg:text-left"}>
                    <div className={"flex flex-col gap-3"}>
                        <h1 className={"text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] font-black uppercase break-word"}><span className={"text-primary"}>Meisterhafte Entwicklung</span> für außergewöhnliche <span className={"text-primary"}>mobile Erlebnisse</span></h1>
                        <p className={"font-light md:text-lg"}>Wir verwandeln deine Ideen in erstaunliche und fesselnde mobile Apps und bringen deine Vision direkt an die Fingerspitzen.</p>
                    </div>
                    <motion.button
                        onClick={handleModal.show}
                        className={"flex items-center gap-4 bg-primary hover:bg-primary-2 text-white transition-colors px-4 md:px-8 py-2 md:py-3 text-base sm:text-lg w-fit rounded-full"}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >
                        <div>Kostenlose Beratung buchen</div>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </motion.button>
                </div>
                <motion.div
                    className={"hidden xl:block image-container min-w-[30rem]"}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, origin: 1 }}
                >
                    <Image src={"/apps/side-image.webp?v=1"} className={"image"} fill alt={"Side image"} />
                </motion.div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactSimple service={"Desarrollo de aplicaciones móviles"} handleClose={handleModal.close} language={'de'} />
                )}
            </AnimatePresence>
        </section>
    )
}