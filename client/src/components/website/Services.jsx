import { useEffect, useState } from "react";
// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Components
import VideoCallModal from "../Modals/VideoCall/Index";

export default function ServicesSection({ services }) {
    
    const [servicesDesktop, setServicesDesktop] = useState([]);
    const [servicesMobile, setServicesMobile] = useState([]);
    const [showedMoreServices, setShowedMoreServices] = useState(false);

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    const [windowSize, setWindowSize] = useState(1000);

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        setServicesDesktop(services.slice(0, 6));
        setServicesMobile(services.slice(0, 3));
        
        setWindowSize(getWindowSize());

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowSize() {
        if (typeof window !== 'undefined') {
            const { innerWidth } = window;
            return innerWidth;
        }
        return 1000
    }

    function showMoreServices() {
        setShowedMoreServices(true);
        if(servicesMobile.length === 9) {
            return;
        }
        if (servicesMobile.length == 3) {
            setServicesMobile(services.slice(0, 6));
            return;
        }

        if (servicesMobile.length == 6) setServicesMobile(services.slice(0, 9));
    }

    function showLessServices() {
        if (servicesMobile.length == 3) {
            setShowedMoreServices(false);
            return;
        }
        if (servicesMobile.length == 6) {
            setServicesMobile(services.slice(0, 3));
            return;
        }

        if (servicesMobile.length >= 7) setServicesMobile(services.slice(0, 6));
    }

    const slashMotion = {
        rest: { opacity: 1, x: 0, ease: "easeOut", duration: 0.1, type: "tween" },
        hover: {
            x: 5,
            transition: {
                duration: 0.1,
                type: "tween",
                ease: "easeIn"
            }
        }
    };

    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'bg-[#101010]' : 'section-bg-light'} py-28 overflow-hidden`} id="our-services">
            <AnimatePresence>
                {showModal && <VideoCallModal closeVideoCallForm={handleShowModal} language={'de'} />}
            </AnimatePresence>
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex items-center gap-20 justify-between w-full">
                    {/* <div className="blur-shadow -left-28 -top-28"></div> */}
                    <div className="flex flex-col gap-20">
                        <motion.div
                            initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .9 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-5 relative"
                        >
                            <div className="flex flex-col">
                                <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Blogs</span>
                            </div>
                            <div className="flex flex-col gap-8 text-center">
                                <h2 className={"text-3xl sm:text-5xl font-bold"}>Die Welt der <span className={"text-primary"}>Webentwicklung</span> erkunden</h2>
                                <p className={`${darkMode ? "description-dark" : "description-light"}`}>Entdecke die neuesten Trends, Tipps und Techniken in der Webentwicklung. Von Design bis zur Programmierung erhältst du wertvolle Einblicke, um beeindruckende und funktionale Websites zu erstellen.</p>
                            </div>
                        </motion.div>
                        <div className={"flex flex-col gap-5"}>
                            <div className={"flex justify-end"}>
                                <Link href={"/internetseite"}>
                                    <div onClick={showMoreServices} className="flex items-center gap-1 text-primary hover:text-primary-2 hover:underline transition-colors">
                                        <div>Alles sehen</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10">
                                    <AnimatePresence>
                                        {servicesDesktop && servicesDesktop.length != 0 && windowSize > 768 && servicesDesktop.map((service, index) => (
                                            <Service key={index} service={service} />
                                        ))}
                                        {servicesMobile && servicesMobile.length != 0 && windowSize < 768 && servicesMobile.map((service, index) => (
                                            <Service key={index} service={service} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {(!services || services.length == 0) && (
                                    <div className={`flex ${darkMode ? 'description-dark' : 'description-light'}`}>
                                        <div className={"flex flex-col gap-2"}>
                                            <p>Beim Abrufen der Dienste ist ein Problem aufgetreten.</p>
                                            <div>
                                                <p>Möchten Sie sehen, was wir Ihnen zu bieten haben?</p>
                                                <Link href={"/internetseite"} className={"flex items-center gap-1 text-primary hover:text-primary-2"}>
                                                    <span>Gehen Sie zu Dienstleistungen</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <div className={`flex flex-col divide-y`}>
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
                        </div> */}
                            {/* <div className={"hidden sm:flex justify-end"}>
                                {servicesDesktop.length < services.length && (
                                    <button onClick={showMoreServices} className="flex items-center gap-1 text-primary hover:text-primary-2 hover:underline transition-colors">
                                       <div>Weitere Dienstleistungen ansehen</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg> 
                                    </button>
                                )}
                                {(servicesDesktop.length == services.length && showedMoreServices) && (
                                    <button onClick={showLessServices} className="flex items-center gap-1 text-primary hover:text-primary-2 hover:underline transition-colors">
                                        <div>Weniger Dienste anzeigen</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rotate-180">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                )}
                            </div> */}
                            <div className={"flex sm:hidden justify-center"}>
                                {servicesMobile.length < services.length && (
                                    <button onClick={showMoreServices} className="flex items-center gap-1 text-primary hover:text-primary-2 hover:underline transition-colors">
                                        <div>Weitere Dienstleistungen ansehen</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                )}
                                {servicesMobile.length == services.length && (
                                    <button onClick={showLessServices} className="flex items-center gap-1 text-primary hover:text-primary-2 hover:underline transition-colors">
                                        <div>Weniger Dienste anzeigen</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rotate-180">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={'flex justify-center'}>
                            <motion.button onClick={handleShowModal} initial="rest" whileHover="hover" animate="rest" className={"flex items-center gap-1 bg-primary hover:bg-primary-2 transition-colors text-white py-2 px-3 sm:px-6 rounded-full uppercase sm:font-medium text-sm xs:text-base md:text-lg"}> 
                                <span>KOSTENLOSE BERATUNG BUCHEN</span>
                                <motion.svg variants={slashMotion} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </motion.svg>
                            </motion.button>
                            {/* <Link href={"/contact"}>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Service({ service }) {

    const { darkMode } = useContextProvider();

    const { url, title, subtitle, preview } = service.attributes || {};

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Link href={`/internetseite/${url}`} className="flex flex-col gap-3 hover:scale-[102%] transition-transform active:scale-100">
                <div className="image-container aspect-video">
                    <Image loading="eager" className="object-cover rounded-md" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
                </div>
                {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
                <div className="flex items-center justify-between gap-2">
                    <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                    <div className="w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </div>
                <div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
            </Link>
        </motion.div>
    )
}

/* function ServicesOption({ title, description, href }) {

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
} */