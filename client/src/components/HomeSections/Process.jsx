import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProcessSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-process">
            <div className="flex flex-col gap-20 max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex flex-col gap-5 items-center sm:items-start">
                    <div className="blur-shadow -left-28 -top-28 -z-10"></div>
                    <div className="flex flex-col">
                        <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Entwicklungsprozess</span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div>
                            <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                <div className="hidden xs:block">Wie der <span className="text-primary">Entwicklung</span></div>
                                <div className="hidden xs:block">prozess funktioniert</div>
                                <div className="xs:hidden">Wie der</div>
                                <div className="xs:hidden text-primary">Entwicklung</div>
                                <div className="xs:hidden">prozess</div>
                                <div className="xs:hidden">funktioniert</div>
                            </h2>
                        </div>
                        <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                            <p className="text-center sm:text-left">Wenn Sie für Ihr Unternehmen oder Projekt eine effektive Online-Präsenz benötigen, ist eine Website ein wesentlicher Bestandteil des Prozesses. Hier ist eine Aufschlüsselung des Webentwicklungsprozesses, damit Sie wissen, was Sie erwartet, wenn Sie mit uns zusammenarbeiten.</p>
                        </div>
                    </div>
                </div>
                <div className="pb-10 overflow-x-scroll w-full">
                    <div className="flex items-start gap-20 w-[186.66rem] 2xl:w-[210rem]">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>1.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>2.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>3.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Planung"}
                                    description={"Wir arbeiten mit Ihnen zusammen, um Ihre Bedürfnisse und Ziele für die Website zu verstehen. Anschließend entwerfen und entwickeln wir eine Website, die Ihren Bedürfnissen und Wünschen entspricht, einschließlich der Funktionalität, des Aussehens und des Verhaltens, die Sie wünschen."} 
                                    hash={"plan"}
                                />
                                <ProcessItem 
                                    title={"Design und Prototyping"}
                                    description={"Sobald wir verstanden haben, was Sie brauchen, erstellen wir mit Figma oder einem ähnlichen Tool einen Prototyp Ihrer Website. Dieser Prototyp zeigt das Erscheinungsbild und Verhalten der Website. Wenn Ihnen etwas nicht gefällt oder Sie etwas ändern möchten, erledigen wir das hier, bevor wir mit dem nächsten Schritt fortfahren."} 
                                    hash={"design"}
                                />
                                <ProcessItem 
                                    title={"Backend-Entwicklung"}
                                    description={`Nach dem Design und dem Prototyping arbeiten wir an dem Teil der Website, der als Backend bezeichnet wird und den Serverbetrieb abwickelt. Wir verwenden moderne und zuverlässige Technologien, um einen reibungslosen Betrieb zu gewährleisten und Inhalte zu speichern und Datenbanken zu verwalten.`} 
                                    hash={"backend"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>4.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>5.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>6.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Frontend-Entwicklung"}
                                    description={"Das Frontend ist der Teil der Website, den Benutzer sehen und mit dem sie interagieren. Hier erstellen wir die Benutzeroberfläche der Website mit HTML, CSS und JavaScript. Wir stellen sicher, dass die Website responsive ist und auf jedem Gerät gut aussieht."} 
                                    hash={"frontend"}
                                />
                                <ProcessItem 
                                    title={"SEO-Optimierung"}
                                    description={"Damit die Leute Ihre Website finden, optimieren wir sie für Suchmaschinen. Wir führen Keyword-Recherchen durch, um sicherzustellen, dass Ihre Website für die Suchbegriffe optimiert ist, die für Ihr Unternehmen oder Projekt am wichtigsten sind."} 
                                    hash={"seo"}
                                />
                                <ProcessItem 
                                    title={"Marketing"}
                                    description={'Wenn Sie möchten, dass mehr Menschen Ihre Website besuchen, können wir Ihnen beim Online-Marketing helfen. Dies kann Werbung auf Google Ads und Meta-Anzeigen sowie Social-Media-Marketing umfassen.'} 
                                    hash={"marketing"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>7.</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-20">
                                <ProcessItem 
                                    title={"Wartung"}
                                    description={"Sobald Ihre Website online ist, arbeiten wir weiterhin mit Ihnen zusammen, um sie auf dem neuesten Stand zu halten und zu optimieren. Wir führen regelmäßig Sicherheits- und Software-Updates durch, um sicherzustellen, dass Ihre Website vor Online-Bedrohungen geschützt und benutzerfreundlich bleibt."} 
                                    hash={"maintenance"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ProcessItem({ title, description, hash }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className="text-xl">{title}</div>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} text-ellipsis-4`}>{description}</div>
            <Link className="w-fit" href={`/custom-web-entwicklung#${hash}`}>
                <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                    <div>Mehr sehen</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </Link>
        </div>
    )
}