import { useState } from "react";
// Nextjs
import Link from "next/link";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ServicesPage() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <Layout title={"Nuestros servicios"} lang={'es'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-[4.5rem]">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Qué Servicios Ofrecemos</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">En HelphisTech, ofrecemos una amplia gama de servicios de desarrollo web para ayudar a las empresas a crear una sólida presencia en línea y lograr sus objetivos digitales. Nuestro equipo de desarrolladores experimentados está capacitado para crear sitios web personalizados, aplicaciones web y plataformas de comercio electrónico que se adaptan para satisfacer las necesidades únicas de cada cliente.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y`}>
                                <ServicesOption
                                    title={"Desarrollo personalizado de sitios web"}
                                    description={"Nos especializamos en la creación de sitios web personalizados que están diseñados para satisfacer las necesidades específicas de nuestros clientes. Nuestros sitios web son receptivos, fáciles de usar y están optimizados para motores de búsqueda para garantizar la máxima visibilidad."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Desarrollo de aplicaciones web"}
                                    description={"Podemos desarrollar aplicaciones web complejas diseñadas para agilizar sus procesos comerciales y mejorar la eficiencia. Nuestro equipo tiene experiencia en varios lenguajes y marcos de programación, incluidos React, Angular y Node."}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"Desarrollo de E-Commerce"}
                                    description={"Podemos crear plataformas de comercio electrónico personalizadas diseñadas para ayudar a las empresas a vender sus productos y servicios en línea. Nuestros sitios web de comercio electrónico son seguros, fáciles de usar y pueden integrarse con pasarelas de pago populares como PayPal y Stripe."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Mantenimiento y soporte sitios web"}
                                    description={"Brindamos mantenimiento y soporte continuos para todos nuestros sitios web y aplicaciones web. Nuestro equipo está disponible para solucionar cualquier problema que pueda surgir y para garantizar que su sitio web esté siempre actualizado y funcionando sin problemas."}
                                    side={'right'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function ServicesOption({ title, description, side }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	return (
		<div className={`${side == 'left' ? 'items-start text-left' : 'items-end text-right'} flex flex-col gap-5 py-20 ${darkMode ? 'subtitle-dark border-[#19191F]' : 'text-neutral-600 border-neutral-300'} transition-colors`}>
			<div className={`flex items-center justify-between gap-5 sm:gap-0 ${darkMode ? 'text-zinc-200' : 'text-black'}`}>
				<h3 className="font-extralight text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary">{title}</h3>
			</div>
			<div className={`${side == 'left' ? 'items-start text-left' : 'items-end text-right'} flex flex-col gap-5`}>
                <p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{description}</p>
                <Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/es/contacto"}>
                    <div className="flex items-center gap-2">
                        { side == 'right' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            
                        )}
                        <div>Estoy interesado</div>
                        { side == 'left' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        )}
                    </div>
                </Link>
            </div>
		</div>
	)
}