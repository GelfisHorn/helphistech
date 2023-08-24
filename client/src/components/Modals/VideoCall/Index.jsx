import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
import DayPicker from "@/components/contact/DayPicker";
// Language
import lang from '../../../lang/components/Modals/VideoCall/Index.json'
import Modal from "@/components/Modal/Index";

export default function VideoCallModal({ closeVideoCallForm, language }) {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    // toggles overflow while rendered
    useEffect(() => {
        document.body.classList.add("body-in-modal-open")
        return () =>
            document.body.classList.remove("body-in-modal-open")
    }, [])

    const FORM_STEPS = {
        DATE_PICKER: 1,
        CONTACT_INFO: 2
    }
    //step and send controller
    const [formStep, setFormStep] = useState(FORM_STEPS.DATE_PICKER)
    // on submit show message
    const [message, setMessage] = useState({ error: false, text: '' });

    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [description, setDescription] = useState('');

    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if ([full_name, email, date, hour, description].includes('')) {
            showMessage(true, 'Todos los campos son obligatorios', 5000)
            return;
        }

        try {
            await axios.post('/api/sendVideoCall', { full_name, email, date, hour, description });
            showMessage(false, 'Se agendó tu videollamada correctamente', 5000);
            setTimeout(closeVideoCallForm, 1500)
            router.push('/confirmation');
        } catch (error) {
            showMessage(true, 'Hubo un error al agendar tu videollamada', 5000);
        }
    }

    return (
        <Modal handleClose={closeVideoCallForm} classes={"p-5 m-4 w-full sm:w-[550px]"}>
            <motion.div exit={{ opacity: 0 }} className={"h-full w-full"}>
                <div className={"flex justify-end"}>
                    <button onClick={closeVideoCallForm} className={"hover:text-primary"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}
                    onClick={closeVideoCallForm}
                ></motion.div>
                <motion.div
                    initial={{ x: -30 }}
                    animate={{ x: 0 }}
                    exit={{ x: -30 }}
                    transition={{ type: "spring", bounce: 0, duration: .3 }}
                >
                    <form className="flex flex-col justify-between gap-5 relative h-full" onSubmit={handleSubmit}>
                        <AnimatePresence>
                            {message.text && (
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
                                <div className={"flex flex-col gap-10"}>
                                    <div className="flex flex-col gap-5 text-center sm:text-left">
                                        <div className="flex items-start gap-2">
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl pr-7 ${darkMode ? 'text-zinc-300' : 'text-black'}`}>{lang[language].title}</div>
                                                    <div className="text-neutral-400">{lang[language].timezone}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <DayPicker setDate={setDate} setHour={setHour} date={date} hour={hour} />
                                    </div>
                                    <div className="flex items-center gap-4 text-white w-full justify-center pb-5">
                                        <button
                                            type="button"
                                            onClick={() => setFormStep(FORM_STEPS.CONTACT_INFO)}
                                            disabled={!date || !hour}
                                            className={`w-full btn-primary flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-md uppercase text-center cursor-pointer disabled:pointer-events-none`}>
                                            <span>{lang[language].next}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            formStep === FORM_STEPS.CONTACT_INFO && (
                                <div className={"flex flex-col gap-10"}>
                                    <div className="flex flex-col gap-5">
                                        <button type="button" onClick={() => setFormStep(FORM_STEPS.DATE_PICKER)} className="py-1 px-3 pr-5 rounded-full border border-zinc-300 flex items-center w-fit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M15 6l-6 6l6 6"></path>
                                            </svg>
                                            <span>{lang[language].stepBack}</span>
                                        </button>
                                        <span className="text-sm text-zinc-500">{lang[language].selected} {date.toLocaleDateString()} - {hour}</span>
                                        <div className="flex items-start gap-2">
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>{lang[language].fullName.label}</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={full_name} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={lang[language].fullName.placeholder} onChange={(e) => setFullName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>{lang[language].email.label}</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={email} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'email'} placeholder={lang[language].email.placeholder} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className={'flex flex-col gap-3 w-full'}>
                                                <div className="flex flex-col">
                                                    <div className={`text-xl font-light ${darkMode ? 'text-zinc-300' : 'text-black'}`}>{lang[language].meeting.label}</div>
                                                </div>
                                                <div className={`flex items-center border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-800'}`}>
                                                    <input value={description} className={`bg-transparent outline-none py-2 w-full ${darkMode ? 'placeholder:text-neutral-500' : 'placeholder:text-neutral-400'}`} type={'text'} placeholder={lang[language].meeting.placeholder} onChange={(e) => setDescription(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-white w-full justify-center">
                                        <button type={'submit'} className={`btn-primary flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-md uppercase text-center cursor-pointer w-full`}>
                                            <span>{lang[language].submit}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                    </form>
                </motion.div>
            </motion.div>
        </Modal>
    )
}