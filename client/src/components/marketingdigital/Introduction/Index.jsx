
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
                                <p className={"lg:text-xl"}>Es gibt eine Vielzahl von Strategien im digitalen Marketing, aber einige, die in der Regel die besten Ergebnisse liefern, sind:</p>
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
                    <ContactModal service={"Digital Marketing"} handleClose={handleModal.close} language={"de"} />
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