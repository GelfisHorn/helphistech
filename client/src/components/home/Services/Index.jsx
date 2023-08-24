
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

const services = {
    0: {
        es: "Sitio web"
    },
    1: {
        es: "Aplicación móvil"
    },
    2: {
        es: "Marketing digital"
    }
}

export default function HomeServices() {

    const { darkMode } = useContextProvider();

    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    const [service, setService] = useState(1);

    return (
        <section className={`relative py-28 ${darkMode ? "bg-[#0d0d16]" : "bg-[#f7f6f9]"}`} id={"home-services"}>
            <div className={"flex flex-col items-center gap-20"}>
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20"}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Dienstleistungen</div>
                        <motion.h2
                            className={"text-3xl sm:text-5xl font-bold"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >Unsere <span className={"text-primary"}>Haupt-dienstleistungen</span> umfassen</motion.h2>
                    </div>
                    <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Von Web- und Mobilentwicklung bis hin zu digitalen Marketingstrategien – wir sind hier, um Ihre Visionen in der Online-Welt in die Realität umzusetzen. Steigern Sie Ihre digitale Präsenz mit unseren umfassenden Lösungen und erreichen Sie Ihr Publikum effektiv.</p>
                </div>
                <div className={`flex justify-center ${styles.backgroundImage} w-full px-6 sm:px-10`}>
                    <motion.div
                        className={`hidden xl:grid grid-cols-3 max-w-5xl gap-3`}
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
                            service={{ get: service, set: () => setService(0) }}
                            featured={false}
                        />
                        <Card
                            icon={"fa-regular fa-mobile"}
                            title={"Entwicklung von Web-und mobilen Apps"}
                            description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                            price={"1190"}
                            redirect={"/mobile-application"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(1) }}
                            featured={true}
                        />
                        <Card
                            icon={"fa-solid fa-chart-mixed"}
                            title={"Digitales Marketing"}
                            description={"Unsere Experten für digitales Marketing helfen Ihnen dabei, Ihre Zielgruppe zu erreichen, Ihre Online-Sichtbarkeit zu erhöhen und eine höhere Rendite Ihrer Investition zu erzielen."}
                            price={"100"}
                            redirect={"/marketingdigital"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(2) }}
                            featured={false}
                        />
                    </motion.div>
                    <div className={"block xl:hidden w-full swiper-grid-3"}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            breakpoints={{
                                900: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                }
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            initialSlide={1}
                            modules={[Pagination]}
                            onSlideChange={e => setService(e.activeIndex)}
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
                                    service={{ get: service, set: () => setService(0) }}
                                    featured={false}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card
                                    icon={"fa-regular fa-mobile"}
                                    title={"Entwicklung von Web-und mobilen Apps"}
                                    description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                                    price={"1190"}
                                    redirect={"/mobile-application"}
                                    handleModal={handleModal.show}
                                    service={{ get: service, set: () => setService(1) }}
                                    featured={true}
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
                                    service={{ get: service, set: () => setService(2) }}
                                    featured={false}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactModal service={services[service].es} handleClose={handleModal.close} language={"de"} />
                )}
            </AnimatePresence>
        </section>
    )
}

function Card({ index, service, icon, title, description, price, redirect, handleModal, featured }) {

    const { darkMode } = useContextProvider();

    const handleOpenModal = () => {
        handleModal();
        service.set();
    }

    return (
        <div onClick={() => service.set()} className={`${styles.card} flex flex-col justify-between gap-8 rounded-xl p-8 ${featured ? "border-2 border-primary bg-[#866bfe3b]" : `border-2 border-[#866bfe0c] bg-[#866bfe0c]`} ${styles.cardGlassEffect} h-full transition-colors`}>
            <div className={"flex flex-col gap-7 text-center"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"text-2xl font-medium"}>{title}</div>
                    <p className={service.get == index ? "text-zinc-100" : darkMode ? "description-dark" : "description-light"}>{description}</p>
                </div>
            </div>
            <div className={"flex flex-col items-center gap-5"}>
                <div className={`flex flex-col text-lg text-center`}><span className={`ab-span ${service.get == index ? "text-zinc-200" : darkMode ? "description-dark" : "description-light"}`}>ab</span> <span className={"text-3xl font-semibold"}>{currencyFormatter(price, "EUR")}</span></div>
                <div className={"flex flex-col items-center gap-6"}>
                    <button onClick={handleOpenModal} className={`border-2 border-primary text-white bg-primary hover:bg-primary-2 hover:border-primary-2 transition-colors font-medium text-center py-[.35rem] px-5 rounded-full`}>Kostenlose Beratung</button>
                    <Link href={redirect} className={"flex items-center gap-2 text-primary hover:text-primary-2 transition-colors"}>
                        <span className={`underline`}>Mehr Erfahren</span>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

/* function Card({ setService, icon, title, description, price, redirect, classes, handleModal }) {

    const { darkMode } = useContextProvider();

    const handleOpenModal = () => {
        handleModal();
        setService();
    }

    return (
        <div className={`flex flex-col justify-between gap-8 rounded-xl p-8 shadow-md text-center ${styles.cardGlassEffect} ${classes} h-full`}>
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
} */

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