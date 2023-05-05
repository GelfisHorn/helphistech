import { useState } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function ServicesPage() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <Layout title={"Nuestros servicios"} lang={'es'}>
            <main className={`overflow-hidden`}>
                <div className="z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center sm:items-start gap-5 relative px-6 sm:px-10 lg:px-20 2xl:px-40 py-28 2xl:py-36">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Qué Servicios Ofrecemos</h1>
                                    </motion.div>
                                    <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">En HelphisTech, ofrecemos una amplia gama de servicios de desarrollo web para ayudar a las empresas a crear una sólida presencia en línea y lograr sus objetivos digitales. Nuestro equipo de desarrolladores experimentados está capacitado para crear sitios web personalizados, aplicaciones web y plataformas de comercio electrónico que se adaptan para satisfacer las necesidades únicas de cada cliente.</p>
                                    </motion.div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y ${darkMode ? 'bg-[#080808]' : 'bg-neutral-100'} px-6 sm:px-10 lg:px-20 2xl:px-40`}>
                                <ServicesOption
                                    title={"Desarrollo personalizado de sitios web"}
                                    p1={"Este servicio se enfoca en diseñar y desarrollar sitios web únicos y personalizados que se adapten a las necesidades específicas de tus clientes. Al trabajar en estrecha colaboración con tus clientes, podrás crear un sitio web que refleje su marca, valores y objetivos de negocio."}
                                    p2={"Desde el diseño gráfico y la arquitectura de información, hasta la codificación y la optimización para motores de búsqueda, el desarrollo personalizado de sitios web garantiza que el sitio web de tus clientes sea atractivo, funcional y efectivo."}
                                    image={"/services/custom.webp"}
                                    alt={"Desarrollo web personalizado"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Desarrollo de aplicaciones web"}
                                    p1={"Este servicio se enfoca en la creación de aplicaciones web personalizadas que proporcionen una solución tecnológica específica para las necesidades de tus clientes. Esto puede incluir aplicaciones para la gestión de proyectos, herramientas de colaboración, sistemas de seguimiento de ventas, entre otros."}
                                    p2={"Al trabajar en estrecha colaboración con tus clientes, podrás diseñar y desarrollar una aplicación web que cumpla con sus requisitos específicos y mejore la eficiencia de su negocio."}
                                    image={"/services/application.webp"}
                                    alt={"Desarrollo de aplicaciones web"}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"Desarrollo de E-Commerce"}
                                    p1={"Este servicio se enfoca en la creación de tiendas en línea personalizadas para tus clientes, ofreciendo una experiencia de compra en línea fácil y atractiva para los usuarios finales."}
                                    p2={"Desde la creación de catálogos de productos, la integración de sistemas de pago seguros, hasta la creación de sistemas de gestión de inventario y logística, el desarrollo de E-Commerce es una solución integral para aquellos clientes que buscan expandir su negocio en línea."}
                                    image={"/services/ecommerce.webp"}
                                    alt={"Desarrollo de E-Commerce"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Mantenimiento y soporte sitios web"}
                                    p1={"Este servicio se enfoca en mantener y mejorar el rendimiento de los sitios web existentes de tus clientes. Al proporcionar actualizaciones de seguridad, actualizaciones de contenido y mantenimiento regular, el servicio de mantenimiento y soporte de sitios web garantiza que el sitio web de tus clientes esté siempre actualizado, seguro y funcionando sin problemas."}
                                    p2={"Además, este servicio puede incluir la resolución de problemas técnicos y la implementación de mejoras para aumentar el rendimiento y la eficiencia del sitio web de tus clientes."}
                                    image={"/services/maintenance.webp"}
                                    alt={"Desarrollo de E-Commerce"}
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

function ServicesOption({ title, p1, p2, image, alt, side }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	return (
		<div className={`flex items-center ${side == 'left' ? 'flex-col-reverse lg:flex-row' : 'flex-col-reverse lg:flex-row-reverse'} gap-10 lg:gap-20 py-20 ${darkMode ? 'subtitle-dark border-[#19191F]' : 'text-neutral-600 border-neutral-300'}`}>
            <div className={`${side == 'left' ? 'items-center text-center lg:items-start lg:text-left' : 'items-center text-center lg:items-end lg:text-right'} flex flex-col gap-5 transition-colors`}>
                <div className={`flex items-center justify-between gap-5 sm:gap-0 ${darkMode ? 'text-zinc-200' : 'text-black'}`}>
                    <h3 className="font-extralight text-2xl xs:text-3xl md:text-4xl text-primary">{title}</h3>
                </div>
                <div className={`${side == 'left' ? 'items-center text-center lg:items-start lg:text-left' : 'items-center text-center lg:items-end lg:text-right'} flex flex-col gap-5`}>
                    <div className="flex flex-col gap-3">
                        <p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{p1}</p>
                        <p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{p2}</p>
                    </div>
                    <motion.div initial={{ x: side === "right" ? 60 : -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .4 }} viewport={{ once: true }}>
                        <Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/es/contacto"}>
                            <div className={`flex items-center gap-2 ${side == 'right' ? `flex-row-reverse lg:flex-row` : ''}`}>
                                { side == 'right' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 rotate-180 lg:rotate-0`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>
                                )}
                                <div>Estoy interesado</div>
                                { side == 'left' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${side == 'right' ? 'rotate-180' : ''}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                <Image className="max-w-[20rem] 2xl:max-w-[25rem]" src={image} width={1000} height={1000} alt={alt} priority />
            </motion.div>
        </div>
	)
}