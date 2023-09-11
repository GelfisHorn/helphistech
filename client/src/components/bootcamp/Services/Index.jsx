
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

export default function BootcampServices({ lang }) {

    const { darkMode } = useContextProvider();

    const [ showModal, setShowModal ] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    const [ service, setService ] = useState(1);

    return (
        <section className={`relative py-28 ${darkMode ? "bg-[#0d0d16]" : "bg-[#f7f6f9]"}`} id={"home-services"}>
            <div className={"flex flex-col items-center gap-20"}>
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20"}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Nuestros cursos</div>
                        <motion.h2
                            className={"text-3xl sm:text-5xl font-bold"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >Nuestros <span className={"text-primary"}>principales cursos</span> incluyen</motion.h2>
                    </div>
                    <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Descubre nuestros cursos de desarrollo web, diseñados para convertirte en un experto en desarrollo web. Aprende Front-end, Back-end y Full-stack en un solo lugar y prepárate para tu futuro en la industria tecnológica.</p>
                </div>
                <div className={`flex justify-center ${styles.backgroundImage} w-full px-6 sm:px-10`}>
                    <motion.div
                        className={`hidden 2xl:grid grid-cols-4 gap-3`}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >
                        <Card
                            title={"Desarrollo web básico"}
                            content={["Introducción a la programación", "HTML", "CSS", "JavaScript"]}
                            duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                            price={"500"}
                            redirect={"/website"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(0) }}
                            featured={false}
                        />
                        <Card
                            title={"Desarrollo web Medio"}
                            content={["JavaScript avanzado", "MySQL", "Node + Express", "React"]}
                            duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                            price={"500"}
                            redirect={"/mobile-application"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(1) }}
                            featured={false}
                        />
                        <Card
                            title={"Desarrollo web Avanzado"}
                            content={["React avanzado", "MongoDB", "Node.js avanzado", "Next.js", "TailwindCSS"]}
                            duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                            price={"500"}
                            redirect={"/marketingdigital"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(2) }}
                            featured={false}
                        />
                        <Card
                            title={"Bootcamp Completo"}
                            content={["Todas las tecnologías"]}
                            duration={"Duración: 3 meses clases en vivo + 2 semanas después de cada mes para proyecto."}
                            price={"1250"}
                            discount={"250"}
                            redirect={"/marketingdigital"}
                            handleModal={handleModal.show}
                            service={{ get: service, set: () => setService(2) }}
                            featured={true}
                        />
                    </motion.div>
                    <div className={"block 2xl:hidden w-full swiper-grid-4"}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            initialSlide={2}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                1024: {
                                    slidesPerView: 2.5,
                                    spaceBetween: 10
                                },
                                1280: {
                                    slidesPerView: 3,
                                    spaceBetween: 10
                                }
                            }}
                            className={`process-swiper cursor-move ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                        >
                            <SwiperSlide>
                                <Card
                                    title={"Desarrollo web básico"}
                                    content={["Introducción a la programación", "HTML", "CSS", "JavaScript"]}
                                    duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                                    price={"500"}
                                    redirect={"/website"}
                                    handleModal={handleModal.show}
                                    service={{ get: service, set: () => setService(0) }}
                                    featured={false}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card
                                    title={"Desarrollo web Medio"}
                                    content={["JavaScript avanzado", "MySQL", "Node + Express", "React"]}
                                    duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                                    price={"500"}
                                    redirect={"/mobile-application"}
                                    handleModal={handleModal.show}
                                    service={{ get: service, set: () => setService(1) }}
                                    featured={false}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card
                                    title={"Desarrollo web Avanzado"}
                                    content={["React avanzado", "MongoDB", "Node.js avanzado", "Next.js", "TailwindCSS"]}
                                    duration={"Duración: 1 mes clases en vivo + 2 semanas de proyecto"}
                                    price={"500"}
                                    redirect={"/marketingdigital"}
                                    handleModal={handleModal.show}
                                    service={{ get: service, set: () => setService(2) }}
                                    featured={false}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card
                                    title={"Bootcamp Completo"}
                                    content={["Todas las tecnologías"]}
                                    duration={"Duración: 3 meses clases en vivo + 2 semanas después de cada mes para proyecto."}
                                    price={"1250"}
                                    discount={"250"}
                                    redirect={"/marketingdigital"}
                                    handleModal={handleModal.show}
                                    service={{ get: service, set: () => setService(2) }}
                                    featured={true}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
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

function Card({ index, service, title, duration, price, discount, redirect, handleModal, featured, content }) {

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
                </div>
            </div>
            <div className={"pl-6 sm:pl-0"}>
                <ul className={"flex flex-col gap-1 text-left sm:text-center"}>{content.map((c, i) => (
                    <div className={"flex items-center justify-start sm:justify-center gap-3"}>
                        <i className="fa-solid fa-check text-primary"></i>
                        <li key={i} className={"text-lg w-fit text-left"}>{c}</li>
                    </div>
                ))}</ul>
            </div>
            <div className={"flex flex-col items-center gap-5"}>
                <div className={"text-center"}>{duration}</div>
                <div className={`flex flex-col text-lg text-center`}>
                    {/* <span className={`ab-span ${service.get == index ? "text-zinc-200" : darkMode ? "description-dark" : "description-light"}`}>ab</span>  */}
                    {discount ? (
                        <div className={"flex flex-col"}>
                            <span className={"text-xl text-red-500 line-through"}>{currencyFormatter(price, "EUR")}</span>
                            <span className={"text-3xl font-semibold"}>{currencyFormatter(discount, "EUR")}</span>
                        </div>
                    ) : (
                        <span className={"text-3xl font-semibold"}>{currencyFormatter(price, "EUR")}</span>
                    )}
                </div>
                <div className={"flex flex-col items-center gap-6"}>
                    <button onClick={handleOpenModal} className={`border-2 border-primary text-white bg-primary hover:bg-primary-2 hover:border-primary-2 transition-colors font-medium text-center py-[.35rem] px-5 rounded-full`}>Asesoramiento gratuito</button>
                    {/* <Link href={redirect} className={"flex items-center gap-2 text-primary hover:text-primary-2 transition-colors"}>
                        <span className={`underline`}>Mehr Erfahren</span>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}