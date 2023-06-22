import { useRef, useState } from "react";
// Nextjs
import Image from "next/image";
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Navbar from "@/components/Navbar";
import ContactModal from "../Modals/Contact/Index";
// Animations
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();
    
	const [ showModal, setShowModal ] = useState(false);

	const handleShowModal = () => {
		setShowModal(!showModal);
	}

	const redirectToSection = (hash) => {
		const element = document.getElementById(`${hash}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

    return (
        <div className={"hero-background"}>
			<div className="relative overflow-hidden hidden sm:block" id="hero">
				<Navbar />
				<section className="relative flex items-center justify-center px-6 sm:px-10 lg:px-20 2xl:px-0 min-h-[57rem] sm:min-h-[55rem] md:min-h-[65rem] lg:min-h-[75rem] xl:min-h-[50rem]" style={{ height: 'calc(100vh - 5rem)', zIndex: '1' }}>
					<div className="max-w-7xl 2xl:max-w-[90rem] flex flex-col xl:flex-row items-center gap-12 2xl:gap-20 w-full">
						<div className="flex flex-col gap-10 text-center xl:text-left xl:max-w-[33rem] 2xl:max-w-[40rem]">
							<motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: .8 }} viewport={{ once: true }} className={`flex flex-col gap-5`}>
								<h1 className={`${darkMode ? 'title-dark' : 'title-light'} text-3xl leading-[4rem] md:text-4xl md:leading-[4.5rem] lg:text-5xl lg:leading-[5rem] 2xl:text-6xl 2xl:leading-[5.5rem] font-bold break-words`}>Maßgeschneiderte Webentwicklung für Ihr Unternehmen</h1>
								<p className={`${darkMode ? 'description-dark font-light' : 'description-light'} 2xl:text-lg`}>Wir bieten maßgeschneiderte Lösungen, mit denen sich Ihr Unternehmen online von der Masse abhebt. Von Website-Design und -Entwicklung bis hin zur App-Programmierung und Suchmaschinenoptimierung kann unser Expertenteam Ihnen helfen, Ihre Online-Ziele zu erreichen.</p>
							</motion.div>
							<div className="flex justify-center xl:justify-start">
								<button onClick={handleShowModal} className="btn-primary text-white uppercase w-fit py-2 sm:py-4 px-4 sm:px-8 font-medium bg-primary hover:bg-primary-2 transition-colors 2xl:text-lg rounded-sm">kostenloses Angebot erhalten</button>
								{/* <Link href={"/contact"}>
                            </Link> */}
							</div>
						</div>
						<motion.div initial={{ y: -60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: .2 }} viewport={{ once: true }} >
							<VideoPlayer
								url={"https://res.cloudinary.com/drdor2wz7/video/upload/v1681591174/helphistech_eynapv.mp4"}
							/>
						</motion.div>
					</div>
				</section>
			</div>
			<div className={"sm:hidden"}>
				<Navbar />
				<div className={"min-h-[36rem]"} style={{ height: 'calc(100vh - 5rem)' }}>
					<div className={"flex flex-col items-center h-full"}>
						<div className={"flex items-center h-full image-container"} style={{ width: '200px' }}>
							<Image className={"image"} src={"/logo/dark/full-logo.webp"} fill alt={"HelphisTech Logo"} />
						</div>
						<div className={"flex flex-col gap-5 justify-end h-full p-8 relative"}>
							<h1 className={"text-2xl xs:text-4xl text-center font-semibold text-white"}>Maßgeschneiderte Webentwicklung für Ihr Unternehmen</h1>
							<p className={"text-white text-center font-light"}>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto</p>
							<div className={"grid grid-cols-2 gap-3 w-full"}>
								<button onClick={() => redirectToSection("our-process")} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-2 w-full border-2 border-white"}>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
									</svg>
									<span className={"font-light"}>Proceso</span>
								</button>
								<button onClick={() => redirectToSection("our-services")} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-2 w-full border-2 border-white"}>
									<span className={"font-light"}>Servicios</span>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
									</svg>
								</button>
							</div>
							<button onClick={handleShowModal} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-3 w-full bg-[#866bfef1]"}>
								<span className={"font-light"}>Contactanos</span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
								</svg>
							</button>
							<div className={"flex items-center gap-2 gap-y-0 flex-wrap justify-center"}>
								<p className={"text-white"}>¿Ya tienes un proyecto?</p>
								<Link href={"/login"} className={"text-white underline"}>Inicia sesión</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{showModal && (
					<ContactModal blog={{ title: 'Home', url: "" }} handleClose={handleShowModal} language={'de'} />
				)}
			</AnimatePresence>
		</div>
    )
}

function VideoPlayer({ url }) {

	// Hero section video
	const video = useRef(null);
	const [ paused, setPaused ] = useState(true);

	function handlePlayVideo() {
		if(video.current.paused) {
			setPaused(false);
			video.current.play();
		} else {
			setPaused(true);
			video.current.pause();
		}
	}

	return (
		<div className="relative cursor-pointer xl:rounded-md" onClick={handlePlayVideo}>
			<div className={`${paused ? 'block' : 'hidden'}`}>
				<div className={`absolute top-0 left-0 w-full h-full bg-black opacity-70 xl:rounded-md`}></div>
				<div className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.7} stroke="currentColor" className="w-20 h-20 text-zinc-300">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
					</svg>

				</div>
			</div>
			<video ref={video} className="xl:rounded-md" width="100%" height="auto" loop controls controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" poster="/home/hero/video-preview/preview.webp">
				<source src={url} type="video/mp4" />
			</video>
		</div>
	)
}