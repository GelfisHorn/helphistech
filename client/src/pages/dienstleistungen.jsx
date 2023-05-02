import { useState } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ServicesPage() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <Layout title={"Unsere Dienstleistungen"} lang={'de'}>
            <main className={`overflow-hidden`}>
                <div className="z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center sm:items-start gap-5 relative px-6 sm:px-10 lg:px-20 2xl:px-40 py-28 2xl:py-36">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Welche Dienstleistungen wir anbieten</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">Bei HelphisTech bieten wir eine breite Palette von Webentwicklungsdiensten an, um Unternehmen dabei zu helfen, eine starke Online-Präsenz zu schaffen und ihre digitalen Ziele zu erreichen. Unser Team aus erfahrenen Entwicklern ist in der Erstellung benutzerdefinierter Websites, Webanwendungen und E-Commerce-Plattformen geschult, die auf die individuellen Bedürfnisse jedes Kunden zugeschnitten sind.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col divide-y bg-[#080808] px-6 sm:px-10 lg:px-20 2xl:px-40`}>
                                <ServicesOption
                                    title={"Maßgeschneiderte Softwareentwicklung"}
                                    p1={"Dieser Service konzentriert sich auf das Design und die Entwicklung einzigartiger und individueller Websites, die speziell auf die Bedürfnisse Ihrer Kunden zugeschnitten sind. Durch eine enge Zusammenarbeit mit Ihren Kunden können Sie eine Website erstellen, die ihre Marke, Werte und Geschäftsziele widerspiegelt."}
                                    p2={"Von der Grafikgestaltung und Informationsarchitektur bis hin zur Codierung und Suchmaschinenoptimierung gewährleistet die individuelle Website-Entwicklung, dass die Website Ihrer Kunden ansprechend, funktional und effektiv ist."}
                                    image={"/services/custom.webp"}
                                    alt={"Custom website development"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Entwicklung von Webanwendungen"}
                                    p1={"Dieser Service konzentriert sich auf die Erstellung von maßgeschneiderten Webanwendungen, die eine spezifische technologische Lösung für die Bedürfnisse Ihrer Kunden bieten. Dies kann Anwendungen für Projektmanagement, Kollaborationstools, Verkaufsverfolgungssysteme und mehr umfassen."}
                                    p2={"Durch eine enge Zusammenarbeit mit Ihren Kunden können Sie eine Webanwendung entwerfen und entwickeln, die ihren spezifischen Anforderungen entspricht und die Effizienz ihres Unternehmens verbessert."}
                                    image={"/services/application.webp"}
                                    alt={"Web Application Development"}
                                    side={'right'}
                                />
                                <ServicesOption
                                    title={"E-Commerce-Webanwendungen"}
                                    p1={"Dieser Service konzentriert sich auf die Erstellung maßgeschneiderter Online-Shops für Ihre Kunden und bietet ein benutzerfreundliches und attraktives Online-Shopping-Erlebnis für Endbenutzer."}
                                    p2={"Von der Erstellung von Produktkatalogen über die Integration sicherer Zahlungssysteme bis hin zur Erstellung von Inventar- und Logistik-Management-Systemen ist die E-Commerce-Entwicklung eine umfassende Lösung für Kunden, die ihr Geschäft online ausbauen möchten."}
                                    image={"/services/ecommerce.webp"}
                                    alt={"E-Commerce Development"}
                                    side={'left'}
                                />
                                <ServicesOption
                                    title={"Webanwendungs-Wartung"}
                                    p1={"Dieser Service konzentriert sich auf die Aufrechterhaltung und Verbesserung der Leistung der bestehenden Websites Ihrer Kunden. Durch die Bereitstellung von Sicherheitsupdates, Inhaltsaktualisierungen und regelmäßiger Wartung gewährleistet der Service für die Wartung und den Support von Websites, dass die Website Ihrer Kunden immer auf dem neuesten Stand, sicher und reibungslos funktioniert."}
                                    p2={"Darüber hinaus kann dieser Service die Behebung von technischen Problemen und die Implementierung von Verbesserungen zur Steigerung der Leistung und Effizienz der Website Ihrer Kunden umfassen."}
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
                    <Link className="text-primary hover:text-primary-2 hover:underline transition-colors" href={"/es/contacto"}>
                        <div className={`flex items-center gap-2 ${side == 'right' ? `flex-row-reverse lg:flex-row` : ''}`}>
                            { side == 'right' && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 rotate-180 lg:rotate-0`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
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
            <div className="">
                <Image className="max-w-[15rem] xs:max-w-[20rem] 2xl:max-w-[25rem]" src={image} width={1000} height={1000} alt={alt} priority />
            </div>
        </div>
	)
}