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
    basic: 350,
    pro: 750,
    premium: 1250
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
        
        try {
            await axios.post('/api/pricing/sendMail', { pricing: { plan: LANG.es.plans[pricing.plan], price: pricing.price }, name, email, phoneNumber, description });
            toast.success(LANG[language].notifications.success);
        } catch (error) {
            toast.error(LANG[language].notifications.error.catch);
        } finally {
            resetForm();
        }
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
                    <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20"}>
                        <div className={"flex flex-col gap-5"}>
                            <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Encuentra el plan perfecto para llevar tu proyecto al siguiente nivel</div>
                            <h2 className={"text-3xl sm:text-5xl font-bold"}>Servicios de Desarrollo Web a la medida</h2>
                        </div>
                        <p className={`${darkMode ? "description-dark" : "description-light"}`}>A continuación, te presentamos nuestros tres paquetes diseñados para satisfacer las necesidades de cualquier proyecto, desde pequeñas empresas hasta aplicaciones web de gran escala.</p>
                    </div>
                    <div className={"flex justify-center w-full"}>
                        <div className={"hidden xl:flex items-start gap-6"}>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan básico</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.basic}</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Sitio web estático.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Diseño responsivo.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Integración con un CMS.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Formulario de contacto.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Costo asequible y tiempo de entrega rápido.</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("basic", PRICING.basic)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"grid place-content-center bg-primary text-white h-10 text-center rounded-t-xl"}>
                                    <div className={"uppercase text-sm"}>Más popular</div>
                                </div>
                                <div className={`flex flex-col items-center justify-between gap-12 ${darkMode ? "bg-[#0D1020]" : "bg-[#ddd5ff]"} py-16 px-12 rounded-b-xl text-center`}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan pro</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.pro}</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Todo lo del Plan Básico.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Sitio web dinámico.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Integración de base de datos.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Autenticación de usuarios.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Optimización de rendimiento.</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("pro", PRICING.pro)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan premium</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>{PRICING.premium}</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Todo lo del Plan Avanzado.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Aplicación Full-stack.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Admin panel.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Soporte prioritario.</span>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectPackage("premium", PRICING.premium)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Swiper
                                slidesPerView={3}
                                centeredSlides={true}
                                spaceBetween={20}
                                grabCursor={true}
                                pagination={{
                                    clickable: true,
                                }}
                                className={styles["prices-swiper"]}
                            >
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan básico</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.basic}</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Sitio web estático.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Diseño responsivo.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Integración con un CMS.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Formulario de contacto.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Costo asequible y tiempo de entrega rápido.</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("basic", PRICING.basic)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"grid place-content-center bg-primary text-white h-10 text-center rounded-t-xl"}>
                                            <div className={"uppercase text-sm"}>Más popular</div>
                                        </div>
                                        <div className={`flex flex-col items-center justify-between gap-12 ${darkMode ? "bg-[#0D1020]" : "bg-neutral-200"} py-16 px-12 rounded-b-xl text-center`}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan pro</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.pro}</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Todo lo del Plan Básico.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Sitio web dinámico.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Integración de base de datos.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Autenticación de usuarios.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Optimización de rendimiento.</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("pro", PRICING.pro)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles["swiper-slide-item"]}>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full py-16 px-12 border ${darkMode ? "border-neutral-800 bg-[#131313]" : "border-neutral-300 bg-neutral-100"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan premium</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>{PRICING.premium}</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Todo lo del Plan Avanzado.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Aplicación Full-stack.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Admin panel.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Soporte prioritario.</span>
                                                </div>
                                            </div>
                                            <button onClick={() => handleSelectPackage("premium", PRICING.premium)} className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
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