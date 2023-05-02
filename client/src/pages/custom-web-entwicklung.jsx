import { useEffect } from "react";
// Nextjs
import Image from "next/image";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/Layout";

export default function CustomWebDevelopment() {
    
    const { darkMode } = useContextProvider();

    function handleScrollTo(hash) {
        const element = document.getElementById(`${hash}-section`);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const hash = location.hash;
        if(hash) {
            handleScrollTo(hash.split('#')[1]);
        }
    }, [])

    return (
        <Layout title={"Unser Arbeitsprozess"} lang={'de'}>
            <main>
                <div className="flex flex-col">
                    <div className={`flex flex-col gap-5 w-full text-center xs:text-left px-6 sm:px-10 lg:px-20 2xl:px-40 py-28 2xl:py-36`}>
                        <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                            <h1 className="w-full">Unser Arbeitsprozess</h1>
                            {/* <br /> 
                            <span className="w-full"></span> */}
                        </div>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>
                            <p>Wenn Sie für Ihr Unternehmen oder Projekt eine effektive Online-Präsenz benötigen, ist eine Website ein wesentlicher Bestandteil des Prozesses.</p>
                            <p>Hier ist eine Aufschlüsselung des Webentwicklungsprozesses, damit Sie wissen, was Sie erwartet, wenn Sie mit uns zusammenarbeiten.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 bg-[#080808] px-6 sm:px-10 lg:px-20 2xl:px-40 py-28">
                        <div className="grid grid-rows-7 gap-5">
                            <ProcessItem 
                                title={"Kick-off-Meeting und Planung"}
                                description={"In dieser Phase treffen wir uns mit Ihnen, um Ihre Bedürfnisse und Ziele für die Website kennenzulernen. Wir hören uns Ihre Ideen und Anforderungen an und integrieren sie in einen Arbeitsplan, den wir Ihnen zur Genehmigung vorlegen. Gemeinsam mit Ihnen konzipieren und entwickeln wir eine Strategie, die Ihren Bedürfnissen entspricht."} 
                                hash={"plan"}
                                image={"/process/idea.webp"}
                                alt={"Idea"}
                                number={1}
                            />
                            <ProcessItem 
                                title={"Design und Prototyping"}
                                description={"Wir haben einen Prototyp der Website mit Design-Tools wie Figma erstellt. Dieser Prototyp zeigt das Erscheinungsbild und Verhalten der Website, einschließlich ihres Designs, ihrer Funktionalität und Navigation. Durch Prototyping können wir das Design iterieren und optimieren, bis es Ihren Anforderungen entspricht."} 
                                hash={"design"}
                                image={"/process/prototype.webp"}
                                alt={"Prototype"}
                                number={2}
                            />
                            <ProcessItem 
                                title={"Backend-Entwicklung"}
                                description={`In dieser Phase arbeiten wir an der Entwicklung des Backends der Website, das den Serverbetrieb übernimmt. Dies kann das Erstellen und Speichern von Inhalten und das Verwalten von Datenbanken umfassen. Im Backend arbeiten wir mit Node.js.`} 
                                hash={"backend"}
                                image={"/process/backend.webp"}
                                alt={"Backend"}
                                number={3}
                            />
                            <ProcessItem 
                                title={"Frontend-Entwicklung"}
                                description={"Wir erstellen die Benutzeroberfläche der Website mit modernen Frontend-Technologien wie React, Angular, Vue, Astro und Qwik. Wir stellen auch sicher, dass die Website reaktionsschnell ist, was bedeutet, dass sie auf jedem Gerät gut aussieht, vom Smartphone bis zum Desktop-Computer. Wir stellen die Qualität des Codes und die Kompatibilität mit den wichtigsten Browsern sicher."} 
                                hash={"frontend"}
                                image={"/process/frontend.webp"}
                                alt={"Frontend"}
                                number={4}
                            />
                            <ProcessItem 
                                title={"SEO-Optimierung"}
                                description={"Ist die Website fertig, konzentrieren wir uns auf die Optimierung für Suchmaschinen. Wir führen eine Keyword-Recherche durch, um die relevantesten Schlüsselwörter für Ihre Website zu identifizieren und sie in den Inhalt und die Struktur der Website zu integrieren. Darüber hinaus arbeiten wir an der technischen Optimierung der Website, um das Ranking in Suchmaschinen zu verbessern."} 
                                hash={"seo"}
                                image={"/process/seo.webp"}
                                alt={"SEO"}
                                number={5}
                            />
                            <ProcessItem 
                                title={"Marketing"}
                                description={'Wir bieten Content-Marketing-Dienstleistungen an, die die Erstellung eines Blogs, die Verwaltung sozialer Netzwerke und die Entwicklung von E-Mail-Marketingkampagnen umfassen. Wir erstellen hochwertige, relevante Inhalte, die Ihre Zielgruppe ansprechen und ihr einen Mehrwert bieten. Wir arbeiten mit Ihnen zusammen, um die effektivste Content-Strategie für Ihr Unternehmen oder Projekt zu definieren.'} 
                                hash={"marketing"}
                                image={"/process/marketing.webp"}
                                alt={"Marketing"}
                                number={6}
                            />
                            <ProcessItem 
                                title={"Wartung"}
                                description={"Die Wartung der Website ist entscheidend, um ihre Sicherheit und Effizienz zu gewährleisten. Wir führen regelmäßig Software- und Sicherheitsupdates durch, um die Website auf dem neuesten Stand zu halten und vor Online-Bedrohungen zu schützen. Wir bieten auch technischen Support an, um Ihnen bei Problemen mit der Website zu helfen."} 
                                number={7}
                                hash={"maintenance"}
                                image={"/process/maintenance.webp"}
                                alt={"Maintenance"}
                                last={true}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function ProcessItem({ title, description, number, hash, last, image, alt }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex items-start gap-20">
            <div className="flex items-start gap-5 py-5" id={`${hash}-section`}>
                <div className="flex flex-col items-center gap-10">
                    <div className={`text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>{number}.</div>
                    <div className={`${last ? 'w-0' : 'w-[1px]'} h-36 bg-primary-2 opacity-30`}></div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</div>
                    <div className={`${darkMode ? 'description-dark' : 'description-light'} text-ellipsis-4`}>{description}</div>
                </div>
            </div>
            <div className="hidden lg:block">
                <Image className="max-w-[20rem]" src={image} width={200} height={200} priority alt={alt} />
            </div>
        </div>
    )
}