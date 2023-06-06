import { useEffect } from "react";
// Nextjs
import Image from "next/image";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomWebDevelopment() {
    
    const { darkMode } = useContextProvider();

    function scrollTo(hash) {
        const element = document.getElementById(`${hash}-section`);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const hash = location.hash;
        if(hash) {
            scrollTo(hash.split('#')[1]);
        }
    }, [])

    return (
        <Layout title={"Nuestro proceso de trabajo"} lang={'es'}>
            <main>
                <div className="flex flex-col">
                    <div className={`flex flex-col gap-10 w-full text-center xs:text-left px-6 sm:px-10 lg:px-20 2xl:px-40 py-28 2xl:py-36`}>
                        <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                            <h1 className="w-full">Nuestro proceso de trabajo</h1>
                        </motion.div>
                        <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`${darkMode ? 'description-dark' : 'description-light'}`}>
                            <p>Si necesitas una presencia en línea efectiva para tu negocio o proyecto, un sitio web es una parte vital del proceso.</p>
                            <p>Aquí hay un desglose del proceso de desarrollo web para que sepas qué esperar al trabajar con nosotros.</p>
                        </motion.div>
                    </div>
                    <div className={`grid grid-cols-1 ${darkMode ? 'bg-[#080808]' : 'bg-neutral-100'} px-6 sm:px-10 lg:px-20 2xl:px-40 py-28`}>
                        <div className="grid grid-rows-7 gap-5">
                            <ProcessItem 
                                title={"Reunión inicial y planificación"}
                                description={"En esta fase, nos reunimos contigo para conocer tus necesidades y objetivos para el sitio web. Escuchamos tus ideas y requerimientos y los integramos en un plan de trabajo que te presentamos para su aprobación. Trabajamos contigo para diseñar y desarrollar una estrategia que satisfaga tus necesidades."} 
                                hash={"plan"}
                                image={"/process/idea.webp"}
                                alt={"Idea"}
                                number={1}
                            />
                            <ProcessItem 
                                title={"Diseño y prototipado"}
                                description={"Creamos un prototipo del sitio web utilizando herramientas de diseño como Figma. Este prototipo muestra la apariencia y el comportamiento del sitio web, incluyendo su diseño, funcionalidad y navegación. A través del prototipado, podemos iterar y ajustar el diseño hasta que se ajuste a tus necesidades."} 
                                hash={"design"}
                                image={"/process/prototype.webp"}
                                alt={"Prototype"}
                                number={2}
                            />
                            <ProcessItem 
                                title={"Desarrollo del backend"}
                                description={`En esta fase, trabajamos en el desarrollo del backend del sitio web, que maneja las operaciones del servidor. Esto puede incluir la creación y el almacenamiento de contenido y la gestión de bases de datos. Trabajamos con Node.js en el back-end.`} 
                                hash={"backend"}
                                image={"/process/backend.webp"}
                                alt={"Backend"}
                                number={3}
                            />
                            <ProcessItem 
                                title={"Desarrollo del frontend"}
                                description={"Creamos la interfaz de usuario del sitio web utilizando tecnologías frontend modernas como React, Angular, Vue, Astro y Qwik. También nos aseguramos de que el sitio web sea responsivo, lo que significa que se verá bien en cualquier dispositivo, desde un teléfono inteligente hasta un ordenador de escritorio. Aseguramos la calidad del código y la compatibilidad con los principales navegadores."} 
                                hash={"frontend"}
                                image={"/process/frontend.webp"}
                                alt={"Frontend"}
                                number={4}
                            />
                            <ProcessItem 
                                title={"Optimización del SEO"}
                                description={"Una vez que el sitio web esté completo, nos enfocamos en optimizarlo para los motores de búsqueda. Realizamos una investigación de palabras clave para identificar las palabras clave más relevantes para tu sitio web y las incorporamos en el contenido y la estructura del sitio web. Además, trabajamos en la optimización técnica del sitio web para mejorar su clasificación en los motores de búsqueda."} 
                                hash={"seo"}
                                image={"/process/seo.webp"}
                                alt={"SEO"}
                                number={5}
                            />
                            <ProcessItem 
                                title={"Marketing"}
                                description={'Ofrecemos servicios de marketing de contenidos, que incluyen la creación de un blog, la gestión de redes sociales y el desarrollo de campañas de email marketing. Creamos contenido relevante y de alta calidad que atrae a tu audiencia objetivo y les proporciona valor. Trabajamos en conjunto contigo para definir la estrategia de contenido más efectiva para tu negocio o proyecto.'} 
                                hash={"marketing"}
                                image={"/process/marketing.webp"}
                                alt={"Marketing"}
                                number={6}
                            />
                            <ProcessItem 
                                title={"Mantenimiento"}
                                description={"El mantenimiento del sitio web es crucial para asegurar su seguridad y eficiencia. Realizamos actualizaciones regulares de software y seguridad para mantener el sitio web actualizado y protegido contra las amenazas en línea. También ofrecemos servicios de soporte técnico para ayudarte con cualquier problema que puedas tener con el sitio web."} 
                                hash={"maintenance"}
                                last={true}
                                image={"/process/maintenance.webp"}
                                alt={"Maintenance"}
                                number={7}
                            />
                        </div>
                        <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                            <div className="flex justify-center">
                                <Link href="/en/contact" className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors">
                                    <span>Contactanos</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function ProcessItem({ title, description, number, hash, last, image, alt }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex items-start gap-20">
            <div className="flex items-start gap-5 py-5" id={`${hash}-section`}>
                <div className="flex flex-col items-center gap-10">
                    <div className={`text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>{number}.</div>
                    <div className={`${last ? 'w-0' : 'w-[1px]'} h-36 bg-primary-2 opacity-30`}></div>
                </div>
                <div className="flex flex-col gap-3">
                    <motion.div  initial={{ x:-40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</div>
                    </motion.div>
                    <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
                    </motion.div>
                </div>
            </div>
            <div className="hidden lg:block">
                <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                    <Image className="max-w-[20rem]" src={image} width={200} height={200} priority alt={alt} />
                </motion.div>
            </div>
        </div>
    )
}