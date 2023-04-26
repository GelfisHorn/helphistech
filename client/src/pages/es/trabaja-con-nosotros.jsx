import { useRef, useState } from "react";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function WorkWithUsPage() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    // Form values
    const full_name = useRef();
    const email = useRef();
    const portfolio = useRef();
    const github = useRef();
    const description = useRef();

    // On user submit form show a message
    const [ message, setMessage ] = useState({ error: false, text: '' });
    function showMessage(error, text, timeout) {
        setMessage({ error, text })
        document.getElementById("form").scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            setMessage({ error: false, text: '' })
        }, timeout)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([full_name.current.value, email.current.value, portfolio.current.value, github.current.value].includes('')) {
            showMessage(true, 'Todos los campos son obligatorios', 5000);
            return;
        }

        // On submit
        try {
            showMessage(false, 'Los datos se enviaron correctamente', 5000);
            resetForm();
            console.log('submitting')
        } catch (error) {
            console.log(error);
        }
    }

    // Reset form fields on submit
    function resetForm() {
        full_name.current.value = '';
        email.current.value = '';
        portfolio.current.value = '';
        github.current.value = '';
        description.current.value = '';
    }

    return (
        <Layout 
            title={"Trabaja con nosotros"} 
            metaDesc={"Únete a nuestra empresa líder en desarrollo web y contribuye a la transformación digital de nuestros clientes. Descubre oportunidades de crecimiento y desarrollo profesional. ¡Únete a nuestro equipo y crea soluciones innovadoras para nuestros clientes!"} 
            lang={'es'}
        >
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-[4.5rem]">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Trabaja con nosotros</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">Únete a nuestro equipo de desarrollo web y ayuda a crear soluciones innovadoras para nuestros clientes. Descubre las oportunidades de crecimiento y desarrollo profesional en una empresa líder en servicios de desarrollo web. ¡Trabaja con nosotros y contribuye a la transformación digital de nuestros clientes!</p>
                                    </div>
                                </div>
                            </div>
                            <form className={`flex flex-col gap-6 py-2`} id="form">
                                { message.text && (
                                    <div className={`${message.error ? 'bg-red-500' : 'bg-primary'} py-2 w-full text-white uppercase font-semibold text-center rounded-md`}>{message.text}</div>
                                )}
                                <Section 
                                    title={"Nombre completo"} 
                                    classes={``}
                                    step={'01'}
                                >
                                    <Input props={{
                                        placeholder: 'Escribe tu nombre', 
                                        ref: full_name, 
                                        type: 'text', 
                                        required: false
                                    }} />
                                </Section>
                                <Section 
                                    title={"Correo electrónico"} 
                                    classes={``}
                                    step={'02'}
                                >
                                    <Input props={{
                                        placeholder: 'Escribe tu e-mail', 
                                        ref: email, 
                                        type: 'email', 
                                        required: false
                                    }} />
                                </Section>
                                <Section 
                                    title={"Portafolio"} 
                                    classes={``}
                                    step={'03'}
                                >
                                    <Input props={{
                                        placeholder: 'Portafolio URL', 
                                        ref: portfolio, 
                                        type: 'text', 
                                        required: false
                                    }} />
                                </Section>
                                <Section 
                                    title={"GitHub"} 
                                    classes={``}
                                    step={'04'}
                                >
                                    <Input props={{
                                        placeholder: 'GitHub URL', 
                                        ref: github, 
                                        type: 'text', 
                                        required: false
                                    }} />
                                </Section>
                                <Section 
                                    title={"Información adicional"} 
                                    classes={``}
                                    step={'05'}
                                >
                                    <textarea 
                                        ref={description}
                                        rows={5}
                                        className={`bg-transparent outline-none pb-2 w-full border ${darkMode ? 'placeholder:text-neutral-500 border-neutral-800' : 'placeholder:text-neutral-400 border-neutral-200'} px-3 py-2 rounded-md resize-none`} 
                                        placeholder="Agregue una carta de presentación o cualquier otra cosa que desee compartir."></textarea>
                                </Section>
                                <div className="flex gap-2">
                                    <div className="w-10 hidden xl:block"></div>
                                    <button type={'submit'} onClick={handleSubmit} className={`btn-primary flex items-center justify-center gap-1 py-2 px-4 bg-primary hover:bg-primary-2 transition-colors rounded-full uppercase text-center cursor-pointer w-full`}>
                                        <span>{'Enviar'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
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
        <div className={`flex items-center gap-2 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
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