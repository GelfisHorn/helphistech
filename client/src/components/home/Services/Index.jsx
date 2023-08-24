
// React
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import ContactSimple from "@/components/Modals/ContactSimple/Index";
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
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
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
                        redirect={"/mobile-application"}
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
                                redirect={"/mobile-application"}
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
                    <ContactSimple service={service} handleClose={handleModal.close} language={"de"} />
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