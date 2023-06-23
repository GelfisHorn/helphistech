import { useEffect } from "react";
// Nextjs
import Image from "next/image";
import Link from "next/link";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/Layout";
import Button from "@/components/ArrowButton";
import BottomContact from "@/components/BottomContact";
// Animations
import { motion } from "framer-motion";

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
                    <div className={`flex flex-col gap-10 w-full text-center xs:text-left px-6 sm:px-10 lg:px-20 2xl:px-40 pt-28 pb-20 2xl:pt-36 2xl:pb-24`}>
                        <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                            <h1 className="w-full">Unser Arbeitsprozess</h1>
                        </motion.div>
                        <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`${darkMode ? 'description-dark' : 'description-light'}`}>
                            <p>Wenn Sie für Ihr Unternehmen oder Projekt eine effektive Online-Präsenz benötigen, ist eine Website ein wesentlicher Bestandteil des Prozesses.</p>
                            <p>Hier ist eine Aufschlüsselung des Webentwicklungsprozesses, damit Sie wissen, was Sie erwartet, wenn Sie mit uns zusammenarbeiten.</p>
                        </motion.div>
                    </div>
                    <div className={`grid grid-cols-1 gap-20 ${darkMode ? 'bg-[#080808]' : 'bg-neutral-100'} px-6 sm:px-10 lg:px-20 2xl:px-40 pt-10 pb-28`}>
                        <div className={"flex justify-center"}>
                            <Button text={"KOSTENLOSE BERATUNG BUCHEN"} toRight={true} link={"/contact"} classes={"text-sm xs:text-base px-3 xs:px-4 py-1 xs:py-2 rounded-full"} />
                        </div>
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
                                title={"Entwicklung"}
                                description={`Nach der erfolgreichen Freigabe des Designs setzen wir die Entwicklung Ihrer Anwendung oder Website in mehreren Schritten um. Zunächst führen wir eine sorgfältige Planung und Analyse durch, um Ihre individuellen Anforderungen vollständig zu verstehen. Anschließend entwerfen wir die technische Architektur und entwickeln sowohl das Frontend als auch das Backend Ihrer Anwendung. Um sicherzustellen, dass alles reibungslos funktioniert, führen wir umfangreiche Tests in einer Produktionsumgebung durch. Sobald Ihre Anwendung in der Produktionsumgebung erfolgreich läuft, stellen wir Ihre Anwendung oder Webseite mit kostenlosem Hosting und Domain für 12 Monate bereit.`} 
                                hash={"backend"}
                                image={"/process/backend.webp"}
                                alt={"Backend"}
                                number={3}
                            />
                            <ProcessItem 
                                title={"Wartung"}
                                description={"Die Wartung der Website ist entscheidend, um ihre Sicherheit und Effizienz zu gewährleisten. Wir führen regelmäßig Software- und Sicherheitsupdates durch, um die Website auf dem neuesten Stand zu halten und vor Online-Bedrohungen zu schützen. Wir bieten auch technischen Support an, um Ihnen bei Problemen mit der Website zu helfen."} 
                                number={4}
                                hash={"maintenance"}
                                image={"/process/maintenance.webp"}
                                alt={"Maintenance"}
                                last={true}
                            />
                        </div>
                        <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                            <div className="flex justify-center">
                                <Link href="/contact" className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors">
                                    <span>Kontaktiere uns</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                        <BottomContact blog={{ title: 'Process', url: '' }} language={"de"} />
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
                    <motion.div  initial={{ x:-40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</div>
                    </motion.div>
                    <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
                    </motion.div>
                </div>
            </div>
            <div className="hidden lg:block">
                <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                    <Image className="max-w-[20rem]" src={image} width={200} height={200} priority alt={alt} />
                </motion.div>
            </div>
        </div>
    )
}