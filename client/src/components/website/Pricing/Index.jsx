import { useRef, useState } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { motion } from "framer-motion";
// Notifications
import { toast } from "react-toastify";
// Languages
import LANG from "@/lang/components/Modals/Pricing/Index";
// Styles
import styles from './Index.module.css'
// Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import Modal from "../../Modal/Index";
import axios from "axios";

const PRICING = {
    basic: 390,
    pro: 590,
    premium: 1190
}

export default function PricingSection() {

    // Get functions and variables from context
    const { darkMode, language } = useContextProvider();

    // Modal
    const [ showModal, setShowModal ] = useState(false);
    const handleModal = {
        show: () => setShowModal(true),
        close: () => setShowModal(false)
    }
    // Modal fields
    const [ pricing, setPricing ] = useState({
        plan: "",
        price: 0
    });
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("")
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ description, setDescription ] = useState("");
    const legalTerms = useRef("")

    const handleSelectPackage = (plan, price) => {
        handleModal.show();
        setPricing({ plan, price });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formIsValid = validateForm();
        if (!formIsValid.success) {
            return toast.error(formIsValid.msg);
        }
        
        Promise.all([
            axios.post('/api/pricing/sendMail', { pricing: { plan: LANG.es.plans[pricing.plan], price: pricing.price }, name, email, phoneNumber, description }),
            axios.post('/api/services/sendMail/client', { name, email, lang: "de" })
        ]).then(res => {
            toast.success(LANG[language].notifications.success);
        }).catch(err => {
            toast.error(LANG[language].notifications.error.catch);
        });

        resetForm();
    }

    function validateForm() {
        if([pricing, name, email, phoneNumber, description].includes("")) {
            return { success: false, msg: LANG[language].notifications.error.fields };
        }
        if(!legalTerms.current.checked) {
            return { success: false, msg: LANG[language].notifications.error.legal };
        }
        return { success: true, msg: "" };
    }

    function resetForm() {
        setPricing({
            plan: "",
            price: 0
        });
        setName("");
        setEmail("")
        setPhoneNumber("");
        setDescription("");
    }

    return (
        <section className={`relative overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 border-t`} id="our-technologies">
            <div className="xl:max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                <div className={"flex flex-col gap-20"}>
                    <div className={"flex flex-col gap-5 items-center"}>
                        <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Dienstleistungen</span>
                        <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20"}>
                            <div className={"flex flex-col gap-5"}>
                                {/* <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Encuentra el plan perfecto para llevar tu proyecto al siguiente nivel</div> */}
                                <h2 className={"text-3xl sm:text-5xl font-bold"}>Welche <span className={"text-primary"}>Dienstleistungen</span> wir anbieten</h2>
                            </div>
                            <p className={`${darkMode ? "description-dark" : "description-light"}`}>Eine hochwertige Webseite ist für eine starke Online-Präsenz entscheidend. Bei Helphistech bieten wir moderne und anpassungsfähige Designs, die Sie von der Konkurrenz abheben lassen. Unser Ziel ist es, Ihre Identität zu reflektieren und ein herausragendes Benutzererlebnis zu schaffen. Lassen Sie uns Ihre Online-Präsenz auf die nächste Stufe bringen!</p>
                        </div>
                    </div>
                    <div className={"flex justify-center w-full"}>
                        <motion.div 
                            className={"hidden xl:flex items-start gap-6"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Statische Website</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.basic}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Smartphone & Tablet optimiert</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Integration von sozialen Netzwerken</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Kontaktformular</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Google-Indexierung</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Impressum und Datenschutz</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Bis zu 5 Menüpunkte</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Persönliche Ansprechpartner</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Kundenbewertungen</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span className={"font-semibold text-[#FFA500]"}>5 Tage Lieferzeit</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("basic", PRICING.basic)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"grid place-content-center bg-primary text-white h-10 text-center rounded-t-xl"}>
                                    <div className={"uppercase text-sm"}>Bekannter</div>
                                </div>
                                <div className={`flex flex-col items-center justify-between gap-12 ${darkMode ? "bg-[#0D1020]" : "bg-[#ddd5ff]"} py-16 px-12 rounded-b-xl text-center`} style={{height: "calc(100% - 2.5rem)"}}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Dynamische Website</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.pro}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Alles aus der statischen Website</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Premium-Design</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Registrierung und Login für Benutzer</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Content-Management-System (CMS)</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Datenbankintegration</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Kostenloses Hosting und Domain für 12 Monate</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Bis zu 10 Menüpunkte</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span className={"font-semibold text-[#FFA500]"}>15 Tage Lieferzeit</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("pro", PRICING.pro)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Full-Stack-Anwendung</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.premium}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Alles aus der dynamischen Website</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Maßgeschneiderte Designs und Funktionen</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Admin Panel</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Kunden Panel</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("premium", PRICING.premium)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                </div>
                            </div>
                        </motion.div>
                        <div className={"flex flex-col gap-10"}>
                            <Swiper
                                slidesPerView={3}
                                centeredSlides={true}
                                spaceBetween={20}
                                grabCursor={true}
                                pagination={{
                                    clickable: true,
                                }}
                                initialSlide={1}
                                className={styles["prices-swiper"]}
                            >
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Statische Website</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.basic}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Smartphone & Tablet optimiert</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Integration von sozialen Netzwerken</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Kontaktformular</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Google-Indexierung</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Impressum und Datenschutz</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Bis zu 5 Menüpunkte</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Persönliche Ansprechpartner</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Kundenbewertungen</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span className={"font-semibold text-[#FFA500]"}>5 Tage Lieferzeit</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("basic", PRICING.basic)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"grid place-content-center bg-primary text-white h-10 text-center rounded-t-xl"}>
                                            <div className={"uppercase text-sm"}>Bekannter</div>
                                        </div>
                                        <div className={`flex flex-col items-center justify-between gap-12 ${darkMode ? "bg-[#0D1020]" : "bg-[#ddd5ff]"} py-16 px-12 rounded-b-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Dynamische Website</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.pro}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Alles aus der statischen Website</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Premium-Design</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Registrierung und Login für Benutzer</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Content-Management-System (CMS)</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Datenbankintegration</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Kostenloses Hosting und Domain für 12 Monate</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Bis zu 10 Menüpunkte</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span className={"font-semibold text-[#FFA500]"}>15 Tage Lieferzeit</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("pro", PRICING.pro)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Full-Stack-Anwendung</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.premium}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Alles aus der dynamischen Website</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Maßgeschneiderte Designs und Funktionen</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Admin Panel</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Kunden Panel</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("premium", PRICING.premium)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Kostenlose Beratung</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div className={"flex xl:hidden relative justify-center items-center text-5xl text-neutral-500"}>
                                <i className="fa-thin fa-arrows-left-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal handleClose={handleModal.close}>
                    <form className={"flex flex-col gap-5 sm:gap-10 p-5"} onSubmit={handleSubmit}>
                        <div className={"flex flex-col gap-3 text-center"}>
                            <div className={"text-2xl uppercase font-semibold"}>{LANG[language].title}</div>
                            <div>{LANG[language].subtitle}</div>
                        </div>
                        <div className={"flex flex-col gap-5"}>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 items-start justify-center gap-5"}>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-name`}>{LANG[language].labels.name}</label>
                                    <input value={name} onChange={e => setName(e.target.value)} id={`step4-name`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="text" placeholder={LANG[language].labels.name} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-email`}>{LANG[language].labels.email}</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} id={`step4-email`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="email" placeholder={LANG[language].labels.email} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-phone`}>{LANG[language].labels.phoneNumber}</label>
                                    <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} id={`step4-phone`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="number" placeholder={LANG[language].labels.phoneNumber} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-message`}>{LANG[language].labels.description}</label>
                                    <textarea value={description} onChange={e => setDescription(e.target.value)} id={`step4-message`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full resize-none`} rows={5} type="text" placeholder={LANG[language].labels.description} />
                                </div>
                            </div>
                            <div className={"flex gap-2 select-none"}>
                                <div className={"flex items-start gap-2"}>
                                    <div className="form-control">
                                        <input ref={legalTerms} id={"legal"} type="checkbox" className="accent-primary w-5 h-5" />
                                    </div>
                                    <label className={"w-fit text-left"} htmlFor={"legal"}>{LANG[language].legal.text1} {<Link className={"link"} target={"_blank"} href={LANG[language].legal.link1.href}>{LANG[language].legal.link1.text}</Link>} {LANG[language].legal.text2} {<Link className={"link"} target={"_blank"} href={LANG[language].legal.link2.href}>{LANG[language].legal.link2.text}</Link>}</label>
                                </div>
                            </div>
                        </div>
                        <button className={`${styles.button} w-full`} type={"submit"}>
                            <span>{LANG[language].submit}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </form>
                </Modal>
            )}
        </section>
    )
}