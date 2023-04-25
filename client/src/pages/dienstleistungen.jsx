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
        <Layout title={"Unsere Dienstleistungen"} lang={'de'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-[4.5rem]">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Welche Dienstleistungen wir anbieten</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">Bei HelphisTech bieten wir eine breite Palette von Webentwicklungsdiensten an, um Unternehmen dabei zu helfen, eine starke Online-Präsenz zu schaffen und ihre digitalen Ziele zu erreichen. Unser Team aus erfahrenen Entwicklern ist in der Erstellung benutzerdefinierter Websites, Webanwendungen und E-Commerce-Plattformen geschult, die auf die individuellen Bedürfnisse jedes Kunden zugeschnitten sind.</p>
                                        {/* We use the latest technologies and industry best practices to ensure that our projects are of the highest quality, and we work closely with our clients to ensure that they are satisfied with the final product. */}
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y`}>
                                <ServicesOption
                                    title={"Maßgeschneiderte Softwareentwicklung"}
                                    description={"Wir sind darauf spezialisiert, kundenspezifische Websites zu erstellen, die auf die spezifischen Bedürfnisse unserer Kunden zugeschnitten sind. Unsere Websites sind reaktionsschnell, benutzerfreundlich und für Suchmaschinen optimiert, um eine maximale Sichtbarkeit zu gewährleisten."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Entwicklung von Webanwendungen"}
                                    description={"Wir können komplexe Webanwendungen entwickeln, die darauf ausgelegt sind, Ihre Geschäftsprozesse zu rationalisieren und die Effizienz zu verbessern. Unser Team verfügt über Erfahrung in verschiedenen Programmiersprachen und Frameworks, darunter React, Angular und Node."}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"E-Commerce-Webanwendungen"}
                                    description={"Wir können benutzerdefinierte E-Commerce-Plattformen erstellen, die Unternehmen dabei helfen sollen, ihre Produkte und Dienstleistungen online zu verkaufen. Unsere E-Commerce-Websites sind sicher, einfach zu bedienen und können in beliebte Zahlungsgateways wie PayPal und Stripe integriert werden."}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Webanwendungs-Wartung"}
                                    description={"Wir bieten laufende Wartung und Support für alle unsere Websites und Webanwendungen. Unser Team steht Ihnen zur Verfügung, um eventuell auftretende Probleme zu beheben und sicherzustellen, dass Ihre Website immer auf dem neuesten Stand ist und reibungslos funktioniert."}
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
                <Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/contact"}>
                    <div className="flex items-center gap-2">
                        { side == 'right' && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            
                        )}
                        <div>Ich bin interessiert</div>
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