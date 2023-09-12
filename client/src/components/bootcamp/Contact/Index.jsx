import { useRef, useState } from "react";
// Nextjs
import Link from "next/link";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion } from "framer-motion";
// Notifications
import { toast } from "react-hot-toast";
import axios from "axios";

const COUNTRIES = {
    AR: "Argentina",
    BO: "Bolivia",
    CL: "Chile",
    CO: "Colombia",
    EC: "Ecuador",
    ES: "España",
    MX: "Mexico",
    PY: "Paraguay",
    UY: "Uruguay",
    VE: "Venezuela"
}

const GENDER = {
    male: "Hombre",
    female: "Mujer",
}

const BOOTCAMP = {
    basic: "Desarrollo web básico",
    middle: "Desarrollo web medio",
    advanced: "Desarrollo web avanzado",
    complete: "Bootcamp completo"
}

export default function BootcampContact() {

    const { darkMode } = useContextProvider();

    const [ name, setName ] = useState("");
    const [ surname, setSurname ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ age, setAge ] = useState("");
    const [ howYouKnowUs, setHowYouKnowUs ] = useState("");
    const [ gender, setGender ] = useState("");
    const [ bootcamp, setBootcamp ] = useState("");
    const [ schedule, setSchedule ] = useState("");
    const [ motivation, setMotivation ] = useState("");
    const legalCheckbox = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        const isFormValid = validateForm();
        if(!isFormValid) return;

        Promise.all([
            axios.post('/api/bootcamp/helphistech', { name, surname, country: COUNTRIES[country], phoneNumber, email, age, howYouKnowUs, gender: GENDER[gender], bootcamp: BOOTCAMP[bootcamp], schedule, motivation }),
            axios.post('/api/bootcamp/client', { email })
        ]).then(res => {
            toast.success("Hemos recibido tu petición, Gracias!");
        }).catch(err => {
            toast.error("Hubo un error al recibir tu petición");
        }).finally(() => {
            resetForm();
        })
    }

    function validateForm() {
        if([name, surname, country, phoneNumber, email, age, howYouKnowUs, gender, bootcamp, schedule, motivation].includes("")) {
            toast.error("Debes completar todos los campos");
            return false;
        }
        if(!legalCheckbox.current.checked) {
            toast.error("Debes aceptar los términos legales");
            return false;
        }
        if(motivation.length < 250) {
            toast.error("La carta de motivación debe ser más larga");
            return false;
        }

        return true;
    }

    function resetForm() {
        setName("")
        setSurname("")
        setCountry("")
        setPhoneNumber("")
        setEmail("")
        setAge("")
        setHowYouKnowUs("")
        setGender("")
        setBootcamp("")
        setSchedule("")
        setMotivation("")
        legalCheckbox.current.checked = false;
    }

    return(
        <section id={"contact"} className={"flex flex-col gap-20 py-28"}>
            <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                <div className={"flex flex-col gap-5"}>
                    <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Contactanos</div>
                    <motion.h2
                        className={"text-3xl sm:text-5xl font-bold"}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >Explora el mundo del desarrollo web</motion.h2>
                </div>
                <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Encuentre grandes soluciones juntos</p>
            </div>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-5 max-w-3xl mx-auto`}> {/* p-12 ${darkMode ? "bg-[#0e0e0e]" : "bg-[#f3f3f3]"} rounded-xl */}
                <div className={"grid grid-cols-2 gap-5"}>
                    <TextField type={"text"} label={"Nombre"} placeholder={"Escribe tu nombre"} state={{ get: name, set: setName }} />
                    <TextField type={"text"} label={"Apellidos"} placeholder={"Escribe tus apellidos"} state={{ get: surname, set: setSurname }} />
                    <div>
                        <label className={"block"}>{"País"}<span className={"text-red-500"}>*</span></label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} className={`${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-neutral-300"} py-2 px-3 border rounded-md w-full outline-none`}>
                            <option value="">Selecciona un país</option>
                            <option value="AR">Argentina</option>
                            <option value="BO">Bolivia</option>
                            <option value="CL">Chile</option>
                            <option value="CO">Colombia</option>
                            <option value="EC">Ecuador</option>
                            <option value="ES">España</option>
                            <option value="MX">Mexico</option>
                            <option value="PY">Paraguay</option>
                            <option value="UY">Uruguay</option>
                            <option value="VE">Venezuela</option>
                        </select>
                    </div>
                    <TextField type={"tel"} label={"Teléfono"} placeholder={"Escribe tu número de teléfono"} state={{ get: phoneNumber, set: setPhoneNumber }} />
                    <TextField type={"email"} label={"Email"} placeholder={"Escribe tu email"} state={{ get: email, set: setEmail }} />
                    <TextField type={"number"} label={"Edad"} placeholder={"Escribe tu edad"} state={{ get: age, set: setAge }} />
                    <div>
                        <label className={"block"}>{"¿Cómo nos has conocido?"}<span className={"text-red-500"}>*</span></label>
                        <select value={howYouKnowUs} onChange={(e) => setHowYouKnowUs(e.target.value)} className={`${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-neutral-300"} py-2 px-3 border rounded-md w-full outline-none`}>
                            <option value="">Seleccionar</option>
                            <option value="Google SEO">Google SEO</option>
                            <option value="Linkedin">Linkedin</option>
                            <option value="Anuncio">Anuncio</option>
                        </select>
                    </div>
                    <div>
                        <label className={"block"}>{"Sexo"}<span className={"text-red-500"}>*</span></label>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="male" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                            <label for="male">Hombre</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="female" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                            <label for="female">Mujer</label>
                        </div>
                    </div>
                    <div>
                        <label className={"block"}>{"¿Qué curso quieres hacer?"}<span className={"text-red-500"}>*</span></label>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="basic" name="bootcamp" value="basic" onChange={(e) => setBootcamp(e.target.value)} />
                            <label for="basic">Desarrollo web básico</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="middle" name="bootcamp" value="middle" onChange={(e) => setBootcamp(e.target.value)} />
                            <label for="middle">Desarrollo web Medio</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="advanced" name="bootcamp" value="advanced" onChange={(e) => setBootcamp(e.target.value)} />
                            <label for="advanced">Desarrollo web Avanzado</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="complete" name="bootcamp" value="complete" onChange={(e) => setBootcamp(e.target.value)} />
                            <label for="complete">Bootcamp Completo</label>
                        </div>
                    </div>
                    <div>
                        <label className={"block"}>{"Horario"}<span className={"text-red-500"}>*</span></label>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="fulltime" name="schedule" value="Full-Time" onChange={(e) => setSchedule(e.target.value)} />
                            <label for="fulltime">Full-time</label>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <input type="radio" id="parttime" name="schedule" value="Part-Time" onChange={(e) => setSchedule(e.target.value)} />
                            <label for="parttime">Part-time</label>
                        </div>
                    </div>
                    <div className={"col-start-1 col-end-3"}>
                        <label className={"block"}>{"Explica tus motivaciones para hacer este bootcamp"}<span className={"text-red-500"}>*</span></label>
                        <span className={"text-xs text-red-500"}>Mínimo 250 caracteres (se valorará para en el proceso)</span>
                        <textarea value={motivation} onChange={(e) => setMotivation(e.target.value)} placeholder={"Escribe tus motivaciones"} cols={"20"} rows="3" className={`min-h-[5rem] max-h-[15rem] ${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-neutral-300"} py-2 px-3 border rounded-md w-full outline-none`}></textarea>
                    </div>
                    <label className={"flex items-center gap-1"}>
                        <input ref={legalCheckbox} type="checkbox" id="cbox1" value="legal" />
                        Acepto la <Link href={"/datenschutz"} className={"text-primary underline hover:text-primary-2 transition-colors"}>Protección de datos</Link>
                    </label>
                </div>
                <button type={"submit"} className={"py-3 px-10 bg-primary hover:bg-primary-2 transition-colors w-fit rounded-md text-white"}>Enviar</button>
            </form>
        </section>
    )
}

function TextField({ state, label, placeholder, type }) {

    const { darkMode } = useContextProvider();

    return (
        <div>
            <label htmlFor={label} className={"block"}>{label}<span className={"text-red-500"}>*</span></label>
            <input value={state.get} onChange={e => state.set(e.target.value)} type={type} id={label} placeholder={placeholder} className={`${darkMode ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-neutral-300"} py-2 px-3 border rounded-md w-full outline-none`} />
        </div>
    )
}