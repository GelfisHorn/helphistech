import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// Layout
import Layout from "@/components/Layout";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
import DayPicker from "@/components/contact/DayPicker";
import Link from "next/link";

export default function ProjectQuote() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    const [ showVideoCallForm, setShowVideoCallForm ] = useState(false);

    return (
        <Layout title={"Contact us"} metaDesc={"We offer customized web development services for businesses of all sizes. We create websites, e-commerce platforms, and web applications that are perfectly tailored to your needs."} lang={'en'}>
            <div className="bg-cover bg-fixed bg-center relative" style={{ backgroundImage: darkMode ? "url(/home/waves-variant.svg)" : "url(/home/waves-light.svg)" }}>
                <div className="flex flex-col items-center justify-center gap-20 py-20 px-6 sm:px-10 md:px-20 max-w-7xl 2xl:max-w-[90rem] mx-auto lg:h-full">
                    <div className={`flex flex-col gap-5 lg:h-full w-full transition-colors text-center xl:text-left`}>
                        <div className={`flex flex-col gap-5 w-full`}>
                            <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                <h1 className="w-full">Let's work together!</h1>
                            </motion.div>
                            <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`${darkMode ? 'description-dark' : 'description-light'}`}>Let us help you become even better at what you do. <br /> Fill in the following form and we will contact you in the next 24 hours.</motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-10 xl:gap-20 w-full">
                        <div className="w-full xl:w-3/5 py-5" id="quote-project-form">
                            <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                                <FormComponent />
                            </motion.div>
                        </div>
                        <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className="flex flex-col items-center justify-center text-center gap-3 xl:w-2/5 py-5 bg-[#19191f71] p-5 rounded-full aspect-square">
                            <h2 className="text-2xl font-medium w-full">BOOK A FREE CONSULTATION</h2>
                            <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>Get your free consultation now and get an exclusive 10% discount on your website development. Together we will find the best solutions that meet your expectations.</div>
                            <button onClick={() => setShowVideoCallForm(true)} className="btn-primary flex items-center gap-2 px-4 py-2 rounded-full text-white uppercase bg-primary hover:bg-primary-2 transition-colors w-fit select-none">
                                <span>BOOK A CONSULTATION</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </button>
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {showVideoCallForm && <VideocallModal closeVideoCallForm={() => setShowVideoCallForm(false)} />}
                    </AnimatePresence>
                </div>
            </div>
        </Layout>
    )
}


