import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";;
// import required modules
import { Pagination } from "swiper";

export default function ProcessSection() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <>
            <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-process">
                <div className="flex flex-col gap-20 max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <motion.div className="flex flex-col gap-5 items-center sm:items-start "
                        initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                        viewport={{ once: true }}
                    >
                        {/* <div className="blur-shadow -left-28 -top-28 -z-10"></div> */}
                        <div className="flex flex-col">
                            <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Entwicklungsprozess</span>
                        </div>
                        <div className="flex flex-col gap-10">
                            <div>
                                <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                    <div className="hidden xs:block">Wie der <span className="text-primary">Entwicklung</span></div>
                                    <div className="hidden xs:block">prozess funktioniert</div>
                                    <div className="xs:hidden">Wie der</div>
                                    <div className="xs:hidden text-primary">Entwicklung</div>
                                    <div className="xs:hidden">prozess</div>
                                    <div className="xs:hidden">funktioniert</div>
                                </h2>
                            </div>
                            <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                <p className="text-center sm:text-left">Wenn Sie für Ihr Unternehmen oder Projekt eine effektive Online-Präsenz benötigen, ist eine Website ein wesentlicher Bestandteil des Prozesses. Hier ist eine Aufschlüsselung des Webentwicklungsprozesses, damit Sie wissen, was Sie erwartet, wenn Sie mit uns zusammenarbeiten.</p>
                            </div>
                        </div>
                    </motion.div>
                    <div>
                        <Swiper
                            slidesPerView={1}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 60
                                }
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className={`process-swiper cursor-move ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                        >
                            <SwiperSlide style={{ height: 'initial' }}>
                                <div className={"flex flex-col gap-3 h-full"}>
                                    <div className="flex items-center gap-10">
                                        <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>1.</div>
                                        <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                    </div>
                                    <ProcessItem
                                        title={"Planung"}
                                        description={"Wir arbeiten mit Ihnen zusammen, um Ihre Bedürfnisse und Ziele für die Website zu verstehen. Anschließend entwerfen und entwickeln wir eine Website, die Ihren Bedürfnissen und Wünschen entspricht, einschließlich der Funktionalität, des Aussehens und des Verhaltens, die Sie wünschen."}
                                        hash={"plan"}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide style={{ height: 'initial' }}>
                                <div className={"flex flex-col gap-3 h-full"}>
                                    <div className="flex items-center gap-10">
                                        <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>2.</div>
                                        <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                    </div>
                                    <ProcessItem
                                        title={"Design und Prototyping"}
                                        description={"Sobald wir verstanden haben, was Sie brauchen, erstellen wir mit Figma oder einem ähnlichen Tool einen Prototyp Ihrer Website. Dieser Prototyp zeigt das Erscheinungsbild und Verhalten der Website. Wenn Ihnen etwas nicht gefällt oder Sie etwas ändern möchten, erledigen wir das hier, bevor wir mit dem nächsten Schritt fortfahren."}
                                        hash={"design"}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide style={{ height: 'initial' }}>
                                <div className={"flex flex-col gap-3 h-full"}>
                                    <div className="flex items-center gap-10">
                                        <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>3.</div>
                                        <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                    </div>
                                    <ProcessItem
                                        title={"Entwicklung"}
                                        description={"Nach der erfolgreichen Freigabe des Designs setzen wir die Entwicklung Ihrer Anwendung oder Website in mehreren Schritten um. Zunächst führen wir eine sorgfältige Planung und Analyse durch, um Ihre individuellen Anforderungen vollständig zu verstehen. Anschließend entwerfen wir die technische Architektur und entwickeln sowohl das Frontend als auch das Backend Ihrer Anwendung. Um sicherzustellen, dass alles reibungslos funktioniert, führen wir umfangreiche Tests in einer Produktionsumgebung durch. Sobald Ihre Anwendung in der Produktionsumgebung erfolgreich läuft, stellen wir Ihre Anwendung oder Webseite mit kostenlosem Hosting und Domain für 12 Monate bereit."}
                                        hash={"develop"}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide style={{ height: 'initial' }}>
                                <div className={"flex flex-col gap-3 h-full"}>
                                    <div className="flex items-center gap-10">
                                        <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>4.</div>
                                        <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                    </div>
                                    <ProcessItem
                                        title={"Wartung"}
                                        description={"Sobald Ihre Website online ist, arbeiten wir weiterhin mit Ihnen zusammen, um sie auf dem neuesten Stand zu halten und zu optimieren. Wir führen regelmäßig Sicherheits- und Software-Updates durch, um sicherzustellen, dass Ihre Website vor Online-Bedrohungen geschützt und benutzerfreundlich bleibt."}
                                        hash={"maintenance"}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                   <div className={"flex justify-center"}>
                        <Link className="w-fit" href={`/custom-web-entwicklung`}>
                            <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                                <div>Mehr sehen</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                   </div>
                </div>
            </section>
        </>
    )
}

function ProcessItem({ title, description }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    const text = useRef(null);
    const [ showText, setShowText ] = useState(false);
    const [ textLines, setTextLines ] = useState(0);

    useEffect(() => {
        setTextLines(countLines());
    }, [])

    function countLines() {
        let element = text.current;
        let fontSize = parseFloat(getComputedStyle(element).fontSize);
        let numberOfLines = element.scrollHeight / fontSize;
        return numberOfLines
    }

    const handleShowText = () => {
        setShowText(!showText);
    }

    return (
        <div className={"flex flex-col gap-3"}>
            <div className="text-xl">{title}</div>
            <div className={"flex flex-col"}>
                <div ref={text} className={`withClientRectsOverlay ${darkMode ? 'description-dark' : 'description-light'} ${!showText ? "text-ellipsis-4" : ""} max-w-[85vw] leading-5`}>{description}</div>
                {textLines > 6 && (
                    <div onClick={handleShowText} className={"text-primary hover:text-primary-2 transition-colors cursor-pointer"}>
                        {showText ? "Zeige weniger" : "Zeig mehr"}
                    </div>
                )}
            </div>
        </div>
    )
}