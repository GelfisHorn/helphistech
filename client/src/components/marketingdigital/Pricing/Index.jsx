
import { useEffect, useState } from "react";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Styles
import styles from './Index.module.css'
// Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import ContactSimple from "@/components/Modals/ContactSimple/Index";

const PRICING = {
    "01": {
        name: "Marketinginhalte",
        price: 100
    },
    "02": {
        name: "Suchmaschinenoptimierung",
        price: 200
    },
    "03": {
        name: "Social-Media-Marketing",
        price: 300
    },
    "04": {
        name: "Online-Werbung",
        price: 200
    },
    "05": {
        name: "Premium Digital Marketing",
        price: 390
    },
}

export default function MDPricing() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    const [plan, setPlan] = useState("");

    return (
        <section className={`${styles.backgroundImage} relative overflow-hidden ${darkMode ? 'bg-[#101010]' : 'section-bg-light'} flex items-center pb-20`} id="our-technologies">
            <div className="w-full relative">
                <div className={"flex flex-col gap-20"}>
                    <div className={"xl:max-w-7xl 2xl:max-w-[90rem] mx-auto"}>
                        <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                            <div className={"flex flex-col gap-5"}>
                                {/* <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Encuentra el plan perfecto para llevar tu proyecto al siguiente nivel</div> */}
                                <h2 className={"text-3xl sm:text-5xl font-bold"}>Die <span className={"text-primary"}>besten aktuellen</span> Marketingstrategien im <span className={"text-primary"}>digitalen Bereich</span></h2>
                            </div>
                            <p className={`${darkMode ? "description-dark" : "description-light"}`}>Wähle unser Premium-Paket und sichere deinen digitalen Erfolg</p>
                        </div>
                    </div>
                    <div className={"flex justify-center w-full pb-2"}>
                        <div className={`hidden xl:flex flex-col items-center gap-10 w-full`}>
                            <motion.div
                                className={"grid grid-cols-2 gap-5 w-[50rem]"}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: .2, origin: 1 }}
                            >
                                {/* <Card
                                    icon={"fa-regular fa-window"}
                                    title={"Marketinginhalte"}
                                    description={"Erstellen und Teilen relevanter und wertvoller Inhalte wie Blogs, Videos, Infografiken usw., um die Zielgruppe anzuziehen und zu begeistern."}
                                    price={PRICING["01"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Blogs" }, { name: "Nachrichtenseite" }]}
                                    plan={{ get: PRICING["01"].name, set: setPlan }}
                                /> */}
                                <Card
                                    icon={"fa-regular fa-mobile"}
                                    title={"SEO-Optimierung (SEO)"}
                                    description={"Unser Hauptziel ist es, den hochwertigsten organischen Traffic auf Ihrer Website zu lenken."}
                                    price={PRICING["02"].price}
                                    handleModal={handleModal.show}
                                    benefits={[
                                        { name: "Keyword-Recherche", description: "Wir identifizieren hochwirksame Keywords, die relevant für Ihre Branche und Nische sind, um sicherzustellen, dass Ihr Inhalt für das, was für Ihr Unternehmen am wichtigsten ist, gut gerankt wird." }, 
                                        { name: "On-Page-Optimierung", description: "Wir feinabstimmen die Struktur Ihrer Website, Meta-Tags und Inhalte, um sie suchmaschinenfreundlich und benutzerzentriert zu gestalten." }, 
                                        { name: "Content-Strategie", description: "Unser Team wird Ihren bestehenden Inhalt erstellen oder optimieren, um Ihre Zielgruppe anzusprechen und die Autorität Ihrer Marke zu stärken." },
                                        { name: "Lokales SEO", description: "Wir optimieren Ihre Online-Präsenz für lokale Suchanfragen und stellen sicher, dass potenzielle Kunden Ihr Unternehmen leicht finden können." },
                                        { name: "Technisches SEO", description: "Wir kümmern uns um technische Probleme, die die Leistung Ihrer Website beeinträchtigen könnten, einschließlich der Geschwindigkeit der Website und der Mobilfreundlichkeit." },
                                        { name: "Wettbewerbsanalyse", description: "Erhalten Sie Einblicke in die Strategien Ihrer Mitbewerber und bleiben Sie in Ihrer Nische einen Schritt voraus." },
                                    ]}
                                    plan={{ get: PRICING["02"].name, set: setPlan }}
                                />
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Social Media Marketing"}
                                    description={"Unser Hauptziel ist es, Ihre Marke auf den sozialen Plattformen zum Strahlen zu bringen und Ihr Publikum zu begeistern."}
                                    price={PRICING["03"].price}
                                    handleModal={handleModal.show}
                                    benefits={[
                                        { name: "Analyse Ihrer vorhandenen Social-Media-Präsenz", description: "Um Schwachstellen zu erkennen und Chancen zu nutzen." }, 
                                        { name: "Erstellung hochwirksamer Social-Media-Kampagnen", description: "Um messbare Ergebnisse zu erzielen." },
                                        { name: "Kreation ansprechender Inhalte und Anzeigen", description: "Um die Interaktion und das Engagement Ihrer Zielgruppe zu steigern." },
                                        { name: "Zielgerichtete Auswahl von Plattformen und Anzeigeformaten", description: "Um Ihre Marke optimal zu präsentieren und die Reichweite zu maximieren." },
                                        { name: "Wettbewerbsanalyse", description: "Um herauszufinden, welche Strategien und Inhalte in Ihrer Branche erfolgreich sind und diese zu übertreffen." },
                                    ]}
                                    plan={{ get: PRICING["03"].name, set: setPlan }}
                                    perMonth={true}
                                />
                            </motion.div>
                            <motion.div
                                className={"grid grid-cols-2 gap-5 w-[50rem]"}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: .2, origin: 1 }}
                            >
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Suchmaschinenmarketing (SEM)"}
                                    description={"Unser Hauptziel ist es, die größtmögliche Anzahl an Conversions zu möglichst geringen Kosten zu generieren."}
                                    price={PRICING["04"].price}
                                    handleModal={handleModal.show}
                                    benefits={[
                                        { name: "Überprüfung Ihres bestehenden Ads-Konto", description: "Um etwaige Probleme zu erkennen und zu beheben." },
                                        { name: "Hochleistungsfähige Google Ads-Kampagnen", description: "Um greifbare Ergebnisse zu erzielen." },
                                        { name: "Erstellung effektiver Ad Groups, Ads, und Extensions", description: "Zur Steigerung der Relevanzbewertungen und Verbesserung des Anzeigenrankings." },
                                        { name: "Strategische Auswahl gezielter Keywords", description: "Zur Verbesserung des Suchmaschinen-Rankings Ihrer Website." },
                                        { name: "Wettbewerbsanalyse", description: "Zur Identifizierung und Nutzung erstklassiger Keywords, Anzeigentexte und Erweiterungen, um Ihre Konkurrenz zu überflügeln." },
                                    ]}
                                    plan={{ get: PRICING["04"].name, set: setPlan }}
                                    perMonth={true}
                                />
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Premium Digital Marketing Paket"}
                                    description={"Bringen Sie Ihr Unternehmen oder Geschäft auf die nächste Stufe, indem Sie die effektivsten Strategien des digitalen Marketings nutzen."}
                                    price={PRICING["05"].price}
                                    handleModal={handleModal.show}
                                    benefits={[
                                        { name: "SEO-Optimierung" }, 
                                        { name: "Suchmaschinenmarketing (SEM)" }, 
                                        { name: "Social Media Marketing" }
                                    ]}
                                    popular={true}
                                    plan={{ get: PRICING["05"].name, set: setPlan }}
                                    perMonth={true}
                                />
                            </motion.div>
                        </div>
                        <div className={"block xl:hidden w-full"}>
                            <CardsMobile setPlan={setPlan} showModal={handleModal.show} />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactSimple service={plan} handleClose={handleModal.close} language={"de"} />
                )}
            </AnimatePresence>
        </section>
    )
}

