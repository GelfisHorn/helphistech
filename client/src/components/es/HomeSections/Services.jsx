import axios from "axios";
// React
import { useState, useEffect } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function OurServicesSection({ services }) {
    
    // Get functions and variables from context
	const { darkMode, language } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-services">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex items-center gap-20 justify-between w-full">
                    <div className="blur-shadow -left-28 -top-28"></div>
                    <div className="flex flex-col gap-20">
                        <motion.div 
                            initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center sm:items-start gap-5 relative"
                        >
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
                        <div className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10">
                                {services && services.length != 0 && services.map((service, index) => (
                                    <Service key={index} service={service} />
                                ))}
                            </div>
                            {services.length == 0 && (
                                <div className={`flex ${darkMode ? 'description-dark' : 'description-light'}`}>
                                    <div className={"flex flex-col gap-2"}>
                                        <p>Hubo un problema al obtener los servicios.</p>
                                        <div>
                                            <p>¿Quieres ver qué tenemos para ofrecerte?</p>
                                            <Link href={"/pagina-web"} className={"flex items-center gap-1 text-primary hover:text-primary-2"}>
                                                <span>Ir a servicios</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className={`flex flex-col divide-y`}>
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
                        </div> */}
                        {services.length != 0 && (
                            <Link className="flex justify-center" href={"/pagina-web"}>
                                <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                                    <div>Ver más</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

function Service({ service }) {

    const { darkMode } = useContextProvider();

    const { url, title, subtitle, preview } = service.attributes || {};

    return (
        <Link href={`/pagina-web/${url}`} className="flex flex-col gap-3 hover:scale-[102%] transition-transform active:scale-100">
            <div className="image-container aspect-video">
                <Image loading="eager" className="object-cover rounded-md" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
            </div>
            {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
            <div className="flex items-center justify-between gap-2">
                <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                <div className="w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                </div>
            </div>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
        </Link>
    )
}

/* function ServicesOption({ title, description, href }) {

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
} */