function VideocallModal({ closeVideoCallForm }) {
    const { darkMode } = useContextProvider();
    
    // toggles overflow while rendered
    useEffect(() => {
        document.body.classList.add("body-in-modal-open")
        return () => 
        document.body.classList.remove("body-in-modal-open")
    },[])

    const FORM_STEPS = {
        DATE_PICKER: 1,
        CONTACT_INFO: 2
    }
    //step and send controller
    const [ formStep, setFormStep ] = useState(FORM_STEPS.DATE_PICKER)
    // on submit show message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    const [ full_name, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ date, setDate ] = useState('');
    const [ hour, setHour ] = useState('');
    const [ description, setDescription ] = useState('');

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if([full_name, email, date, hour, description].includes('')) {
            showMessage(true, 'All fields are required', 5000)
            return;
        }

        try {
            await axios.post('/api/sendVideoCall', { full_name, email, date, hour, description });
            showMessage(false, 'Your video call was successfully scheduled', 5000);
            setTimeout(closeVideoCallForm, 1500)
        } catch (error) {
            showMessage(true, 'There was an error scheduling your video call', 5000);
        }
    }

    return (
        <>
            <motion.div exit={{ opacity: 0 }}
                className="fixed top-0 h-full w-full z-50 flex items-center justify-center" 
            >
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                    onClick={closeVideoCallForm}
                    className="fixed top-0 h-full z-10 w-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
                ></motion.div>
                <motion.div className={`z-20 max-sm:w-full max-sm:h-screen h-[560px] overflow-y-auto max-sm:py-5 max-sm:px-2 px-5 pt-6 w-modal rounded-lg ${darkMode ? "bg-zinc-900": "bg-zinc-200" }`}
                    initial={{ x: -30 }}
                    animate={{ x: 0 }}
                    exit={{ x: -30 }}
                    transition={{ type: "spring", bounce: 0, duration: .3 }}
                >
                    <form className="flex flex-col justify-between gap-5 relative h-full" onSubmit={handleSubmit}>
                       <AnimatePresence>
                            { message.text && (
                                <motion.div
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                whileTap={{ scale: .9 }}
                                transition={{ type: "spring", bounce: 0, duration: .4 }}
                                onClick={() => setMessage({ error: false, text: '' })}
                                className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md absolute top-0`}>{message.text}</motion.div>
                            )}
                        </AnimatePresence>
                        {
                            formStep === FORM_STEPS.DATE_PICKER && (
                            <>
                                <div className="flex flex-col gap-5 ">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-1 w-10">
                                            <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>01</div>
                                        </div>
                                        <div className={'flex flex-col gap-3 w-full'}>
                                            <div className="flex flex-col">
                                                <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>Choose a date and time for the meeting</div>
                                                <div className="text-neutral-400">Time zone: GMT+2</div>
                                            </div>
                                        </div>
                                    </div>
                                    <DayPicker setDate={setDate} setHour={setHour} date={date} hour={hour} />
                                </div>
                                <div className="flex gap-x-8 gap-y-4 text-white w-full flex-wrap justify-center self-end py-6">
                                    <button type="button" onClick={closeVideoCallForm} className={`btn-primary flex max-w-[240px] items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>
                                        <span>Close</span>
                                    </button>                    
                                    
                                    <button 
                                        type="button"
                                        onClick={() => setFormStep(FORM_STEPS.CONTACT_INFO)}
                                        disabled={!date || !hour}
                                        className={`btn-primary flex max-w-[240px] items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full disabled:pointer-events-none`}>
                                        <span>Next Step</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                            )
                        }
                        {
                            formStep === FORM_STEPS.CONTACT_INFO && (
                                <>
                                    <div className="flex flex-col gap-5">
                                        <button type="button" onClick={() => setFormStep(FORM_STEPS.DATE_PICKER)} className="py-1 px-3 pr-5 rounded-full border border-zinc-300 flex items-center w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M15 6l-6 6l6 6"></path>
                                            </svg>
                                            <span>Choose the date again</span>
                                        </button>
                                        <span className="text-sm text-zinc-500">Selected: {date.toLocaleDateString()} - {hour}</span>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-1 w-10">
                                                <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>02</div>
                                            </div>
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>Full name</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={full_name} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Enter your full name'} onChange={(e) => setFullName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-1 w-10">
                                                <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>03</div>
                                            </div>
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>Contact e-mail</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={email} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'email'} placeholder={'Enter your e-mail'} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="mt-1 w-10">
                                                <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>04</div>
                                            </div>
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>Meet description</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={description} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Enter a brief description or subject'} onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-8 gap-y-4 text-white w-full flex-wrap justify-center py-6">
                                        <button type={'button'} onClick={closeVideoCallForm} className={`btn-primary max-w-[240px] flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                            </svg>
                                            <span>Close</span>
                                        </button>                    
                                        
                                        <button type={'submit'} className={`btn-primary max-w-[240px] flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                                            <span>Send</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </button>
                                        
                                    </div>
                                </>
                            )
                        }
                        
                    </form>
                </motion.div>
            </motion.div>   
        </>
    )
}

