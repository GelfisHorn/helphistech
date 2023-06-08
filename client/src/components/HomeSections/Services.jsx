import { useState } from "react";
// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function ServicesSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-services">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex items-center gap-20 justify-between w-full">
                    <div className="blur-shadow -left-28 -top-28"></div>
                    <div className="flex flex-col gap-20">
                        <motion.div 
                        initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center sm:items-start gap-5 relative">
                            <div className="flex flex-col">
                                <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Dienstleistungen</span>
                            </div>
                            <div className="flex flex-col xl:flex-row justify-center sm:items-start gap-10 xl:gap-20">
                                <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                    <div>Welche</div>
                                    <div className="text-primary">Dienstleistungen</div>
                                    <div>{"wir anbieten"}</div>
                                </h2>
                                <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                    <p className="text-center sm:text-left">Bei HelphisTech bieten wir eine breite Palette von Webentwicklungsdiensten an, um Unternehmen dabei zu helfen, eine starke Online-Präsenz zu schaffen und ihre digitalen Ziele zu erreichen. Unser Team aus erfahrenen Entwicklern ist in der Erstellung benutzerdefinierter Websites, Webanwendungen und E-Commerce-Plattformen geschult, die auf die individuellen Bedürfnisse jedes Kunden zugeschnitten sind.</p>
                                    {/* We use the latest technologies and industry best practices to ensure that our projects are of the highest quality, and we work closely with our clients to ensure that they are satisfied with the final product. */}
                                </div>
                            </div>
                        </motion.div>
                        <div className={`flex flex-col divide-y`}>
                            <ServicesOption
                                title={"Maßgeschneiderte Softwareentwicklung"}
                                description={"Wir sind darauf spezialisiert, kundenspezifische Websites zu erstellen, die auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten sind. Unsere Websites sind reaktionsschnell, benutzerfreundlich und für Suchmaschinen optimiert, um eine maximale Sichtbarkeit zu gewährleisten."}
                            />
                            <ServicesOption
                                title={"Entwicklung von Webanwendungen"}
                                description={"Wir können komplexe Webanwendungen entwickeln, die darauf ausgelegt sind, Ihre Geschäftsprozesse zu rationalisieren und die Effizienz zu verbessern. Unser Team verfügt über Erfahrung in verschiedenen Programmiersprachen und Frameworks, darunter React, Angular und Node."}
                            />
                            <ServicesOption
                                title={"E-Commerce-Webanwendungen"}
                                description={"Wir können benutzerdefinierte E-Commerce-Plattformen erstellen, die Unternehmen dabei helfen sollen, ihre Produkte und Dienstleistungen online zu verkaufen. Unsere E-Commerce-Websites sind sicher, einfach zu bedienen und können in beliebte Zahlungsgateways wie PayPal und Stripe integriert werden."}
                            />
                            <ServicesOption
                                title={"Webanwendungs-Wartung"}
                                description={"Wir bieten laufende Wartung und Support für alle unsere Websites und Webanwendungen. Unser Team steht Ihnen zur Verfügung, um eventuell auftretende Probleme zu beheben und sicherzustellen, dass Ihre Website immer auf dem neuesten Stand ist und reibungslos funktioniert."}
                            />
                        </div>
                        <Link className="flex justify-center" href={"/internetseite"}>
                            <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                                <div>Mehr Erfahren</div>
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
					<Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/contact"}>
						<div className="flex items-center gap-2">
							<div>Ich bin interessiert</div>
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