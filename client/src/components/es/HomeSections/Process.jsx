import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function ProcessSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-process">
            <div className="flex flex-col gap-20 max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <motion.div className="flex flex-col gap-5 items-center sm:items-start "
                    initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                    viewport={{ once: true }}
                >
                    {/* <div className="blur-shadow -left-28 -top-28 -z-10"></div> */}
                    <div className="flex flex-col">
                        <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Proceso de desarrollo</span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div>
                            <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                <div className="hidden xs:block">Cómo funciona el</div>
                                <div className="hidden xs:block">proceso de <span className="text-primary">desarrollo</span></div>
                                <div className="xs:hidden">Cómo funciona</div>
                                <div className="xs:hidden">el proceso de</div>
                                <div className="xs:hidden text-primary">desarrollo</div>
                            </h2>
                        </div>
                        <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                            <p className="text-center sm:text-left">Si necesitas una presencia en línea efectiva para tu negocio o proyecto, un sitio web es una parte vital del proceso. Aquí hay un desglose del proceso de desarrollo web para que sepas qué esperar al trabajar con nosotros.</p>
                        </div>
                    </div>
                </motion.div>
                <div className="pb-10 overflow-x-scroll w-full scrollbar-thin">
                    <div className="flex items-start gap-20 w-max sm:w-[186.66rem] 2xl:w-[210rem]">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>1.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>2.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>3.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Planificación"}
                                    description={"Trabajamos contigo para conocer tus necesidades y objetivos para el sitio web. Luego, diseñamos y desarrollamos un sitio web que satisfaga tus necesidades y deseos, incluyendo las funcionalidades, apariencia y comportamiento que deseas."} 
                                    hash={"plan"}
                                />
                                <ProcessItem 
                                    title={"Diseño y prototipado"}
                                    description={"Una vez que hayamos entendido lo que necesitas, crearemos un prototipo de tu sitio web utilizando Figma o una herramienta similar. Este prototipo mostrará la apariencia y el comportamiento del sitio web. Si hay algo que no te gusta o quieres cambiar, lo hacemos aquí antes de avanzar al siguiente paso."} 
                                    hash={"design"}
                                />
                                <ProcessItem 
                                    title={"Desarrollo del Back-end"}
                                    description={'Después de diseñar y crear el prototipo, trabajaremos en la parte del sitio web llamada "backend" que maneja las operaciones del servidor. Utilizamos tecnologías modernas y confiables para garantizar un funcionamiento sin problemas y almacenar el contenido y manejar las bases de datos.'} 
                                    hash={"backend"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>4.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>5.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>6.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Desarrollo del Front-end"}
                                    description={"El frontend es la parte del sitio web que los usuarios ven y con la que interactúan. Aquí es donde creamos la interfaz de usuario del sitio web utilizando HTML, CSS y JavaScript. Nos aseguramos de que el sitio web sea responsivo y se vea bien en cualquier dispositivo."} 
                                    hash={"frontend"}
                                />
                                <ProcessItem 
                                    title={"Optimización del SEO"}
                                    description={"Para ayudar a las personas a encontrar tu sitio web, lo optimizamos para los motores de búsqueda. Hacemos investigación de palabras clave para asegurarnos de que tu sitio web esté optimizado para los términos de búsqueda que más le importan a tu negocio o proyecto."} 
                                    hash={"seo"}
                                />
                                <ProcessItem 
                                    title={"Marketing"}
                                    description={'Si deseas que más personas visiten tu sitio web, podemos ayudarte con el marketing en línea. Esto puede incluir publicidad en Google Ads y meta ads, así como marketing en redes sociales.'} 
                                    hash={"marketing"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>7.</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-20">
                                <ProcessItem 
                                    title={"Mantenimiento"}
                                    description={"Una vez que tu sitio web está en línea, seguimos trabajando contigo para mantenerlo actualizado y optimizado. Realizamos actualizaciones regulares de seguridad y software para asegurarnos de que tu sitio web esté protegido contra amenazas en línea y siga siendo fácil de usar."} 
                                    hash={"maintenance"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ProcessItem({ title, description, hash }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className="text-xl">{title}</div>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} text-ellipsis-4 max-w-[85vw]`}>{description}</div>
            <Link className="w-fit" href={`/es/desarrollo-web-personalizado#${hash}`}>
                <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                    <div>Ver más</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </Link>
        </div>
    )
}