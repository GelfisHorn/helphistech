
// React
import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import VideoCallModal from "@/components/Modals/VideoCall/Index";
import ContactModal from "@/components/Modals/Contact/Index";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { AnimatePresence } from "framer-motion";
// Slides
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Styles
import styles from './Index.module.css'

export default function HomeServices() {

    const { darkMode } = useContextProvider();

    return (
        <div className={`relative px-6 sm:px-20 py-20`} style={{zIndex: "2"}}>
            <div className={"flex flex-col items-center gap-20"}>
                <h2 className={"text-3xl lg:text-4xl font-semibold text-center break-word"}>Unsere Haupt-dienstleistungen umfassen</h2>
                <div className={"hidden xl:grid grid-cols-2 gap-5 "}>
                    <Card 
                        icon={"fa-regular fa-window"} 
                        title={"Webseiten-Design und-Entwicklung"}
                        description={"Wir erstellen ansprechende und funktionale Websites, die die Identität Ihres Unternehmens hervorheben und eine außergewöhnliche Benutzererfahrung bieten."}
                        price={"390"}
                        redirect={"/website"}    
                    />
                    <Card
                        icon={"fa-regular fa-mobile"}
                        title={"Entwicklung von Web-und mobilen Apps"}
                        description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                        price={"1190"}
                        redirect={"/apps"}
                    />
                    <Card
                        icon={"fa-solid fa-chart-mixed"}
                        title={"Digitales Marketing"}
                        description={"Unsere Experten für digitales Marketing helfen Ihnen dabei, Ihre Zielgruppe zu erreichen, Ihre Online-Sichtbarkeit zu erhöhen und eine höhere Rendite Ihrer Investition zu erzielen."}
                        price={"100"}
                        redirect={"/marketingdigital"}
                        classes={"col-start-1 col-end-3 w-1/2 mx-auto"}
                    />
                </div>
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
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                icon={"fa-regular fa-mobile"}
                                title={"Entwicklung von Web-und mobilen Apps"}
                                description={"Wir entwickeln maßgeschneiderte Anwendungen, die es Ihren Kunden ermöglichen, schnell und bequem von jedem Gerät aus mit Ihnen zu interagieren."}
                                price={"1190"}
                                redirect={"/apps"}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                icon={"fa-solid fa-chart-mixed"}
                                title={"Digitales Marketing"}
                                description={"Unsere Experten für digitales Marketing helfen Ihnen dabei, Ihre Zielgruppe zu erreichen, Ihre Online-Sichtbarkeit zu erhöhen und eine höhere Rendite Ihrer Investition zu erzielen."}
                                price={"100"}
                                redirect={"/marketingdigital"}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

function Card({ icon, title, description, price, redirect, classes }) {

    const { darkMode } = useContextProvider();

    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => setShowModal(!showModal);

    return (
        <div className={`flex flex-col justify-between gap-8 rounded-xl p-8 shadow-md text-center ${styles.cardGlassEffect} ${classes} h-full`} style={{ background: darkMode ? "rgba(22, 22, 36, .8)" : "rgba(198, 192, 218, .1)"}}>
            <div className={"flex flex-col gap-7"}>
                <i className={`${icon} text-6xl text-primary`}></i>
                <h3 className={"text-2xl font-medium"}>{title}</h3>
                <p className={darkMode ? "text-neutral-300" : "text-neutral-800"}>{description}</p>
                <div className={"text-lg font-semibold"}>ab <span className={"text-2xl"}>{currencyFormatter(price, "EUR")}</span></div>
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5"}>
                <Link href={redirect} className={"bg-primary hover:bg-primary-2 transition-colors text-white text-center py-2 rounded-md"}>Mehr Erfahren</Link>
                <button onClick={handleShowModal} className={"bg-primary hover:bg-primary-2 transition-colors text-white text-center py-2 rounded-md"}>Kostenlose Beratung</button>
            </div>
            <AnimatePresence>
                {showModal && (
                    <VideoCallModal closeVideoCallForm={handleShowModal} language={"de"} />
                )}
            </AnimatePresence>
        </div>
    )
}