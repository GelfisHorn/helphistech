import { useState } from "react";
// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ServicesSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-services">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex items-center gap-20 justify-between w-full">
                    <div className="blur-shadow -left-28 -top-28"></div>
                    <div className="flex flex-col gap-20">
                        <div className="flex flex-col items-center sm:items-start gap-5 relative">
                            <div className="flex flex-col">
                                <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Our services</span>
                            </div>
                            <div className="flex flex-col xl:flex-row justify-center sm:items-start gap-10 xl:gap-20">
                                <div>
                                    <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                        <div>What <span className="text-primary">Services</span></div>
                                        <div>{"We're Offering"}</div>
                                    </h2>
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
                            />
                            <ServicesOption
                                title={"Web Application Development"}
                                description={"We can develop complex web applications that are designed to streamline your business processes and improve efficiency. Our team has expertise in various programming languages and frameworks, including React, Angular, and Node."}
                            />
                            <ServicesOption
                                title={"E-Commerce Development"}
                                description={"We can create custom e-commerce platforms that are designed to help businesses sell their products and services online. Our e-commerce websites are secure, easy to use, and can integrate with popular payment gateways such as PayPal and Stripe."}
                            />
                            <ServicesOption
                                title={"Website Maintenance and Support"}
                                description={"We provide ongoing maintenance and support for all of our websites and web applications. Our team is available to troubleshoot any issues that may arise and to ensure that your website is always up-to-date and running smoothly."}
                            />
                        </div>
                        <Link className="flex justify-center" href={"#"}>
                            <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                                <div>See more</div>
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
		<div onClick={handleShowDescription} className={`flex flex-col gap-5 py-9 cursor-pointer select-none ${darkMode ? 'subtitle-dark border-[#19191F] hover:text-zinc-200' : 'text-neutral-600 hover:text-black border-neutral-300'} transition-colors`}>
			<div className={`flex items-center justify-between gap-5 sm:gap-0 ${showDescription ? darkMode ? 'text-zinc-200' : 'text-black' : null}`}>
				<h3 className="font-extralight text-xl sm:text-2xl lg:text-3xl xl:text-4xl">{title}</h3>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke="currentColor" className={`w-8 h-8 xl:w-12 xl:h-12 ${showDescription ? 'rotate-180' : 'rotate-0'} transition-all`}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			{ showDescription && (
				<div className={`flex flex-col gap-5 ${closeDropdown ? 'dropdown-description-hide' : 'dropdown-description-show'}`}>
					<p className={`font-light ${darkMode ? 'description-dark' : 'description-light'}`}>{description}</p>
					<Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/en/contact"}>
						<button className="flex items-center gap-2">
							<div>I'm interested</div>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
							</svg>
						</button>
					</Link>
				</div>
			)}
		</div>
	)
}