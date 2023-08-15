
import axios from "axios";
// React
import { useRef, useState } from "react";
// Nextjs
import Image from 'next/image';
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
                    <ContactModal service={"Desarrollo de aplicaciones móviles"} handleClose={handleModal.close} language={'de'} />
                )}
            </AnimatePresence>
        </section>
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
        ]).then(() => {
            toast.success(LANG["de"].notifications.success);
        }).catch(() => {
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