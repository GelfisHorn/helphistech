
// React
import { useState } from "react";
// Components
import ContactSimple from "@/components/Modals/ContactSimple/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Styles
import styles from "./Index.module.css";
// Animations
import { motion, AnimatePresence } from "framer-motion";

export default function AppsQuote() {

    const { darkMode } = useContextProvider();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    return (
        <div className={`${styles.backgroundImage} p-5 overflow-hidden`}>
            <div className={`flex flex-col items-center gap-16 border-2 ${darkMode ? "border-[#866bfe1f] bg-[#866bfe1f]" : "border-[#866bfe44] bg-[#866bfe44]"} py-14 rounded-2xl relative`} style={{ zIndex: 1 }}>
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Ihre Vision, Ihr Preis</div>
                        <motion.h2
                            className={"overflow-hidden text-3xl sm:text-5xl font-bold"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >Holen Sie sich jetzt ein <span className={"text-primary"}>individuelles Angebot!</span></motion.h2>
                    </div>
                    <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Betreten Sie eine Welt, in der Ihre Ideen Gestalt annehmen. Unser Bereich „Benutzerdefinierte Angebote“ gibt Ihnen die Freiheit, ohne Einschränkungen zu erstellen. Es gibt keine festen Preise, sondern nur ein Bekenntnis zu Ihrer Vision. Klicken Sie auf die Schaltfläche „Kontakt“ und finden Sie heraus, wie wir Ihre Träume von einer mobilen App zu einem für Sie passenden Budget wahr werden lassen können.</p>
                </div>
                <motion.button
                    onClick={handleModal.show}
                    className={"overflow-hidden flex items-center gap-4 bg-primary hover:bg-primary-2 text-white transition-colors px-4 md:px-8 py-2 md:py-3 text-base sm:text-lg w-fit rounded-full"}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .2, origin: 1 }}
                >
                    <div>Kostenlose Beratung buchen</div>
                    <i className="fa-light fa-arrow-up-right"></i>
                </motion.button>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactSimple service={"Desarrollo de aplicaciones móviles"} handleClose={handleModal.close} language={'de'} />
                )}
            </AnimatePresence>
        </div>
    )
}