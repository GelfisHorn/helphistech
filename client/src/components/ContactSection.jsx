
import axios from "axios";
// React
import { useState } from "react";
// Nextjs
import { useRouter } from "next/router";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Notifications
import { ToastContainer } from "react-toastify";
import showToast from "@/hooks/showToast";
// Langs
import LANG from "@/lang/components/ContactSection";
// Animations
import { motion } from "framer-motion";

export default function ContactSection({ fromPage }) {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ description, setDescription ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const fieldsValid = handleValidateFields();
        if (!fieldsValid) {
            return;
        }
        Promise.all([
            axios.post('/api/contact/contactForm/sendMail', { fromPage, name, email, phoneNumber, description }),
            axios.post('/api/services/sendMail/client', { name, email, lang: "de" })
        ]).then(res => {
            router.push('/confirmation')
            return;
            // showToast(LANG["de"].notifications.success, "success")
        }).catch(err => {
            return;
            // showToast(LANG["de"].notifications.error.catch, "error")
        }).finally(() => {
            resetForm();
        });
    }

    function handleValidateFields() {
        if([name, email, phoneNumber, description].includes("")) {
            return false;
        }
        if(isNaN(Number(phoneNumber))) {
            return false;
        }
        return true;
    }

    function resetForm() {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setDescription("");
    }

    return (
        <section>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 py-20 sm:py-28 max-w-6xl mx-auto px-6 sm:px-10 overflow-hidden`}>
                <div className={"flex flex-col gap-8"}>
                    <div className={"flex flex-col items-center lg:items-start text-center lg:text-left gap-3"}>
                        <motion.div 
                            className={"font-semibold uppercase text-lg text-primary"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: .2, origin: 1 }}
                        >Kontaktiere uns</motion.div>
                        <div className={"text-3xl font-semibold"}>Mehr Umsatz durch eine beeindruckende Online-Präsenz!</div>
                        <p className={"text-lg"}>Gemeinsam zu großartigen Lösungen finden</p>
                    </div>
                    <motion.div
                        className={"flex flex-col gap-5"}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >
                        <a href={"mailto:info@helphistech.com"} className={"w-fit flex items-center gap-3 hover:text-primary transition-colors"}>
                            <div className={"grid place-content-center w-12 h-12 border-2 rounded-full border-primary text-primary text-xl"}><i className="fa-solid fa-envelope"></i></div>
                            <div className={"text-lg"}>info@helphistech.com</div>
                        </a>
                        <a href={"tel:++4915679303700"} className={"w-fit flex items-center gap-3 hover:text-primary transition-colors"}>
                            <div className={"grid place-content-center w-12 h-12 border-2 rounded-full border-primary text-primary text-lg"}><i className="fa-solid fa-phone"></i></div>
                            <div className={"text-lg"}>+49 151 2077952</div>
                        </a>
                    </motion.div>
                </div>
                <div>
                    <form className={"flex flex-col gap-3"} onSubmit={handleSubmit}>
                        <input value={name} onChange={e => setName(e.target.value)} className={`p-3 border-2 ${darkMode ? "border-neutral-800" : "border-neutral-200"} rounded-md focus:border-primary transition-colors bg-transparent outline-none`} type="text" placeholder={"Name"} />
                        <input value={email} onChange={e => setEmail(e.target.value)} className={`p-3 border-2 ${darkMode ? "border-neutral-800" : "border-neutral-200"} rounded-md focus:border-primary transition-colors bg-transparent outline-none`} type="email" placeholder={"E-Mail"} />
                        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className={`p-3 border-2 ${darkMode ? "border-neutral-800" : "border-neutral-200"} rounded-md focus:border-primary transition-colors bg-transparent outline-none`} type="tel" placeholder={"Telefonnummer"} />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className={`p-3 border-2 ${darkMode ? "border-neutral-800" : "border-neutral-200"} rounded-md resize-none focus:border-primary transition-colors bg-transparent outline-none`} name="" id="" rows="5" placeholder={"Worum geht es in Ihrem Projekt?"}></textarea>
                        <motion.button 
                            className={"bg-primary hover:bg-primary-2 transition-colors py-3 rounded-md text-white w-full"} 
                            type={"submit"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >Einreichen</motion.button>
                    </form>
                </div>
            </div>
        </section>
    )
}