function Card({ plan, title, description, price, popular, benefits, handleModal, perMonth }) {

    const { darkMode } = useContextProvider();

    const handleClickButton = () => {
        handleModal();
        plan.set(plan.get);
    }

    return (
        <div className={`h-full ${styles.cardGlassEffect}`}>
            <div className={`grid place-content-center ${popular ? "bg-primary" : null} h-10 text-center rounded-t-xl text-zinc-200`}>{popular ? "Popular" : null}</div>
            <div className={`flex flex-col items-center justify-between gap-12 h-full py-8 sm:py-12 px-6 sm:px-12 border ${popular ? (darkMode ? "bg-[#0D1020] border-neutral-800" : "bg-[#ddd5ff] border-neutral-300") : `${darkMode ? "border-neutral-800 bg-[#00000031]" : "border-neutral-300 bg-[#ffffff4f]"}`} ${popular ? "rounded-b-xl" : "rounded-xl"} text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                <div className={"flex flex-col gap-12"}>
                    <div className={"flex flex-col items-center gap-5"}>
                        <div className={"text-2xl font-semibold text-primary"}>{title}</div>
                        <div>{description}</div>
                        {/* <div className={"flex flex-col gap-1 items-center"}>
                            <div className={"relative flex items-center gap-1 font-medium text-5xl"}>
                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                <span>{price}</span>
                                <div className={"absolute bottom-0 w-full h-3 bg-primary opacity-50"} style={{ zIndex: "-1" }}></div>
                            </div>
                            {perMonth && (
                                <div>/monat</div>
                            )}
                        </div> */}
                    </div>
                </div>
                <div className={"flex flex-col items-center gap-3 list-disc w-full text-left"}>
                    <div className={"flex flex-col items-center gap-3 w-full"}>
                        {benefits.map((item, index) => (
                            <CardBenefit key={index} name={item.name} description={item.description} hasDescription={item.hasDescription} />
                        ))}
                    </div>
                </div>
                <button onClick={handleClickButton} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
            </div>
        </div>
    )
}

function CardBenefit({ name, description }) {

    const { darkMode } = useContextProvider();

    const [showInformation, setShowInformation] = useState(false);

    return (
        <div className={"flex items-start justify-center gap-2 relative w-full"}>
            <div className={"flex items-start gap-4"}>
                <i className="fa-regular fa-check text-primary mt-1"></i>
                <span>{name}</span>
            </div>
            {description && (
                <div>
                    <i
                        onClick={() => setShowInformation(!showInformation)}
                        className={`cursor-pointer text-lg fa-sharp fa-solid fa-circle-info ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}
                    ></i>
                    <AnimatePresence>
                        {showInformation && (
                            <motion.div
                                onClick={() => setShowInformation(false)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`cursor-pointer absolute left-0 top-10 w-full ${darkMode ? "bg-neutral-300" : "bg-neutral-800"} rounded-lg py-1 px-2 select-none`}
                                style={{ zIndex: 1 }}>
                                <div className={`${darkMode ? "text-black" : "text-white"} break-words text-sm`}>{description}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

function CardsMobile({ setPlan, showModal }) {

    const NAMES = {
        "0": "Marketinginhalte",
        "1": "Suchmaschinenoptimierung",
        "2": "Premium Digital Marketing",
        "3": "Social-Media-Marketing",
        "4": "Online-Werbung",
    }

    const { darkMode } = useContextProvider();

    const [swiperInstance, setSwiperInstance] = useState();

    const [planName, setPlanName] = useState();
    const [actualPlan, setActualPlan] = useState(2);

    const handleSlideChange = (e) => {
        setActualPlan(e.activeIndex);
        setPlanName(NAMES[e.activeIndex]);
    }

    useEffect(() => {
        setPlanName(NAMES[actualPlan]);
    }, [])

    // Plans Navigator
    const handleNextPlan = () => {
        if (actualPlan == 4) {
            return;
        }
        setActualPlan(actualPlan + 1);
        swiperInstance.slideTo(actualPlan + 1);
        setPlanName(NAMES[actualPlan + 1]);
    }
    const handlePrevPlan = () => {
        if (actualPlan == 0) {
            return;
        }
        setActualPlan(actualPlan - 1);
        swiperInstance.slideTo(actualPlan - 1);
        setPlanName(NAMES[actualPlan - 1]);
    }

    return (
        <section className={"flex flex-col gap-2"}>
            <div className={"flex flex-col gap-5"}>
                {/* <div className={`overflow-x-scroll hide-scroll scrollbar-thin ${darkMode ? "scrollbar-track-[#101010]" : "scrollbar-track-[#eeeef3]"} pb-2 px-3`}>
                    <div className={`relative flex min-w-max gap-1 items-center justify-center whitespace-nowrap`}>
                        <button onClick={() => handleSetPlan(0)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 0 ? "border-primary" : "border-transparent"} transition-colors rounded-t-md`}>Marketinginhalte</button>
                        <button onClick={() => handleSetPlan(1)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 1 ? "border-primary" : "border-transparent"} transition-colors rounded-t-md`}>Suchmaschinenoptimierung</button>
                        <button onClick={() => handleSetPlan(2)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 2 ? "border-primary" : "border-transparent"} transition-colors rounded-t-md`}>Premium Digital Marketing Paket</button>
                        <button onClick={() => handleSetPlan(3)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 3 ? "border-primary" : "border-transparent"} transition-colors rounded-t-md`}>Social-Media-Marketing</button>
                        <button onClick={() => handleSetPlan(4)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 4 ? "border-primary" : "border-transparent"} transition-colors rounded-t-md`}>Online-Werbung</button>
                    </div>
                </div> */}
                <div className={"flex items-center gap-2 justify-center"}>
                    <button className={"grid place-content-center w-8 h-8 bg-primary text-white rounded-full text-lg"} onClick={handlePrevPlan}><i className="fa-solid fa-angle-left"></i></button>
                    <div>{planName}</div>
                    <button className={"grid place-content-center w-8 h-8 bg-primary text-white rounded-full text-lg"} onClick={handleNextPlan}><i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"flex h-10"}>
                        <i className={`fa-regular fa-arrow-left-long text-2xl text-primary ${styles.animationScrollLeft}`}></i>
                    </div>
                    <div className={"flex h-10"}>
                        <i className={`fa-regular fa-arrow-right-long text-2xl mr-2 text-primary ${styles.animationScrollRight}`}></i>
                    </div>
                </div>
            </div>
            <div className={"px-3 min-w-[350px]"}>
                <Swiper
                    slidesPerView={1}
                    centeredSlides={true}
                    spaceBetween={15}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    initialSlide={actualPlan}
                    className={`${styles["prices-swiper"]} swiper-grid-5`}
                    onSwiper={instance => setSwiperInstance(instance)}
                    onSlideChange={e => handleSlideChange(e)}
                >
                    {/* <SwiperSlide className={styles["swiper-slide-item"]}>
                        <Card
                            icon={"fa-regular fa-window"}
                            title={"Marketinginhalte"}
                            description={"Erstellen und Teilen relevanter und wertvoller Inhalte wie Blogs, Videos, Infografiken usw., um die Zielgruppe anzuziehen und zu begeistern."}
                            price={PRICING["01"].price}
                            handleModal={showModal}
                            benefits={[{ name: "Blogs" }, { name: "Nachrichtenseite" }]}
                            plan={{ get: PRICING["01"].name, set: setPlan }}
                        />
                    </SwiperSlide> */}
                    <SwiperSlide className={styles["swiper-slide-item"]}>
                        <Card
                            icon={"fa-regular fa-mobile"}
                            title={"SEO-Optimierung (SEO)"}
                            description={"Unser Hauptziel ist es, den hochwertigsten organischen Traffic auf Ihrer Website zu lenken."}
                            price={PRICING["02"].price}
                            handleModal={showModal}
                            benefits={[
                                { name: "Keyword-Recherche", description: "Wir identifizieren hochwirksame Keywords, die relevant für Ihre Branche und Nische sind, um sicherzustellen, dass Ihr Inhalt für das, was für Ihr Unternehmen am wichtigsten ist, gut gerankt wird." },
                                { name: "On-Page-Optimierung", description: "Wir feinabstimmen die Struktur Ihrer Website, Meta-Tags und Inhalte, um sie suchmaschinenfreundlich und benutzerzentriert zu gestalten." },
                                { name: "Content-Strategie", description: "Unser Team wird Ihren bestehenden Inhalt erstellen oder optimieren, um Ihre Zielgruppe anzusprechen und die Autorität Ihrer Marke zu stärken." },
                                { name: "Lokales SEO", description: "Wir optimieren Ihre Online-Präsenz für lokale Suchanfragen und stellen sicher, dass potenzielle Kunden Ihr Unternehmen leicht finden können." },
                                { name: "Technisches SEO", description: "Wir kümmern uns um technische Probleme, die die Leistung Ihrer Website beeinträchtigen könnten, einschließlich der Geschwindigkeit der Website und der Mobilfreundlichkeit." },
                                { name: "Wettbewerbsanalyse", description: "Erhalten Sie Einblicke in die Strategien Ihrer Mitbewerber und bleiben Sie in Ihrer Nische einen Schritt voraus." },
                            ]}
                            plan={{ get: PRICING["02"].name, set: setPlan }}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles["swiper-slide-item"]}>
                        <Card
                            icon={"fa-solid fa-chart-mixed"}
                            title={"Social Media Marketing"}
                            description={"Unser Hauptziel ist es, Ihre Marke auf den sozialen Plattformen zum Strahlen zu bringen und Ihr Publikum zu begeistern."}
                            price={PRICING["03"].price}
                            handleModal={showModal}
                            benefits={[
                                { name: "Analyse Ihrer vorhandenen Social-Media-Präsenz", description: "Um Schwachstellen zu erkennen und Chancen zu nutzen." },
                                { name: "Erstellung hochwirksamer Social-Media-Kampagnen", description: "Um messbare Ergebnisse zu erzielen." },
                                { name: "Kreation ansprechender Inhalte und Anzeigen", description: "Um die Interaktion und das Engagement Ihrer Zielgruppe zu steigern." },
                                { name: "Zielgerichtete Auswahl von Plattformen und Anzeigeformaten", description: "Um Ihre Marke optimal zu präsentieren und die Reichweite zu maximieren." },
                                { name: "Wettbewerbsanalyse", description: "Um herauszufinden, welche Strategien und Inhalte in Ihrer Branche erfolgreich sind und diese zu übertreffen." },
                            ]}
                            plan={{ get: PRICING["03"].name, set: setPlan }}
                            perMonth={true}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles["swiper-slide-item"]}>
                        <Card
                            icon={"fa-solid fa-chart-mixed"}
                            title={"Suchmaschinenmarketing (SEM)"}
                            description={"Unser Hauptziel ist es, die größtmögliche Anzahl an Conversions zu möglichst geringen Kosten zu generieren."}
                            price={PRICING["04"].price}
                            handleModal={showModal}
                            benefits={[
                                { name: "Überprüfung Ihres bestehenden Ads-Konto", description: "Um etwaige Probleme zu erkennen und zu beheben." },
                                { name: "Hochleistungsfähige Google Ads-Kampagnen", description: "Um greifbare Ergebnisse zu erzielen." },
                                { name: "Erstellung effektiver Ad Groups, Ads, und Extensions", description: "Zur Steigerung der Relevanzbewertungen und Verbesserung des Anzeigenrankings." },
                                { name: "Strategische Auswahl gezielter Keywords", description: "Zur Verbesserung des Suchmaschinen-Rankings Ihrer Website." },
                                { name: "Wettbewerbsanalyse", description: "Zur Identifizierung und Nutzung erstklassiger Keywords, Anzeigentexte und Erweiterungen, um Ihre Konkurrenz zu überflügeln." },
                            ]}
                            plan={{ get: PRICING["04"].name, set: setPlan }}
                            perMonth={true}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles["swiper-slide-item"]}>
                        <Card
                            icon={"fa-solid fa-chart-mixed"}
                            title={"Premium Digital Marketing Paket"}
                            description={"Bringen Sie Ihr Unternehmen oder Geschäft auf die nächste Stufe, indem Sie die effektivsten Strategien des digitalen Marketings nutzen."}
                            price={PRICING["05"].price}
                            handleModal={showModal}
                            benefits={[
                                { name: "SEO-Optimierung" },
                                { name: "Suchmaschinenmarketing (SEM)" },
                                { name: "Social Media Marketing" }
                            ]}
                            popular={true}
                            plan={{ get: PRICING["05"].name, set: setPlan }}
                            perMonth={true}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}