function FormComponent() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });

    /* Project form values */
    // 1ST FORM - Project type
    const [ type, setType ] = useState('');
    // Estimated budget
    const [ budget, setBudget ] = useState({});
    // Tell us more
    const company_name = useRef('');
    const full_name = useRef('');
    const email = useRef('');
    const description = useRef('');

    // 2ND FORM
    // What type of business does the client have?
    const [ business_type, setBusinessType ] = useState('');
    // What is the company's vision and mission?
    const [ company_vision, setCompanyVision ] = useState([]);
    // Who is the target audience for the company?
    const [ target_audience, setTargetAudience ] = useState([]);
    // What services or products does the company offer?
    const [ service_or_product, setServiceOrProduct ] = useState('');
    // What is the expected delivery timeline?
    const [ expected_deilvertime, setExpectedDeliverTime ] = useState({ from: null, to: null });
    
    // 3RD FORM -  What functionalities should the web have?
    const [ functionalities, setFunctionalities ] = useState([]);
    // Are e-commerce functionalities needed on the web?
    const [ ecommerce_funtionabilites, setEcommerceFunc ] = useState(false);
    // Does the client have any content (text, images, videos) to include on the web?
    const [ content_to_include, setContentToInclude ] = useState(false);
    // What programming language and technologies are preferred for development?
    const [ preferred_technologies, setPreferredTechnologies ] = useState([]);
    // Who will be responsible for managing the web once the project is completed?
    const [ responsible_for_managing, setResponsibleForManaging ] = useState('');
    // What is the client's marketing and positioning strategy?
    const [ marketing_strategy, setMarketingStrategy ] = useState([]);
    // Are there competitor websites that should be taken into account as references?
    const [ competitor_websites, setCompetitorWebsites ] = useState(false);
    const [ competitor_websites_examples, setCompetitorWebsitesExamples ] = useState("");
    // Legal
    const legalTerms = useRef(null);

    // 
    function setMultiOptionState(state, setter, value) {
        if(state.indexOf(value) > -1) {
            const newState = state.filter(f => f != value);
            setter(newState);
        } else {
            setter(current => current.concat([value]));
        }
    }

    // Reset form fields on submit
    function resetForm() {
        setType('');
        setBudget({})
        company_name.current.value = '';
        full_name.current.value = '';
        email.current.value = '';
        description.current.value = '';
        // 
        setBusinessType('');
        setCompanyVision([]);
        setTargetAudience([]);
        setServiceOrProduct('');
        setExpectedDeliverTime({ from: null, to: null });
        // 
        setFunctionalities([]);
        setEcommerceFunc(false);
        setContentToInclude(false);
        setPreferredTechnologies([]);
        setResponsibleForManaging('');
        setMarketingStrategy([]);
        setCompetitorWebsites(false);
        setCompetitorWebsitesExamples("")
        // 
        setStep(1);
    }

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        document.getElementById("quote-project-form").scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // If fields are void then return
        if([type, company_name.current.value, full_name.current.value, email.current.value, business_type, company_vision, target_audience, service_or_product, ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }

        if(expected_deilvertime.from == null) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }

        if(functionalities.length == 0 && functionalities_other == '') {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }

        if (!legalTerms.current.checked) {
            showMessage(true, 'You must accept the legal terms before submitting the form', 5000)
            return;
        }
        
        // Project object
        const project = { 
            website_type: type, 
            contact_information: { 
                company_name: company_name.current.value, 
                full_name: full_name.current.value, 
                email: email.current.value
            },
            description: description.current.value,
            company_info: {
                business_type,
                company_vision,
                target_audience,
                service_or_product,
                expected_deilvertime
            },
            project_info: {
                functionalities,
                ecommerce_funtionabilites,
                content_to_include,
                preferred_technologies,
                responsible_for_managing,
                marketing_strategy,
                competitor_websites,
                competitor_websites_examples
            },
            // budget
        }
        // Send project to server
        try {
            await axios.post('/api/sendProject', { project })    
            showMessage(false, 'Information sent successfully!', 5000)
            resetForm();   
        } catch (error) {
            showMessage(true, 'There was an error sending the information', 5000)
        }
    }

    // Form steps
    const [ step, setStep ] = useState(1);

    function handleNextStep() {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value)) {
            showMessage(true, 'Escribe un email válido.', 5000)
            return;
        }
        if(step == 1 && ([type, full_name.current.value, email.current.value].includes('') || target_audience.length == 0 || expected_deilvertime.from == null)) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }
        if(step == 2 && [business_type, company_vision, service_or_product].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }
        if(step == 3 && [ecommerce_funtionabilites, content_to_include, preferred_technologies, responsible_for_managing, marketing_strategy, competitor_websites].includes('')) {
            showMessage(true, 'You must complete all fields.', 5000)
            return;
        }
        if(step < 4) {
            // If type, fullname, email and phone are void return
            setStep(current => current + 1);
            document.getElementById("quote-project-form").scrollIntoView({ behavior: 'smooth' });
            setMessage({ error: false, text: '' })
        }
    }

    function handlePrevStep() {
        if(step > 1) {
            setStep(current => current - 1);
            document.getElementById("quote-project-form").scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            { message.text && (
                <div className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
            )}
            <section id="step1" className={`flex flex-col gap-6 ${step == 1 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"Contact information"}  
                    classes={``}
                    step={'01'}
                >
                    <div className="flex flex-col gap-2">
                        <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                            <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Name of the company or project'} ref={company_name} />
                        </div>
                        <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                            <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Full name'} ref={full_name} />
                        </div>
                        <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                            <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'email'} placeholder={'Your e-mail'} ref={email} />
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"What type of project?"} 
                    classes={``}
                    step={'02'}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2">
                        <div onClick={() => setType('website')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'website' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'website' && 'bg-black text-white'}`}`}>
                            <span>Website</span>
                        </div>
                        <div onClick={() => setType('ecommerce')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'ecommerce' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'ecommerce' && 'bg-black text-white'}`}`}>
                            <span>E-Commerce</span>
                        </div>
                        <div onClick={() => setType('app')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${type === 'app' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${type === 'app' && 'bg-black text-white'}`}`}>
                            <span>App</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"What is the expected delivery timeline?"} 
                    step={'03'}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setExpectedDeliverTime({ from: 0, to: 1 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 0 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 0 && 'bg-black text-white'}`}`}>
                            <span>{"< 1 month"}</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 1, to: 3 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 1 && 'bg-black text-white'}`}`}>
                            <span>1 - 3 months</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 3, to: 6 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 3 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 3 && 'bg-black text-white'}`}`}>
                            <span>3 - 6 months</span>
                        </div>
                        <div onClick={() => setExpectedDeliverTime({ from: 6, to: 0 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${expected_deilvertime.from == 6 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${expected_deilvertime.from == 6 && 'bg-black text-white'}`}`}>
                            <span>{"> 6 months"}</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setExpectedDeliverTime(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"Who is the target audience for the company?"} 
                    step={'04'}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "children")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("children") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("children") > -1 && 'bg-black text-white'}`}`}>
                            <span>Children</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "teenagers")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("teenagers") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("teenagers") > -1 && 'bg-black text-white'}`}`}>
                            <span>Teenagers</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "young-adults")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("young-adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("young-adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Young adults</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "adults")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("adults") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("adults") > -1 && 'bg-black text-white'}`}`}>
                            <span>Adults</span>
                        </div>
                        <div onClick={() => setMultiOptionState(target_audience, setTargetAudience, "seniors")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${target_audience.indexOf("seniors") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${target_audience.indexOf("seniors") > -1 && 'bg-black text-white'}`}`}>
                            <span>Seniors</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setTargetAudience([e.target.value])} />
                    </div>
                </Section>
                {/* <Section 
                    title={"What is your estimated budget for the project?"} 
                    subtitle={"Budget expressed in USD"}  
                    classes={``}
                    step={'04'}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 items-center gap-2">
                        <div onClick={() => setBudget({ from: 1, to: 5000 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 1 && 'bg-black text-white'}`}`}>
                            <span>{'< 5K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 5000, to: 10000 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 5000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 5000 && 'bg-black text-white'}`}`}>
                            <span>{'5K - 10K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 10000, to: 20000 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 10000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 10000 && 'bg-black text-white'}`}`}>
                            <span>{'10K - 20K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 20000, to: 30000 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 20000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 20000 && 'bg-black text-white'}`}`}>
                            <span>{'20K - 30K'}</span>
                        </div>
                        <div onClick={() => setBudget({ from: 30000, to: 100000 })} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${budget.from === 30000 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${budget.from === 30000 && 'bg-black text-white'}`}`}>
                            <span>{'> 30K'}</span>
                        </div>
                    </div>
                </Section> */}
            </section>
            <section id="step2" className={`flex flex-col gap-6 ${step == 2 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"What type of business does the client have?"} 
                    step={'05'}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 pb-3">
                        <div onClick={() => setBusinessType('retail')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'retail' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'retail' && 'bg-black text-white'}`}`}>
                            <span>Retail</span>
                        </div>
                        <div onClick={() => setBusinessType('service')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'service' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'service' && 'bg-black text-white'}`}`}>
                            <span>Service</span>
                        </div>
                        <div onClick={() => setBusinessType('manufacturing')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${business_type === 'manufacturing' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${business_type === 'manufacturing' && 'bg-black text-white'}`}`}>
                            <span>Manufacturing</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setBusinessType(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"What is the company's vision and mission?"} 
                    step={'06'}
                >
                    <div className="grid grid-cols-1 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "increase-profitability")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("increase-profitability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("increase-profitability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Increase profitability</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "enhance-customer-satisfaction")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("enhance-customer-satisfaction") > -1 && 'bg-black text-white'}`}`}>
                            <span>Enhance customer satisfaction</span>
                        </div>
                        <div onClick={() => setMultiOptionState(company_vision, setCompanyVision, "promote-sustainability")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${company_vision.indexOf("promote-sustainability") > -1 && 'bg-black text-white'}`}`}>
                            <span>Promote sustainability</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setCompanyVision([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"What does the company offer?"} 
                    step={'07'}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setServiceOrProduct('products')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'products' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'products' && 'bg-black text-white'}`}`}>
                            <span>Products</span>
                        </div>
                        <div onClick={() => setServiceOrProduct('services')} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${service_or_product === 'services' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${service_or_product === 'services' && 'bg-black text-white'}`}`}>
                            <span>Services</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setServiceOrProduct(e.target.value)} />
                    </div>
                </Section>
            </section>
            <section id="step3" className={`flex flex-col gap-6 ${step == 3 || step == 4 ? 'block' : 'hidden'}`}>
                <Section 
                    title={"What functionalities should the web have?"}
                    step={'08'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "contact-form")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("contact-form") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("contact-form") > -1 && 'bg-black text-white'}`}`}>
                            <span>Contact form</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "image-gallery")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("image-gallery") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("image-gallery") > -1 && 'bg-black text-white'}`}`}>
                            <span>Image gallery</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "blog-section")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("blog-section") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("blog-section") > -1 && 'bg-black text-white'}`}`}>
                            <span>Blog section</span>
                        </div>
                        <div onClick={() => setMultiOptionState(functionalities, setFunctionalities, "social-media-integration")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${functionalities.indexOf("social-media-integration") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${functionalities.indexOf("social-media-integration") > -1 && 'bg-black text-white'}`}`}>
                            <span>Social media integration</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setFunctionalities([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Are e-commerce functionalities needed on the web?"} 
                    step={'09'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setEcommerceFunc(true)} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>Yes</span>
                        </div>
                        <div onClick={() => setEcommerceFunc(false)} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!ecommerce_funtionabilites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!ecommerce_funtionabilites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                </Section>
                <Section 
                    title={"What programming language and technologies are preferred for development?"} 
                    step={'10'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "React")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("React") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("React") > -1 && 'bg-black text-white'}`}`}>
                            <span>React</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Next.js")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Next.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Next.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Next.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Vite.js")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Vite.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Vite.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Vite.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Angular")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Angular") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Angular") > -1 && 'bg-black text-white'}`}`}>
                            <span>Angular</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Tailwind")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Tailwind") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Tailwind") > -1 && 'bg-black text-white'}`}`}>
                            <span>Tailwind</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Node.js")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Node.js") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Node.js") > -1 && 'bg-black text-white'}`}`}>
                            <span>Node.js</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "Express")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("Express") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("Express") > -1 && 'bg-black text-white'}`}`}>
                            <span>Express</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "MongoDB")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("MongoDB") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("MongoDB") > -1 && 'bg-black text-white'}`}`}>
                            <span>MongoDB</span>
                        </div>
                        <div onClick={() => setMultiOptionState(preferred_technologies, setPreferredTechnologies, "MySQL")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${preferred_technologies.indexOf("MySQL") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${preferred_technologies.indexOf("MySQL") > -1 && 'bg-black text-white'}`}`}>
                            <span>MySQL</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setPreferredTechnologies([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Who will be responsible for managing the web once the project is completed?"} 
                    step={'11'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setResponsibleForManaging("client")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'client' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'client' && 'bg-black text-white'}`}`}>
                            <span>The client</span>
                        </div>
                        <div onClick={() => setResponsibleForManaging("developer")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${responsible_for_managing == 'developer' && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${responsible_for_managing == 'developer' && 'bg-black text-white'}`}`}>
                            <span>The developer</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setResponsibleForManaging(e.target.value)} />
                    </div>
                </Section>
                <Section 
                    title={"What is the client's marketing and positioning strategy?"} 
                    step={'12'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "social-media")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("social-media") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("social-media") > -1 && 'bg-black text-white'}`}`}>
                            <span>Social media</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "email-marketing")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("email-marketing") > -1 && 'bg-black text-white'}`}`}>
                            <span>E-mail marketing</span>
                        </div>
                        <div onClick={() => setMultiOptionState(marketing_strategy, setMarketingStrategy, "SEO")} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${marketing_strategy.indexOf("SEO") > -1 && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${marketing_strategy.indexOf("SEO") > -1 && 'bg-black text-white'}`}`}>
                            <span>SEO</span>
                        </div>
                    </div>
                    <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                        <input className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={'Other (please specify)'} onChange={(e) => setMarketingStrategy([e.target.value])} />
                    </div>
                </Section>
                <Section 
                    title={"Are there any competing websites that should be considered as references?"} 
                    step={'13'} 
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 pb-3">
                        <div onClick={() => setCompetitorWebsites(true)} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${competitor_websites && 'bg-black text-white'}`}`}>
                            <span>Yes</span>
                        </div>
                        <div onClick={() => setCompetitorWebsites(false)} className={`grid place-content-center border ${darkMode ? "border-white" : "border-neutral-800"} rounded-full py-1 px-5 transition-colors cursor-pointer whitespace-nowrap ${darkMode ? `hover:bg-white hover:text-black ${!competitor_websites && 'bg-white text-black'}` : `hover:bg-black hover:text-white ${!competitor_websites && 'bg-black text-white'}`}`}>
                            <span>No</span>
                        </div>
                    </div>
                    {competitor_websites && (
                        <textarea rows="7" placeholder="Enter the different URLs separated by comma. Example: 'exampleurl.com, anotherexampleurl.dev, anotherone.com'" value={competitor_websites_examples} onChange={(e) => setCompetitorWebsitesExamples(e.target.value)} className={`rounded-md outline-none resize-none w-full p-2 bg-transparent border ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'} ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}></textarea>
                    )}
                </Section>
                <Section 
                    title={"Tell us more about your project"} 
                    classes={``}
                    step={'14'}
                >
                    <textarea rows="7" placeholder="Description" ref={description} className={`rounded-md outline-none resize-none w-full p-2 bg-transparent border ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'} ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}></textarea>
                </Section>
                <div className={"flex gap-2 select-none"}>
                    <div className="w-10 hidden xl:block"></div>
                    <div className={"flex items-start gap-2"}>
                        <div className="form-control">
                            <input ref={legalTerms} id={"legal"} type="checkbox" className="accent-primary w-5 h-5" />
                        </div>
                        <label htmlFor={"legal"}>By submitting this form I agree to the <Link className={"link"} href={"/datenschutz"}>privacy policy</Link> and <Link className={"link"} href={"/impressum"}>legal terms</Link>.</label>
                    </div>
                </div>
            </section>
            <div className="flex gap-2">
                <div className="w-10 hidden xl:block"></div>
                <div className="flex items-center gap-2 text-white w-full">
                    <button type={'button'} onClick={handlePrevStep} className={`btn-primary ${step == 1 ? 'hidden' : 'block'} flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Back</span>
                    </button>
                    <button type={step == 4 ? 'submit' : 'button'} onClick={handleNextStep} className={`btn-primary flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                        <span>{step < 3 ? 'Next' : 'Submit'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

function Section({title, subtitle, children, classes, step}) {
    
    const { darkMode } = useContextProvider();

    return (
        <div className="flex items-start gap-2">
            <div className="mt-1 w-10 hidden xl:block">
                <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>{step}</div>
            </div>
            <div className={`flex flex-col gap-3 ${classes} w-full`}>
                <div className="flex gap-2 items-center">
                    <div className="w-10 xl:hidden">
                        <div className={`px-2 rounded-full border text-sm font-medium ${darkMode ? 'text-neutral-600 border-neutral-600' : 'text-neutral-500 border-neutral-500'} w-9 text-center`}>{step}</div>
                    </div>
                    <div className="flex flex-col">
                        <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>{title}</div>
                        { subtitle && <div className="text-neutral-400">{subtitle}</div> }
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

function Input({ props }) {

    const { placeholder, ref, type, name, required } = props;

    const { darkMode } = useContextProvider();

    return (
        <div className={`flex items-center gap-2 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
            { required ? (
                <>
                    <div className="text-red-500">*</div>
                    <input className={`bg-transparent outline-none pb-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} ref={ref} type={type} placeholder={placeholder} name={name} />
                </>
            ) : (
                <input className={`bg-transparent outline-none pb-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} ref={ref} type={type} placeholder={placeholder} name={name} />
            )}
        </div>
    )
}