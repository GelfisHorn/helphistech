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
        <Layout title={"Our services"} lang={'en'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-[4.5rem]">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">What Services We're Offering</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">At HelphisTech, we offer a wide range of web development services to help businesses create a strong online presence and achieve their digital goals. Our team of experienced developers is skilled in creating custom websites, web applications, and e-commerce platforms that are tailored to meet the unique needs of each client.</p>
                                        {/* We use the latest technologies and industry best practices to ensure that our projects are of the highest quality, and we work closely with our clients to ensure that they are satisfied with the final product. */}
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y`}>
                                <ServicesOption
                                    title={"Custom Website Development"}
                                    description={"We specialize in creating custom websites that are designed to meet the specific needs of our clients. Our websites are responsive, user-friendly, and optimized for search engines to ensure maximum visibility."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Web Application Development"}
                                    description={"We can develop complex web applications that are designed to streamline your business processes and improve efficiency. Our team has expertise in various programming languages and frameworks, including React, Angular, and Node."}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"E-Commerce Development"}
                                    description={"We can create custom e-commerce platforms that are designed to help businesses sell their products and services online. Our e-commerce websites are secure, easy to use, and can integrate with popular payment gateways such as PayPal and Stripe."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Website Maintenance and Support"}
                                    description={"We provide ongoing maintenance and support for all of our websites and web applications. Our team is available to troubleshoot any issues that may arise and to ensure that your website is always up-to-date and running smoothly."}
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
                <Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/en/contact"}>
                    <div className="flex items-center gap-2">
                        { side == 'right' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
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
            </div>
		</div>
	)
}