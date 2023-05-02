// Layout
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Image from "next/image";
import Link from "next/link";

export default function TechnologiesPage() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return(
        

        <Layout title={"Die Technologien, die wir verwenden"} lang={'de'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-28">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Dies sind die Technologien, die wir am häufigsten verwenden</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">Wir bei HelphisTech sind bestrebt, qualitativ hochwertige Software unter Verwendung innovativer Technologien und modernster Tools bereitzustellen. Unser Entwicklerteam verwendet für jedes spezifische Projekt die richtigen Tools. Zu den von uns verwendeten Technologien gehören React, Nextjs, Angular, Nodejs, Express, MongoDB und MySQL. Wir bei HelphisTech glauben, dass Technologie ein mächtiges Werkzeug ist, um Innovation und Effizienz voranzutreiben, und wir streben danach, die besten Lösungen für jedes Projekt zu verwenden, das wir in Angriff nehmen.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 gap-y-20`}>
                                <TechnologyItem 
                                    image={"/technologies/react.webp"}
                                    imageAlt={"React image"}
                                    description={"React ist eine von Facebook erstellte JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen (UI) in Webanwendungen. Es konzentriert sich auf die Erstellung wiederverwendbarer UI-Komponenten und verwendet eine Syntax namens JSX, um HTML und JavaScript zu kombinieren."}
                                    href={"https://react.dev"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nextjs.webp"}
                                    darkImg={"/technologies/darkmode/nextjs.webp"}
                                    imageAlt={"Next.js image"}
                                    description={"Next.js ist ein React-basiertes JavaScript-Framework, das zum Erstellen moderner serverseitiger und clientseitiger Webanwendungen verwendet wird. Es wurde von Vercel erstellt und sein Hauptziel ist es, eine schnelle, einfache und skalierbare Webentwicklungserfahrung bereitzustellen."}
                                    href={"https://nextjs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/angular.webp"}
                                    imageAlt={"Angular image"}
                                    description={"Angular ist ein von Google verwaltetes Webentwicklungs-Framework zum Erstellen dynamischer Single-Page-Webanwendungen (SPAs). Angular bietet ein Framework für die Entwicklung von Webanwendungen, mit dem Entwickler hochgradig skalierbare und wartbare Anwendungen erstellen können."}
                                    href={"https://angular.io"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/vuejs.webp"}
                                    imageAlt={"Vuejs image"}
                                    description={"Vue.js ist ein JavaScript-Framework, das zum Erstellen von Benutzeroberflächen und Single-Page-Anwendungen (SPAs) verwendet wird. Wie Angular und React konzentriert sich Vue.js auf die Erstellung hochskalierbarer und dynamischer Webanwendungen."}
                                    href={"https://vuejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/astro.webp"}
                                    darkImg={"/technologies/darkmode/astro.webp"}
                                    imageAlt={"Astro image"}
                                    description={'Astro ist ein neues Webentwicklungs-Framework, das kürzlich im Jahr 2021 vom Zahlungstechnologieunternehmen „Stripe“ eingeführt wurde. Astro ermöglicht die Erstellung moderner und schneller Webanwendungen unter Verwendung von Standard-Webtechnologien wie HTML, CSS und JavaScript sowie die Verwendung wiederverwendbarer Komponenten.'}
                                    href={"https://astro.build"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/tailwind.webp"}
                                    darkImg={"/technologies/darkmode/tailwind.webp"}
                                    imageAlt={"Tailwind image"}
                                    description={"Tailwind CSS ist ein Design-Framework, das zur Entwicklung benutzerdefinierter und skalierbarer Web-Benutzeroberflächen verwendet wird. Im Gegensatz zu anderen Design-Frameworks wie Bootstrap oder Foundation konzentriert sich Tailwind CSS auf die Bereitstellung von Low-Level-Tools zum Entwerfen benutzerdefinierter UI-Komponenten."}
                                    href={"https://tailwindcss.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nodejs.webp"}
                                    darkImg={"/technologies/darkmode/nodejs.webp"}
                                    imageAlt={"Nodejs image"}
                                    description={"Node.js ist eine JavaScript-Laufzeitumgebung, die hauptsächlich auf der Serverseite verwendet wird, um schnelle und skalierbare Webanwendungen zu erstellen. Node.js verwendet die V8-JavaScript-Engine von Google, die im Chrome-Browser verwendet wird, um JavaScript-Code auf dem Server auszuführen."}
                                    href={"https://nodejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mongodb.webp"}
                                    imageAlt={"Mongodb image"}
                                    description={"MongoDB ist eine NoSQL-Datenbank zum Speichern und Abrufen von Daten in Web- und Mobilanwendungen. Im Gegensatz zu herkömmlichen relationalen Datenbanken wie MySQL und PostgreSQL, die Tabellen und Schemas verwenden, verwendet MongoDB ein Dokumentensammlungsmodell."}
                                    href={"https://www.mongodb.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mysql.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"MySQL ist ein relationales Datenbankverwaltungssystem, das zum Speichern und Abrufen von Daten in Software- und Webanwendungen verwendet wird. MySQL verwendet die strukturierte Abfragesprache (SQL)."}
                                    href={"https://www.mysql.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/socketio.webp"}
                                    darkImg={"/technologies/darkmode/socketio.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"Socket.IO ist eine JavaScript-Bibliothek, die eine Echtzeitkommunikation zwischen dem Server und dem Client in Webanwendungen ermöglicht. Socket.IO basiert auf dem WebSockets-Protokoll und stellt eine Abstraktionsschicht bereit, um die Implementierung der bidirektionalen Kommunikation zwischen dem Server und dem Client zu vereinfachen."}
                                    href={"https://socket.io"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/html.webp"}
                                    imageAlt={"HTML image"}
                                    description={"HTML ist eine Auszeichnungssprache, die zur Erstellung von Webseiten verwendet wird. Sie dient zur Definition der Struktur und des Inhalts einer Seite sowie zur Definition der Präsentation des Inhalts in einem Webbrowser. HTML ist ein wichtiger Bestandteil der Webtechnologie und wird in Verbindung mit anderen Sprachen wie CSS und JavaScript verwendet, um interaktive und dynamische Webseiten zu erstellen."}
                                    href={"#"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/css.webp"}
                                    imageAlt={"CSS image"}
                                    description={"CSS ist eine Gestaltungssprache, die verwendet wird, um zu beschreiben, wie HTML-Inhalte auf einer Webseite präsentiert werden. Sie wird verwendet, um das visuelle Erscheinungsbild einer Webseite zu definieren, einschließlich Farben, Typografie, Layout und anderen Aspekten der Präsentation."}
                                    href={"#"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function TechnologyItem({ image, darkImg, imageAlt, description, href }) {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return (
        <div className={``}>
            <div className="flex flex-col gap-5">
                <div className={`grid place-content-center aspect-square ${darkMode ? 'bg-[#101010]' : 'bg-[#E9E9E9]'}`}>
                    <div className={`grid place-content-center aspect-square border ${darkMode ? 'border-[#222222]' : 'border-white'} m-10 px-5 sm:px-10`}>
                        { darkMode && darkImg ? (
                            <Image src={darkImg} width={400} height={250} alt={imageAlt} />
                        ) : (
                            <Image src={image} width={400} height={250} alt={imageAlt} />
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center text-center gap-5">
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
                    <Link href={href} target="_blank" className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors hover:underline">
                        <div>Mehr sehen</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}