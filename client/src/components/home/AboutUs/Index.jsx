
// Hooks
import useContextProvider from '@/hooks/useAppContextProvider'
// Styles
import styles from './Index.module.css'
// Slides
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// Animations
import { motion } from 'framer-motion';

export default function HomeAboutUs() { 

    const { darkMode } = useContextProvider();

    return (
        // <section className={`py-20 px-20 ${styles.background}`} style={{ backgroundImage: darkMode ? "url(home/waves-variant.svg)" : "url(home/waves-light.svg)" }}>
        <section className={`py-32 px-6 sm:px-20 ${styles.background}`} style={{ backgroundImage: darkMode ? "url(home/hero/wave/dark/wave.webp)" : "url(home/hero/wave/light/wave.webp)" }}>
            <div className={"flex flex-col gap-28"}>
                <div className={"flex flex-col gap-4 text-center"}>
                    <h2 className={"font-bold text-3xl sm:text-5xl"}>Über Uns</h2>
                    <p className={"text-base sm:text-lg"}><span className={"font-semibold text-primary"}>HelphisTech</span> ist ein innovatives Technologie-Startup mit der Mission, Unternehmen und Geschäften bei ihrer Digitalisierung zu unterstützen. Dazu verfügen wir über <span className={"font-semibold text-primary"}>vier</span> Teams von erstklassigen Fachleuten auf ihren jeweiligen Gebieten, um einen qualitativ hochwertigen Service zu bieten.</p>
                </div>
                <div className={"hidden xl:grid grid-cols-3"}>
                    <LeftRow
                        title={"UX/UI-Designer"}
                        description={"Talentierte Designer nutzen ihre Kreativität und Erfahrung, um hochmoderne Designs zu erstellen, die auf allen Geräten optimal funktionieren."}
                        name={"Sheila Waldow"}
                        position={"Head of Design-Team"}
                        contact={"design@helphistech.com"}
                    />
                    <RightRow
                        title={"Full Stack-Entwickler"}
                        description={"Unser Team von Full Stack-Entwicklern ist erfahren in der Erstellung effizienter und umfassender technologischer Lösungen."}
                        name={"Gelfis Horn"}
                        position={"Head of Software Development-Team"}
                        contact={"development@helphistech.com"}
                    />
                    <LeftRow
                        title={"Digital-Marketing-Spezialisten"}
                        description={"Die Experten im Bereich digitales Marketing arbeiten daran, Ihre Marke zu positionieren und Ihre Online-Präsenz zu optimieren."}
                        name={"Henrry Feliz"}
                        position={"Head of Digital Marketing-Team"}
                        contact={"marketing@helphistech.com"}
                    />
                    <RightRow
                        title={"Vertriebsmanagement"}
                        description={"Unsere Vertriebsmitarbeiter setzen sich für exzellenten Kundenservice ein und pflegen effektive Geschäftsbeziehungen."}
                        name={"Christian Moresi"}
                        position={"Head of Kundenservice-Team"}
                        contact={"info@helphistech.com"}
                    />
                </div>
                <div className={`block xl:hidden swiper-grid-4`}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            }
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className={`process-swiper cursor-move ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                    >
                        <SwiperSlide>
                            <SlideRow
                                title={"UX/UI-Designer"}
                                description={"Talentierte Designer nutzen ihre Kreativität und Erfahrung, um hochmoderne Designs zu erstellen, die auf allen Geräten optimal funktionieren."}
                                name={"Sheila Waldow"}
                                position={"Head of Design-Team"}
                                contact={"design@helphistech.com"}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideRow
                                title={"Full Stack-Entwickler"}
                                description={"Unser Team von Full Stack-Entwicklern ist erfahren in der Erstellung effizienter und umfassender technologischer Lösungen."}
                                name={"Gelfis Horn"}
                                position={"Head of Software Development-Team"}
                                contact={"development@helphistech.com"}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideRow
                                title={"Digital-Marketing-Spezialisten"}
                                description={"Die Experten im Bereich digitales Marketing arbeiten daran, Ihre Marke zu positionieren und Ihre Online-Präsenz zu optimieren."}
                                name={"Henrry Feliz"}
                                position={"Head of Digital Marketing-Team"}
                                contact={"marketing@helphistech.com"}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SlideRow
                                title={"Vertriebsmanagement"}
                                description={"Unsere Vertriebsmitarbeiter setzen sich für exzellenten Kundenservice ein und pflegen effektive Geschäftsbeziehungen."}
                                name={"Christian Moresi"}
                                position={"Head of Kundenservice-Team"}
                                contact={"info@helphistech.com"}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>  
    )
}

function LeftRow({ title, description, name, position, contact }) {

    const { darkMode } = useContextProvider();
    
    return (
        <>
            <motion.div 
                className={`flex flex-col gap-8 ${styles.cardGlassEffect} px-4 sm:px-8 py-6 sm:py-8 rounded-xl`}
                initial={{ opacity: 0, x: -150 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <div className={"flex flex-col gap-2"}>
                    <h3 className={"text-xl font-semibold text-primary"}>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className={"flex items-center gap-4"}>
                    <div className={`grid place-content-center min-w-[4rem] h-16 rounded-full ${darkMode ? "bg-neutral-800" : styles.userGlassEffect}`}>
                        <i className={"fa-regular fa-user text-3xl text-neutral-600"}></i>
                    </div>
                    <div>
                        <div className={"font-semibold"}>{name}</div>
                        <div className={"text-sm"}>{position}</div>
                        <div className={"text-sm font-semibold"}><a className={"underline text-primary hover:text-primary-2 transition-colors"} href={`mailto:${contact}`}>{contact}</a></div>
                    </div>
                </div>
            </motion.div>
            <div className={"relative"}>
                <div className={`w-[2px] h-full ${darkMode ? "bg-neutral-800" : "bg-neutral-400"} mx-auto`}>
                </div>
                <div className={"absolute w-5 h-5 bg-primary top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full"}></div>
                <div className={`absolute ${styles.rowHorizontalLineWidth} h-[2px] ${darkMode ? "bg-neutral-800" : "bg-neutral-400"} top-1/2 -translate-y-1/2 left-0`}></div>
            </div>
            <div></div>
        </>
    )
}

function RightRow({ title, description, name, position, contact }) {

    const { darkMode } = useContextProvider();
    
    return (
        <>
            <div></div>
            <div className={"relative"}>
                <div className={`w-[2px] h-full ${darkMode ? "bg-neutral-800" : "bg-neutral-400"} mx-auto`}>
                </div>
                <div className={"absolute w-5 h-5 bg-primary top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full"}></div>
                <div className={`absolute ${styles.rowHorizontalLineWidth} h-[2px] ${darkMode ? "bg-neutral-800" : "bg-neutral-400"} top-1/2 -translate-y-1/2 right-0`}></div>
            </div>
            <motion.div 
                className={`flex flex-col items-end gap-8 ${styles.cardGlassEffect} px-4 sm:px-8 py-6 sm:py-8 rounded-xl`}
                initial={{ opacity: 0, x: 150 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <div className={"flex flex-col gap-2 text-right"}>
                    <h3 className={"text-xl font-semibold text-primary"}>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className={"flex items-center gap-4"}>
                    <div className={"text-right"}>
                        <div className={"font-semibold"}>{name}</div>
                        <div className={"text-sm"}>{position}</div>
                        <div className={"text-sm font-semibold"}><a className={"underline text-primary hover:text-primary-2 transition-colors"} href={`mailto:${contact}`} target={"_blank"}>{contact}</a></div>
                    </div>
                    <div className={`grid place-content-center min-w-[4rem] h-16 rounded-full ${darkMode ? "bg-neutral-800" : styles.userGlassEffect}`}>
                        <i className={"fa-regular fa-user text-3xl text-neutral-600"}></i>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

function SlideRow({ title, description, name, position, contact }) {

    const { darkMode } = useContextProvider();
    
    return (
        <div className={`flex flex-col gap-8 ${styles.cardGlassEffect} px-4 sm:px-8 py-6 sm:py-8 rounded-xl h-full`}>
            <div className={"flex flex-col gap-2 text-center"}>
                <h3 className={"text-xl font-semibold text-primary"}>{title}</h3>
                <p>{description}</p>
            </div>
            <div className={"flex flex-col items-center text-center gap-4"}>
                <div className={`grid place-content-center min-w-[4rem] w-16 h-16 rounded-full ${darkMode ? "bg-neutral-800" : styles.userGlassEffect}`}>
                    <i className={"fa-regular fa-user text-3xl text-neutral-600"}></i>
                </div>
                <div>
                    <div className={"font-semibold"}>{name}</div>
                    <div className={"text-sm"}>{position}</div>
                    <div className={"text-sm font-semibold"}><a className={"underline text-primary hover:text-primary-2 transition-colors"} href={`mailto:${contact}`}>{contact}</a></div>
                </div>
            </div>
        </div>
    )
}