
import axios from "axios";
// React
import { useRef, useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import Modal from "@/components/Modal/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Styles
import styles from "./Index.module.css";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Languages
import LANG from "@/lang/components/Modals/Pricing/Index";
// Notifications
import { toast } from "react-toastify";

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
                    <ContactModal service={"Desarrollo de aplicaciones móviles"} handleClose={handleModal.close} language={'de'} />
                )}
            </AnimatePresence>
        </div>
    )
}

function ContactModal({ service, handleClose }) {

    const { darkMode } = useContextProvider();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const legalTerms = useRef("")

    async function handleSubmit(e) {
        e.preventDefault();
        const formIsValid = validateForm();
        if (!formIsValid.success) {
            return toast.error(formIsValid.msg);
        }

        Promise.all([
            axios.post('/api/services/sendMail/helphistech', { service, name, email, phoneNumber, description }),
            axios.post('/api/services/sendMail/client', { name, email, lang: "de" })
        ]).then(res => {
            toast.success(LANG["de"].notifications.success);
        }).catch(err => {
            toast.error(LANG["de"].notifications.error.catch);
        });

        resetForm();
    }

    function validateForm() {
        if ([name, email, phoneNumber, description].includes("")) {
            return { success: false, msg: LANG["de"].notifications.error.fields };
        }
        if (!legalTerms.current.checked) {
            return { success: false, msg: LANG["de"].notifications.error.legal };
        }
        return { success: true, msg: "" };
    }

    function resetForm() {
        setName("");
        setEmail("")
        setPhoneNumber("");
        setDescription("");
    }

    return (
        <Modal handleClose={handleClose}>
            <form className={"flex flex-col gap-3 sm:gap-10 p-5 relative"} onSubmit={handleSubmit}>
                <div className={"flex flex-col gap-1 text-center"}>
                    <div onClick={handleClose} className={"absolute top-1 right-2 text-2xl cursor-pointer"}><i className="fa-regular fa-xmark"></i></div>
                    <div className={"text-2xl uppercase font-semibold"}>{LANG["de"].title}</div>
                    <div>{LANG["de"].subtitle}</div>
                </div>
                <div className={"flex flex-col gap-3"}>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 items-start justify-center gap-3"}>
                        <div className={"flex flex-col items-start gap-1"}>
                            <label htmlFor={`step4-name`}>{LANG["de"].labels.name}</label>
                            <input value={name} onChange={e => setName(e.target.value)} id={`step4-name`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="text" placeholder={LANG["de"].labels.name} />
                        </div>
                        <div className={"flex flex-col items-start gap-1"}>
                            <label htmlFor={`step4-email`}>{LANG["de"].labels.email}</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} id={`step4-email`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="email" placeholder={LANG["de"].labels.email} />
                        </div>
                        <div className={"flex flex-col items-start gap-1"}>
                            <label htmlFor={`step4-phone`}>{LANG["de"].labels.phoneNumber}</label>
                            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} id={`step4-phone`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="number" placeholder={LANG["de"].labels.phoneNumber} />
                        </div>
                        <div className={"flex flex-col items-start gap-1"}>
                            <label htmlFor={`step4-message`}>{LANG["de"].labels.description}</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} id={`step4-message`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full resize-none`} rows={5} type="text" placeholder={LANG["de"].labels.description} />
                        </div>
                    </div>
                    <div className={"flex gap-2 select-none"}>
                        <div className={"flex items-start gap-2"}>
                            <div className="form-control">
                                <input ref={legalTerms} id={"legal"} type="checkbox" className="accent-primary w-5 h-5" />
                            </div>
                            <label className={"w-fit text-left"} htmlFor={"legal"}>{LANG["de"].legal.text1} {<Link className={"link"} target={"_blank"} href={LANG["de"].legal.link1.href}>{LANG["de"].legal.link1.text}</Link>} {LANG["de"].legal.text2} {<Link className={"link"} target={"_blank"} href={LANG["de"].legal.link2.href}>{LANG["de"].legal.link2.text}</Link>}</label>
                        </div>
                    </div>
                </div>
                <button className={`${styles.button} w-full`} type={"submit"}>
                    <span>{LANG["de"].submit}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </form>
        </Modal>
    )
}