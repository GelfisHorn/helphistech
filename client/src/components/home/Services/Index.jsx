
import axios from "axios";
// React
import { useRef, useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import VideoCallModal from "@/components/Modals/VideoCall/Index";
import Modal from "@/components/Modal/Index";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Slides
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Styles
import styles from './Index.module.css'
// Languages
import LANG from "@/lang/components/Modals/Pricing/Index";
// Notifications
import { toast } from "react-toastify";

export default function HomeServices() {

    const { darkMode } = useContextProvider();

    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    const [service, setService] = useState("");

    return (
        <section className={`relative px-6 sm:px-20 py-28 ${styles.background}`} id={"home-services"}>
            <div className={"flex flex-col items-center gap-20"}>
                <h2 className={"text-3xl lg:text-5xl font-bold text-center break-word"}>Unsere <span className={"text-primary"}>Haupt-dienstleistungen</span> umfassen</h2>
                <motion.div
                    className={"hidden xl:grid grid-cols-2 gap-5"}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .2, origin: 1 }}
                >
                    <Card
                        icon={"fa-regular fa-window"}
                        title={"Webseiten-Design und-Entwicklung"}
                        description={"Wir erstellen ansprechende und funktionale Websites, die die Identität Ihres Unternehmens hervorheben und eine außergewöhnliche Benutzererfahrung bieten."}
                        price={"390"}
                        redirect={"/website"}
                        handleModal={handleModal.show}
                        setService={() => setService("Sitio web")}
                    />
                    <Card
                        icon={"fa-regular fa-mobile"}
                        title={"Entwicklung von Web-und mobilen Apps"}
                        description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                        price={"1190"}
                        redirect={"/apps"}
                        handleModal={handleModal.show}
                        setService={() => setService("Aplicación móvil")}
                    />
                    <Card
                        icon={"fa-solid fa-chart-mixed"}
                        title={"Digitales Marketing"}
                        description={"Unsere Experten für digitales Marketing helfen Ihnen dabei, Ihre Zielgruppe zu erreichen, Ihre Online-Sichtbarkeit zu erhöhen und eine höhere Rendite Ihrer Investition zu erzielen."}
                        price={"100"}
                        redirect={"/marketingdigital"}
                        classes={"col-start-1 col-end-3 w-1/2 mx-auto"}
                        handleModal={handleModal.show}
                        setService={() => setService("Marketing digital")}
                    />
                </motion.div>
                <div className={"block xl:hidden w-full swiper-grid-3"}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 40
                            }
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className={`process-swiper cursor-move ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                    >
                        <SwiperSlide>
                            <Card
                                icon={"fa-regular fa-window"}
                                title={"Webseiten-Design und-Entwicklung"}
                                description={"Wir erstellen ansprechende und funktionale Websites, die die Identität Ihres Unternehmens hervorheben und eine außergewöhnliche Benutzererfahrung bieten."}
                                price={"390"}
                                redirect={"/website"}
                                handleModal={handleModal.show}
                                setService={() => setService("Sitio web")}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                icon={"fa-regular fa-mobile"}
                                title={"Entwicklung von Web-und mobilen Apps"}
                                description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                                price={"1190"}
                                redirect={"/apps"}
                                handleModal={handleModal.show}
                                setService={() => setService("Aplicación móvil")}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                icon={"fa-solid fa-chart-mixed"}
                                title={"Digitales Marketing"}
                                description={"Unsere Experten für digitales Marketing helfen Ihnen dabei, Ihre Zielgruppe zu erreichen, Ihre Online-Sichtbarkeit zu erhöhen und eine höhere Rendite Ihrer Investition zu erzielen."}
                                price={"100"}
                                redirect={"/marketingdigital"}
                                handleModal={handleModal.show}
                                setService={() => setService("Marketing digital")}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactModal service={service} handleClose={handleModal.close} language={"de"} />
                )}
            </AnimatePresence>
        </section>
    )
}

function Card({ setService, icon, title, description, price, redirect, classes, handleModal }) {

    const { darkMode } = useContextProvider();

    const handleOpenModal = () => {
        handleModal();
        setService();
    }

    return (
        <div className={`flex flex-col justify-between gap-8 rounded-xl p-8 shadow-md text-center ${styles.cardGlassEffect} ${classes} h-full`} style={{ background: darkMode ? "rgba(22, 22, 36, .8)" : "rgba(198, 192, 218, .1)" }}>
            <div className={"flex flex-col gap-7"}>
                <i className={`${icon} text-6xl text-primary`}></i>
                <h3 className={"text-2xl font-bold"}>{title}</h3>
                <p className={darkMode ? "text-neutral-300" : "text-neutral-800"}>{description}</p>
                <div className={"text-lg font-semibold"}>ab <span className={"text-2xl"}>{currencyFormatter(price, "EUR")}</span></div>
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5"}>
                <Link href={redirect} className={"bg-primary hover:bg-primary-2 transition-colors text-white text-center py-2 rounded-md"}>Mehr Erfahren</Link>
                <button onClick={handleOpenModal} className={"bg-primary hover:bg-primary-2 transition-colors text-white text-center py-2 rounded-md"}>Kostenlose Beratung</button>
            </div>
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
            <form className={"flex flex-col gap-5 sm:gap-10 p-5"} onSubmit={handleSubmit}>
                <div className={"flex flex-col gap-3 text-center"}>
                    <div className={"text-2xl uppercase font-semibold"}>{LANG["de"].title}</div>
                    <div>{LANG["de"].subtitle}</div>
                </div>
                <div className={"flex flex-col gap-5"}>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 items-start justify-center gap-5"}>
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