// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";;
// import required modules
import { Pagination } from "swiper";
// Animations
import { motion } from "framer-motion";

const TECHNOLOGIES = {
    de: {
        react: "React ist eine Open-Source-Javascript-Bibliothek zur Erstellung von Benutzeroberflächen mit dem Ziel, die Entwicklung von Einzelseitenanwendungen zu erleichtern.",
        next: "Nächste. js ist ein React-Framework, das eine Vielzahl von Funktionen und Vorteilen bietet, die es ideal für die Erstellung moderner und skalierbarer Webanwendungen machen.",
        tailwind: "Tailwind CSS ist ein Open-Source-CSS-Framework für das Webseitendesign.",
        node: "Node.js ist eine plattformübergreifende Open-Source-Laufzeitumgebung für die Serverschicht, die auf der Programmiersprache JavaScript basiert.",
        mongo: "MongoDB ist ein dokumentenorientiertes Open-Source-NoSQL-Datenbanksystem.",
        mysql: "MySQL ist ein relationales Datenbankverwaltungssystem.",
        swift: "Swift ist eine universelle Programmiersprache, die auf einem modernen Ansatz für Sicherheit, Leistung und Software-Designmuster basiert.",
        kotlin: "Kotlin ließ sich von vielen Programmiersprachen inspirieren, darunter (aber nicht beschränkt auf) Java, Scala, C# und Groovy.",
        flutter: "Flutter verändert den App-Entwicklungsprozess. Erstellen, testen und implementieren Sie wunderschöne Mobil-, Web-, Desktop- und eingebettete Apps aus einer einzigen Codebasis.",
        reactNative: "React Native kombiniert die besten Teile der nativen Entwicklung mit React, einer erstklassigen JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen.",
        showMore: "Mehr sehen"
    }
}

export default function TechnologiesSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`flex flex-col gap-28 relative overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 px-6 sm:px-10 lg:px-20 2xl:px-0 border-t`} id="our-technologies">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto flex flex-col gap-20 overflow-hidden">
                <motion.div 
                    className="flex flex-col items-center gap-10 relative"
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center gap-5">
                        <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Technologien</span>
                        <h2 className={`text-center text-3xl sm:text-5xl font-bold w-full xl:w-2/3`}>Dies sind die <span className="text-primary">Technologien</span> die wir am häufigsten verwenden</h2>
                    </div>
                    <div className={`2xl:text-lg ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                        <p className="text-center">Die passende Technologie bereichert das Projekt. Hier sind einige von denen, die wir am häufigsten verwenden:</p>
                    </div>
                </motion.div>
            </div>
            <motion.div
                className={"technologies-swiper select-none w-full px-0 2xl:px-20"}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: .2, origin: 1 }}
            >
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 3.5,
                            spaceBetween: 20
                        },
                        1536: {
                            slidesPerView: 4.5,
                            spaceBetween: 20
                        }
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className={`process-swiper ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                >
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#61dafb14] w-full p-7 rounded-3xl border-2 border-transparent hover:border-[#61dafb] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={"/technologies/react.webp"} className={"image"} fill alt={"React image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.react}</div>
                            <Link target={"_blank"} href={"https://react.dev"} className={"flex items-center gap-2 w-fit text-[#61dafb] hover:text-[#61dafbc4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between ${darkMode ? "bg-[#ffffff14] hover:border-[#ffffff]" : "bg-[#00000014] hover:border-[#000000]"} w-full p-7 rounded-3xl border-2 border-transparent transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/nextjs.webp" : "/technologies/nextjs.webp"} className={"image"} fill alt={"Nextjs image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.next}</div>
                            <Link target={"_blank"} href={"https://nextjs.org"} className={`flex items-center gap-2 w-fit ${darkMode ? "text-[#ffffff] hover:text-[#ffffffc4]" : "text-[#000000] hover:text-[#000000c4]"} transition-colors`}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#38bdf814] w-full p-7 rounded-3xl border-2 border-transparent hover:border-[#38bdf8] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/tailwind.webp" : "/technologies/tailwind.webp"} className={"image"} fill alt={"Tailwind image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.tailwind}</div>
                            <Link target={"_blank"} href={"https://tailwindcss.com"} className={"flex items-center gap-2 w-fit text-[#38bdf8] hover:text-[#38bdf8c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#7ad25314] w-full p-7 rounded-3xl border-2 border-transparent hover:border-[#7ad253] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/nodejs.webp" : "/technologies/nodejs.webp"} className={"image"} fill alt={"Nodejs image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.node}</div>
                            <Link target={"_blank"} href={"https://nodejs.org"} className={"flex items-center gap-2 w-fit text-[#7ad253] hover:text-[#7ad253c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#11934f14] w-full p-7 rounded-3xl border-2 border-transparent hover:border-[#11934f] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={"/technologies/mongodb.webp"} className={"image"} fill alt={"MongoDB image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.mongo}</div>
                            <Link target={"_blank"} href={"https://www.mongodb.com"} className={"flex items-center gap-2 w-fit text-[#11934f] hover:text-[#11934fc4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#00618914] w-full p-7 rounded-3xl border-2 border-transparent hover:border-[#006189] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={"/technologies/mysql.webp"} className={"image"} fill alt={"MySQL image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.mysql}</div>
                            <Link target={"_blank"} href={"https://www.mysql.com"} className={"flex items-center gap-2 w-fit text-[#006189] hover:text-[#006189c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#e84e3614] p-7 rounded-3xl border-2 border-transparent hover:border-[#e84e36] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/swift.webp" : "/technologies/swift.webp"} className={"image"} fill alt={"Swift image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.swift}</div>
                            <Link target={"_blank"} href={"https://www.swift.org"} className={"flex items-center gap-2 w-fit text-[#e84e36] hover:text-[#e84e36c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#d42fa914] p-7 rounded-3xl border-2 border-transparent hover:border-[#d42fa9] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/kotlin.webp" : "/technologies/kotlin.webp"} className={"image"} fill alt={"Kotlin image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.kotlin}</div>
                            <Link target={"_blank"} href={"https://kotlinlang.org"} className={"flex items-center gap-2 w-fit text-[#d42fa9] hover:text-[#d42fa9c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#01549614] p-7 rounded-3xl border-2 border-transparent hover:border-[#015496] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={darkMode ? "/technologies/darkmode/flutter.webp" : "/technologies/flutter.webp"} className={"image"} fill alt={"Flutter image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.flutter}</div>
                            <Link target={"_blank"} href={"https://flutter.dev"} className={"flex items-center gap-2 w-fit text-[#015496] hover:text-[#015496c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={`flex flex-col gap-5 h-full justify-between bg-[#03a6d114] p-7 rounded-3xl border-2 border-transparent hover:border-[#03a6d1] transition-colors`}>
                            <div className={"w-2/3"}>
                                <div className={"image-container"}>
                                    <Image src={"/technologies/react-native.webp?v=2"} className={"image"} fill alt={"React Native image"} />
                                </div>
                            </div>
                            <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.reactNative}</div>
                            <Link target={"_blank"} href={"https://reactnative.dev"} className={"flex items-center gap-2 w-fit text-[#03a6d1] hover:text-[#03a6d1c4] transition-colors"}>
                                <span>{TECHNOLOGIES.de.showMore}</span>
                                <i className="fa-regular fa-arrow-right-long"></i>
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </motion.div>
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                {/* <div className="blur-shadow -top-6 -left-6"></div> */}
            </div>
        </section>
    )
}