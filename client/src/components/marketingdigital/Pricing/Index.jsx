import axios from "axios";
import { useEffect, useRef, useState } from "react";
// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { AnimatePresence } from "framer-motion";
// Notifications
import { toast } from "react-toastify";
// Hooks
import currencyFormatter from "@/hooks/currencyFormatter";
// Languages
import LANG from "@/lang/components/Modals/Pricing/Index";
// Styles
import styles from './Index.module.css'
// Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import Modal from "../../Modal/Index";

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
        price: 100
    },
    "05": {
        name: "Premium Digital Marketing",
        price: 490
    },
}

export default function MDPricing() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    // Modal
    const [ showModal, setShowModal ] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }

    const [ plan, setPlan ] = useState("");

    return (
        <section className={`${styles.backgroundImage} relative overflow-hidden ${darkMode ? 'bg-[#101010]' : 'section-bg-light'} flex items-center pb-20`} id="our-technologies">
            <div className="w-full relative">
                <div className={"flex flex-col gap-20"}>
                    <div className={"xl:max-w-7xl 2xl:max-w-[90rem] mx-auto"}>
                        <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                            <div className={"flex flex-col gap-5"}>
                                {/* <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Encuentra el plan perfecto para llevar tu proyecto al siguiente nivel</div> */}
                                <h2 className={"text-3xl sm:text-5xl font-bold"}><span className={"text-primary"}>Benutzer-definierte</span> Web-entwicklung-sdienste</h2>
                            </div>
                            <p className={`${darkMode ? "description-dark" : "description-light"}`}>Hier sind unsere drei Pakete, die auf die Anforderungen jedes Projekts zugeschnitten sind, von kleinen Unternehmen bis hin zu großen Webanwendungen.</p>
                        </div>
                    </div>
                    <div className={"flex justify-center w-full overflow-x-scroll sm:overflow-x-hidden scrollbar-thin pb-2"}>
                        <div className={`hidden xl:flex flex-col items-center gap-10 w-full`}>
                            <div className={"grid grid-cols-3 gap-5 w-[75rem]"}>
                                <Card
                                    icon={"fa-regular fa-window"}
                                    title={"Marketinginhalte"}
                                    description={"Erstellen und Teilen relevanter und wertvoller Inhalte wie Blogs, Videos, Infografiken usw., um die Zielgruppe anzuziehen und zu begeistern."}
                                    price={PRICING["01"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Blogs" }, { name: "Nachrichtenseite" }]}
                                    plan={{ get: PRICING["01"].name, set: setPlan }}
                                />
                                <Card
                                    icon={"fa-regular fa-mobile"}
                                    title={"Suchmaschinenoptimierung (SEO)"}
                                    description={"Verbesserung der Sichtbarkeit der Website in den organischen Suchergebnissen durch Techniken wie."}
                                    price={PRICING["02"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Schlüsselwörter" }, { name: "Meta-Tags" }, { name: "Hochwertige Links" }]}
                                    plan={{ get: PRICING["02"].name, set: setPlan }}
                                />
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Social-Media-Marketing"}
                                    description={"Nutzung von Plattformen wie Facebook, Instagram, Twitter, LinkedIn, TikTok usw., um mit Followern zu interagieren, Inhalte zu teilen und Produkte oder Dienstleistungen zu bewerben."}
                                    price={PRICING["03"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Erstellung von kreativen Inhalten (Bilder & Videos)" }, { name: "Professionelles Social-Media-Management" }]}
                                    plan={{ get: PRICING["03"].name, set: setPlan }}
                                />
                            </div>
                            <div className={"grid grid-cols-2 gap-5 w-[50rem]"}>
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Online-Werbung (SEM)"}
                                    description={"Durchführung bezahlter Werbekampagnen auf Suchmaschinen und Social-Media-Plattformen, um die Sichtbarkeit zu erhöhen und den Traffic auf der Website zu steigern."}
                                    price={PRICING["04"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Erstellung und Pflege von Werbekampagnen mit Google Ads, TikTok Ads und Facebook Ads." }]}
                                    plan={{ get: PRICING["04"].name, set: setPlan }}
                                />
                                <Card
                                    icon={"fa-solid fa-chart-mixed"}
                                    title={"Premium Digital Marketing Paket"}
                                    description={"Bringen Sie Ihr Unternehmen oder Geschäft auf die nächste Stufe, indem Sie die effektivsten Strategien des digitalen Marketings nutzen."}
                                    price={PRICING["05"].price}
                                    handleModal={handleModal.show}
                                    benefits={[{ name: "Marketinginhalte" }, { name: "Suchmaschinenoptimierung (SEO)" }, { name: "Social-Media-Marketing" }, { name: "Online-Werbung (SEM)" }, { name: "Geld-zurück-Garantie" }]}
                                    popular={true}
                                    plan={{ get: PRICING["05"].name, set: setPlan }}
                                />
                            </div>
                        </div>
                        <div className={"block xl:hidden w-full"}>
                            <CardsMobile setPlan={setPlan} showModal={handleModal.show} />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactModal service={plan} handleClose={handleModal.close} language={"de"} />
                )}
            </AnimatePresence>
        </section>
    )
}

function Card({ plan, title, description, price, popular, benefits, handleModal }) {

    const { darkMode } = useContextProvider();

    const handleClickButton = () => {
        console.log(handleModal)
        handleModal();
        plan.set(plan.get);
    }

    return (
        <div className={`h-full ${styles.cardGlassEffect}`}>
            <div className={`grid place-content-center ${popular ? "bg-primary" : null} h-10 text-center rounded-t-xl text-zinc-200`}>{popular ? "Popular" : null}</div>
            <div className={`flex flex-col items-center justify-between gap-12 h-full py-12 px-12 border ${popular ? (darkMode ? "bg-[#0D1020] border-neutral-800" : "bg-[#ddd5ff] border-neutral-300") : `${darkMode ? "border-neutral-800 bg-[#00000031]" : "border-neutral-300 bg-[#ffffff4f]"}`} ${popular ? "rounded-b-xl" : "rounded-xl"} text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                <div className={"flex flex-col gap-12"}>
                    <div className={"flex flex-col items-center gap-5"}>
                        <div className={"text-2xl font-semibold text-primary"}>{title}</div>
                        <div>{description}</div>
                        <div className={"flex items-center"}>
                            <div className={"relative flex items-center gap-1 font-medium text-5xl"}>
                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                <span>{price}</span>
                                <div className={"absolute bottom-0 w-full h-3 bg-primary opacity-50"} style={{zIndex: "-1"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center gap-3 list-disc w-full text-left"}>
                        <div className={"flex flex-col gap-3"}>
                            {benefits.map((item, index) => (
                                <div key={index} className={"flex items-start gap-4"}>
                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={handleClickButton} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
            </div>
        </div>
    )
}

function CardsMobile({ setPlan, showModal }) {

    const [ actualPlan, setActualPlan ] = useState(2);
    const handleSetPlan = (plan) => {
        setActualPlan(plan);
    }

    return (
        <section className={"flex flex-col gap-5"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex justify-between"}>
                    <div className={"flex justify-start w-fit h-10"}>
                        <i className={`fa-regular fa-arrow-right-long text-2xl text-primary ${styles.animationScrollRight}`}></i>
                    </div>
                    <div className={"flex justify-end w-fit h-10"}>
                        <i className={`fa-regular fa-arrow-left-long text-2xl mr-2 text-primary ${styles.animationScrollLeft}`}></i>
                    </div>
                </div>
                <div className={"overflow-x-scroll scrollbar-thin hide-scroll pb-2 px-3"}>
                    <div className={`relative flex min-w-max gap-1 items-center justify-center whitespace-nowrap`}>
                        <button onClick={() => handleSetPlan(0)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 0 ? "border-primary" : "border-transparent"} transition-colors text-white rounded-t-md`}>Marketinginhalte</button>
                        <button onClick={() => handleSetPlan(1)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 1 ? "border-primary" : "border-transparent"} transition-colors text-white rounded-t-md`}>Suchmaschinenoptimierung</button>
                        <button onClick={() => handleSetPlan(2)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 2 ? "border-primary" : "border-transparent"} transition-colors text-white rounded-t-md`}>Premium Digital Marketing Paket</button>
                        <button onClick={() => handleSetPlan(3)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 3 ? "border-primary" : "border-transparent"} transition-colors text-white rounded-t-md`}>Social-Media-Marketing</button>
                        <button onClick={() => handleSetPlan(4)} className={`py-3 px-4 border-b-[3px] ${actualPlan == 4 ? "border-primary" : "border-transparent"} transition-colors text-white rounded-t-md`}>Online-Werbung</button>
                    </div>
                </div>
            </div>
            <div className={"px-3 min-w-[350px]"}>
                {actualPlan == 0 && (
                    <Card
                        icon={"fa-regular fa-window"}
                        title={"Marketinginhalte"}
                        description={"Erstellen und Teilen relevanter und wertvoller Inhalte wie Blogs, Videos, Infografiken usw., um die Zielgruppe anzuziehen und zu begeistern."}
                        price={PRICING["01"].price}
                        handleModal={showModal}
                        benefits={[{ name: "Blogs" }, { name: "Nachrichtenseite" }]}
                        plan={{ get: PRICING["01"].name, set: setPlan }}
                    />
                )}
                {actualPlan == 1 && (
                    <Card
                        icon={"fa-regular fa-mobile"}
                        title={"Suchmaschinen-optimierung (SEO)"}
                        description={"Verbesserung der Sichtbarkeit der Website in den organischen Suchergebnissen durch Techniken wie."}
                        price={PRICING["02"].price}
                        handleModal={showModal}
                        benefits={[{ name: "Schlüsselwörter" }, { name: "Meta-Tags" }, { name: "Hochwertige Links" }]}
                        plan={{ get: PRICING["02"].name, set: setPlan }}
                    />
                )}
                {actualPlan == 2 && (
                    <Card
                        icon={"fa-solid fa-chart-mixed"}
                        title={"Premium Digital Marketing Paket"}
                        description={"Bringen Sie Ihr Unternehmen oder Geschäft auf die nächste Stufe, indem Sie die effektivsten Strategien des digitalen Marketings nutzen."}
                        price={PRICING["05"].price}
                        handleModal={showModal}
                        benefits={[{ name: "Marketinginhalte" }, { name: "Suchmaschinenoptimierung (SEO)" }, { name: "Social-Media-Marketing" }, { name: "Online-Werbung (SEM)" }, { name: "Geld-zurück-Garantie" }]}
                        popular={true}
                        plan={{ get: PRICING["05"].name, set: setPlan }}
                    />
                )}
                {actualPlan == 3 && (
                    <Card
                        icon={"fa-solid fa-chart-mixed"}
                        title={"Social-Media-Marketing"}
                        description={"Nutzung von Plattformen wie Facebook, Instagram, Twitter, LinkedIn, TikTok usw., um mit Followern zu interagieren, Inhalte zu teilen und Produkte oder Dienstleistungen zu bewerben."}
                        price={PRICING["03"].price}
                        handleModal={showModal}
                        benefits={[{ name: "Erstellung von kreativen Inhalten (Bilder & Videos)" }, { name: "Professionelles Social-Media-Management" }]}
                        plan={{ get: PRICING["03"].name, set: setPlan }}
                    />
                )}
                {actualPlan == 4 && (
                    <Card
                        icon={"fa-solid fa-chart-mixed"}
                        title={"Online-Werbung (SEM)"}
                        description={"Durchführung bezahlter Werbekampagnen auf Suchmaschinen und Social-Media-Plattformen, um die Sichtbarkeit zu erhöhen und den Traffic auf der Website zu steigern."}
                        price={PRICING["04"].price}
                        handleModal={showModal}
                        benefits={[{ name: "Erstellung und Pflege von Werbekampagnen mit Google Ads, TikTok Ads und Facebook Ads." }]}
                        plan={{ get: PRICING["04"].name, set: setPlan }}
                    />
                )}
                
            </div>
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
            <form className={"flex flex-col gap-5 sm:gap-10 p-5 py-10 relative"} onSubmit={handleSubmit}>
                <button onClick={handleClose} className={"absolute top-2 right-3 text-2xl"}>
                    <i className="fa-sharp fa-regular fa-xmark"></i>
                </button>
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