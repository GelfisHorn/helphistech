import { useState } from "react";
// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function OurServicesSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();
    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-services">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex items-center gap-20 justify-between w-full">
                    <div className="blur-shadow -left-28 -top-28"></div>
                    <div className="flex flex-col gap-20">
                        <motion.div 
                        initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: .9 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center sm:items-start gap-5 relative">
                            <div className="">
                                <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Nuestros Servicios</span>
                            </div>
                            <div className="flex flex-col xl:flex-row justify-center sm:items-start gap-10 xl:gap-20">
                                <div>
                                    <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                        <div>Qué <span className="text-primary">Servicios</span></div>
                                        <div>{"Ofrecemos"}</div>
                                    </h2>
                                </div>
                                <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                    <p className="text-center sm:text-left">En HelphisTech, ofrecemos una amplia gama de servicios de desarrollo web para ayudar a las empresas a crear una sólida presencia en línea y lograr sus objetivos digitales. Nuestro equipo de desarrolladores experimentados está capacitado para crear sitios web personalizados, aplicaciones web y plataformas de comercio electrónico que se adaptan para satisfacer las necesidades únicas de cada cliente.</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className={`flex flex-col divide-y`}>
                            <ServicesOption
                                title={"Desarrollo personalizado de sitios web"}
                                description={"Nos especializamos en la creación de sitios web personalizados que están diseñados para satisfacer las necesidades específicas de nuestros clientes. Nuestros sitios web son receptivos, fáciles de usar y están optimizados para motores de búsqueda para garantizar la máxima visibilidad."}
                            />
                            <ServicesOption
                                title={"Desarrollo de aplicaciones web"}
                                description={"Podemos desarrollar aplicaciones web complejas diseñadas para agilizar sus procesos comerciales y mejorar la eficiencia. Nuestro equipo tiene experiencia en varios lenguajes y marcos de programación, incluidos React, Angular y Node."}
                            />
                            <ServicesOption
                                title={"Desarrollo de E-Commerce"}
                                description={"Podemos crear plataformas de comercio electrónico personalizadas diseñadas para ayudar a las empresas a vender sus productos y servicios en línea. Nuestros sitios web de comercio electrónico son seguros, fáciles de usar y pueden integrarse con pasarelas de pago populares como PayPal y Stripe."}
                            />
                            <ServicesOption
                                title={"Mantenimiento y soporte sitios web"}
                                description={"Brindamos mantenimiento y soporte continuos para todos nuestros sitios web y aplicaciones web. Nuestro equipo está disponible para solucionar cualquier problema que pueda surgir y para garantizar que su sitio web esté siempre actualizado y funcionando sin problemas."}
                            />
                        </div>
                        <Link className="flex justify-center" href={"/es/servicios"}>
                            <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                                <div>Ver más</div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ServicesOption({ title, description, href }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	const [ showDescription, setShowDescription ] = useState(false);
	const [ closeDropdown, setCloseDropdown ] = useState(false);

	function handleShowDescription() {
		if(showDescription) {
			setCloseDropdown(true);
			setTimeout(() => {
				setShowDescription(false);
			}, 220)
		} else {
			setCloseDropdown(false);
			setShowDescription(true);
		}
	}

	return (
		<div onClick={handleShowDescription} className={`flex flex-col gap-5 py-6 xl:py-9 cursor-pointer select-none ${darkMode ? 'subtitle-dark border-[#19191F] hover:text-zinc-200' : 'text-neutral-600 hover:text-black border-neutral-300'} transition-colors`}>
			<div className={`flex items-center justify-between gap-5 sm:gap-0 ${showDescription ? darkMode ? 'text-zinc-200' : 'text-black' : null}`}>
				<h3 className="font-extralight text-xl sm:text-2xl lg:text-3xl xl:text-4xl">{title}</h3>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke="currentColor" className={`w-8 h-8 xl:w-12 xl:h-12 ${showDescription ? 'rotate-180' : 'rotate-0'} transition-all`}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			{ showDescription && (
				<div className={`flex flex-col gap-5 ${closeDropdown ? 'dropdown-description-hide' : 'dropdown-description-show'}`}>
					<p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{description}</p>
					<Link className="text-primary hover:text-primary-2 transition-colors" href={"/es/contacto"}>
						<div className="flex items-center gap-2 hover:underline">
							<div>Estoy interesado</div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</div>
					</Link>
				</div>
			)}
		</div>
	)
}