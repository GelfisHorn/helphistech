import { useState } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function OldServicesPage() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <Layout title={"Our services"} lang={'en'}>
            <main className={`overflow-hidden`}>
                <div className="z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center sm:items-start gap-5 relative px-6 sm:px-10 lg:px-20 2xl:px-40 py-28 2xl:py-36">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">What Services We're Offering</h1>
                                    </motion.div>
                                    <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">At HelphisTech, we offer a wide range of web development services to help businesses create a strong online presence and achieve their digital goals. Our team of experienced developers is skilled in creating custom websites, web applications, and e-commerce platforms that are tailored to meet the unique needs of each client.</p>
                                    </motion.div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y ${darkMode ? 'bg-[#080808]' : 'bg-neutral-100'} px-6 sm:px-10 lg:px-20 2xl:px-40`}>
                                <ServicesOption
                                    title={"Custom Website Development"}
                                    p1={"This service focuses on designing and developing unique, customized websites that cater to the specific needs of your clients. By working closely with your clients, you can create a website that reflects their brand, values, and business goals."}
                                    p2={"From graphic design and information architecture, to coding and search engine optimization, custom website development ensures that your clients' website is attractive, functional, and effective."}
                                    image={"/services/custom.webp"}
                                    alt={"Custom website development"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Web Application Development"}
                                    p1={"This service focuses on creating custom web applications that provide a specific technological solution for your clients' needs. This can include applications for project management, collaboration tools, sales tracking systems, among others."}
                                    p2={"By working closely with your clients, you can design and develop a web application that meets their specific requirements and enhances the efficiency of their business."}
                                    image={"/services/application.webp"}
                                    alt={"Web Application Development"}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"E-Commerce Development"}
                                    p1={"This service focuses on creating customized online stores for your clients, providing an easy and attractive online shopping experience for end users."}
                                    p2={"From creating product catalogs, integrating secure payment systems, to creating inventory and logistics management systems, E-Commerce development is a comprehensive solution for clients looking to expand their business online."}
                                    image={"/services/ecommerce.webp"}
                                    alt={"E-Commerce Development"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Website Maintenance and Support"}
                                    p1={"This service focuses on maintaining and improving the performance of your clients' existing websites. By providing security updates, content updates, and regular maintenance, website maintenance and support ensures that your clients' website is always up-to-date, secure, and running smoothly."}
                                    p2={"Additionally, this service may include troubleshooting technical issues and implementing improvements to increase the performance and efficiency of your clients' website."}
                                    image={"/services/maintenance.webp"}
                                    alt={"Maintenance and Support"}
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
                                <div>I'm interested</div>
                                { side == 'left' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
            <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                <Image className="max-w-[15rem] xs:max-w-[20rem] 2xl:max-w-[25rem]" src={image} width={1000} height={1000} alt={alt} priority />
            </motion.div>
        </div>
	)
}