import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
// Nextjs
import { useRouter } from 'next/router';
import Link from 'next/link';
// Components
import Modal from "../Modal/Index";
// Styles
import styles from './Index.module.css'
import useContextProvider from '@/hooks/useAppContextProvider';
// Languages
import lang from '../../lang/components/SecondaryContact/Index.json'
import showToast from '@/hooks/showToast';
// Animations
import { motion, AnimatePresence, easeIn, easeOut } from 'framer-motion';

/**
 * Secondary contact modal
 */
export default function SecondaryContactModal({ blog, handleClose, language }) {

    const router = useRouter();
  
    const { darkMode } = useContextProvider();

    const [ step, setStep ] = useState(1)
    
    const stepBar = {
        1: "w-[25%]",
        2: "w-[50%]",
        3: "w-[75%]",
        4: "w-[100%]"
    }

    // Form state
    const [formOption, setFormOption] = useState(); // step1 object key
    const [step1, setStep1] = useState({ key: "", value: "", changed: "" });
    const [step2, setStep2] = useState({ key: "", value: "" });
    const [step3, setStep3] = useState([]);
    const [ other, setOther ] = useState({ key: "", value: "" });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const legalTerms = useRef(false);

    const resetForm = () => {
        handleClose();
        setStep(1)
        setFormOption(0);
        setStep1({ key: "", value: "", changed: "" });
        setStep2({ key: "", value: "" });
        setStep3([]);
        setOther({ key: "", value: "" });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
    }

    // Reset state when step1 changes
    useEffect(() => {
        if (step1.changed) {
            setOther({ key: "", value: "" })
            setStep2({ key: "", value: "" })
            setStep3([])
        }
    }, [step1])

    const handleNextStep = () => { 
        /* if (other.key == 'website_url' && step == 2) {
            // If "website_url" already exists, remove it
            const newArray = step2.filter(step => step.key != 'website_url');
            setStep2(newArray.concat([{ key: "website_url", value: other.value }]));
            setStep(current => current + 1)
            return;
        } */
        if (other.key == 'other' && step == 3) {
            // If "other" already exists, remove it
            const newArray = step3.filter(step => step.key != 'other');
            setStep3(newArray.concat([{ key: "other", value: other.value }]));
            setStep(current => current + 1)
            return;
        }
        // If step is 2 and no option selected, then return
        if(step == 2 && !step2.key) {
            return;
        }
        // If step is 3 and step array length is equal to 0, then return
        if(step == 3 && step3.length == 0) {
            return;
        }
        // Next step
        if (step < 4) setStep(current => current + 1)
    }
    const handlePrevStep = () => { 
        if (step > 1) setStep(current => current - 1)
    }

    const handleSetStep2 = (service) => {
        setStep2({ key: service.id, value: service.text });
        setStep(current => current + 1);
    }

    const handleSetStep3 = (service) => {
        const stepExists = step3.find(step => step.key == service.id);
        if (stepExists) {
            const newSteps = step3.filter(step => step.key != service.id);
            setStep3(newSteps);
            return;
        }
        setStep3(current => [...current, { key: service.id, value: service.text }]);
    }

    const handleSubmit = async () => {
        if([name, email, phone].includes('')) {
            showToast(lang[language].notifications.step4, "error")
            return;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            showToast(lang[language].notifications.email, "error")
            return;
        }
        if (!legalTerms.current.checked) {
            showToast(lang[language].notifications.legal, "error")
            return;
        }

        const functionalities = step3.map(step => step.value);

        Promise.all([
            axios.post('/api/contact/modal/sendMail/helphistech', {
                blog,
                project: { type: `${step1.value}, ${step2.value}`, functionalities, message },
                contact: { name, email, phone },
                language
            }),
            axios.post('/api/contact/modal/sendMail/client', {
                email,
                project: { type: `${step1.value}, ${step2.value}`, functionalities, message },
                language
            }),
        ]).then(res => {
            showToast(lang[language].notifications.success, "success");
            resetForm();
            router.push('/confirmation')
        }).catch(err => {
            showToast(err, "error");
        })
    }

    // Get windows size
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        if (typeof window !== 'undefined') {
            const { innerWidth } = window;
            return innerWidth;
        }
        return 1000
    }

    return (
        <Modal handleClose={handleClose}>
            <div className={"flex flex-col gap-10 w-full text-center"}>
                <div className={`w-full h-1 ${darkMode ? "bg-neutral-800" : "bg-neutral-300"} rounded-full`}>
                    <div className={`${styles.stepBar} ${stepBar[step]} h-1 bg-primary transition-transform rounded-full`}></div>
                </div>
                { step == 1 && (
                    <div className={"flex flex-col gap-10"}>
                        <div className={"flex flex-col gap-2"}>
                            <div className={"text-2xl uppercase font-semibold"}>{lang[language].step1.title}</div>
                            <div className={"text-lg"}>{lang[language].step1.subtitle}</div>
                        </div>
                        <div className={"flex flex-col gap-3"}>
                            <div className={"grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-3"}>
                                {lang[language].step1.options.map((service, index) => (
                                    <div key={index} onClick={() => {
                                        setFormOption(index) 
                                        setStep1({...step1, key: service.id, value: service.text, changed: service.id != step1.key ? true : false })
                                        setStep(current => current + 1)
                                    }} className={`${styles.serviceCard} border-[.15rem] ${darkMode ? "border-[#ffffff0c]" : "border-[#EEEEF3]"} ${formOption == index ? styles.cardSelected : ""} ${index > 1 ? "col-start-1 col-end-3 md:col-start-auto md:col-end-auto" : ""}`}>
                                        <div className={`border rounded-lg ${darkMode ? "border-[#ffffff13]" : "border-[#0000000c]"} p-2`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <div className={"md:uppercase md:font-medium md:text-lg"}>{service.text}</div>
                                        <Tick enabled={formOption == index ? true : false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {step == 2 && (
                    <div className={"flex flex-col gap-10"}>
                        <div className={"text-2xl uppercase font-semibold"}>{lang[language].step2[formOption].title}</div>
                        <div className={"flex flex-col gap-3"}>
                            <div className={"grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-3"}>
                                {lang[language].step2[formOption].options.map((service, index) => (
                                    service.id != "other" ? (
                                        <div onClick={() => handleSetStep2(service)} key={index} className={`${styles.serviceCard} border-[.15rem] ${darkMode ? "border-[#ffffff0c]" : "border-[#EEEEF3]"} ${step2.key == service.id ? styles.cardSelected : ""}`}>
                                            <div className={`border rounded-lg ${darkMode ? "border-[#ffffff13]" : "border-[#0000000c]"} p-2`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className={'flex flex-col'}>
                                                {windowSize < 768 && service.mobile ? (
                                                    service.mobile.map(text => (
                                                        <div className={"md:uppercase md:font-medium md:text-lg"}>{text}</div>
                                                    ))
                                                ) : (
                                                    <div className={"md:uppercase md:font-medium md:text-lg"}>{service.text}</div>
                                                )}
                                            </div>
                                            <Tick enabled={step2.key == service.id ? true : false} />
                                        </div>
                                    ) : (
                                        <div className={"flex flex-col items-start gap-1 col-start-1 col-end-4"} key={index}>
                                            <label htmlFor={`step2-other`}>{service.text}</label>
                                                <input value={step2.value} onChange={e => setStep2({ key: 'website_url', value: e.target.value })} id={`step2-other`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="text" placeholder={service.text} />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {step == 3 && (
                    <div className={"flex flex-col gap-10"}>
                        <div className={"text-2xl uppercase font-semibold"}>{lang[language].step3[formOption].title}</div>
                        <div className={"flex flex-col gap-3"}>
                            <div className={"grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-3"}>
                                {lang[language].step3[formOption].options.map((service, index) => (
                                    service.id != "other" ? (
                                        <div onClick={() => handleSetStep3(service)} key={index} className={`${styles.serviceCard} border-[.15rem] ${darkMode ? "border-[#ffffff0c]" : "border-[#EEEEF3]"} ${step3.find(step => step.key == service.id) ? styles.cardSelected : ""}`}>
                                            <div className={`border rounded-lg ${darkMode ? "border-[#ffffff13]" : "border-[#0000000c]"} p-2`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className={'flex flex-col'}>
                                                {windowSize < 768 && service.mobile ? (
                                                    service.mobile.map(text => (
                                                        <div className={"md:uppercase md:font-medium md:text-lg"}>{text}</div>
                                                    ))
                                                ) : (
                                                    <div className={"md:uppercase md:font-medium md:text-lg"}>{service.text}</div>
                                                )}
                                            </div>
                                            <Tick enabled={step3.find(step => step.key == service.id) ? true : false} />
                                        </div>
                                    ) : (
                                        <div className={"flex flex-col items-start gap-1 col-start-1 col-end-3 md:col-start-2 md:cols-end-3"} key={index}>
                                            <label htmlFor={`step3-other`}>{service.text}</label>
                                            <input value={other.value} onChange={e => setOther({ key: 'other', value: e.target.value })} id={`step3-other`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="text" placeholder={service.text} />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {step == 4 && (
                    <div className={"flex flex-col gap-10"}>
                        <div className={"flex flex-col gap-3"}>
                            <div className={"text-2xl uppercase font-semibold"}>{lang[language].step4.title}</div>
                            <div>{lang[language].step4.subtitle}</div>
                        </div>
                        <div className={"flex flex-col gap-8"}>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 items-start justify-center gap-5"}>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-name`}>{lang[language].step4.options[0].text}</label>
                                    <input value={name} onChange={e => setName(e.target.value)} id={`step4-name`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="text" placeholder={lang[language].step4.options[0].text} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-email`}>{lang[language].step4.options[1].text}</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} id={`step4-email`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="email" placeholder={lang[language].step4.options[1].text} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-phone`}>{lang[language].step4.options[2].text}</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} id={`step4-phone`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full`} type="number" placeholder={lang[language].step4.options[2].text} />
                                </div>
                                <div className={"flex flex-col items-start gap-1"}>
                                    <label htmlFor={`step4-message`}>{lang[language].step4.options[3].text}</label>
                                    <textarea value={message} onChange={e => setMessage(e.target.value)} id={`step4-message`} className={`${darkMode ? "bg-neutral-800" : "bg-neutral-200"} py-2 px-3 outline-none rounded-md w-full resize-none`} rows={5} type="text" placeholder={lang[language].step4.options[3].text} />
                                </div>
                            </div>
                            <div className={"flex gap-2 select-none"}>
                                <div className={"flex items-start gap-2"}>
                                    <div className="form-control">
                                        <input ref={legalTerms} id={"legal"} type="checkbox" className="accent-primary w-5 h-5" />
                                    </div>
                                    <label htmlFor={"legal"}>Mit dem Absenden dieses Formulars stimme ich den <Link target={"_blank"} className={"link"} href={"/datenschutz"}>Datenschutzbestimmungen</Link> und den <Link target={"_blank"} className={"link"} href={"/impressum"}>rechtlichen Bestimmungen zu</Link>.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={"flex items-center justify-between gap-5"}>
                    { step > 1 && (
                        <>
                            <button className={`${styles.button} w-1/2`} onClick={handlePrevStep}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>{lang[language].prev}</span>
                            </button>
                            <button className={`${styles.button} ${step == 1 ? "w-full" : "w-1/2"}`} onClick={step < 4 ? handleNextStep : handleSubmit}>
                                <span>{step < 4 ? lang[language].next : lang[language].submit}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    )
}

function Tick({ enabled }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 ${darkMode ? `${enabled ? "border-primary bg-primary" : "border-[#ffffff13]"}` : `${enabled ? "border-primary bg-primary" : "border-[#0000000c]"}`}`}>
            <AnimatePresence>
                {enabled && (
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={easeIn} exit={{ transition: easeOut }} className={"absolute top-0 left-0 grid place-content-center w-5 h-5 bg-primary text-white rounded-full"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}