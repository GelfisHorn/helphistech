import { useEffect, useRef, useState } from "react";
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
import Button from "../ArrowButton";

export default function HeroSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();
    
	const [ showModal, setShowModal ] = useState(false);
	const [ countDown, setCountDown ] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	useEffect(() => {
		getCountDown();
	}, [])

	const handleShowModal = () => {
		setShowModal(!showModal);
	}

	const redirectToSection = (hash) => {
		const element = document.getElementById(`${hash}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	const getCountDown = () => {
		// Set the date we're counting down to
		var countDownDate = new Date("Jul 14, 2023 11:00:00").getTime();

		// Update the count down every 1 second
		var x = setInterval(function () {

			// Get today's date and time
			var now = new Date().getTime();

			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if (days.toString().length == 1) days = `0${days}`
			if (hours.toString().length == 1) hours = `0${hours}`
			if (minutes.toString().length == 1) minutes = `0${minutes}`
			if (seconds.toString().length == 1) seconds = `0${seconds}`

			// Set result on countDown state
			setCountDown({ days, hours, minutes, seconds });

			// If the count down is finished, write some text
			if (distance < 0) {
				clearInterval(x);
			}
		}, 1000)
	}

    return (
		<div className={"hero-background overflow-hidden"}>
			<div className="relative overflow-hidden hidden sm:block" id="hero">
				<Navbar textColor={"text-dark"} />
				<section className="relative flex items-center justify-center px-6 sm:px-10 lg:px-20 2xl:px-0 min-h-[57rem] sm:min-h-[55rem] md:min-h-[65rem] lg:min-h-[75rem] xl:min-h-[50rem]" style={{ height: 'calc(100vh - 5rem)', zIndex: '1' }}>
					<div className="max-w-7xl 2xl:max-w-[90rem] flex flex-col xl:flex-row items-center gap-12 2xl:gap-20 w-full">
						<div className="flex flex-col gap-10 text-center xl:text-left xl:max-w-[33rem] 2xl:max-w-[40rem]">
							<motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: .8 }} viewport={{ once: true }} className={`flex flex-col gap-5`}>
								<h1 className={`title-dark text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] font-black uppercase break-word`}><span className="text-primary">Professionelle</span> Website Entwicklung</h1>
								<p className={`description-dark font-light 2xl:text-lg`}>Lassen Sie uns Ihre digitale Präsenz gemeinsam neu definieren. Unsere Experten für Website-Entwicklung begleiten Sie auf dem Weg zu einem herausragenden Online-Auftritt.</p>
							</motion.div>
							<div className="flex justify-center xl:justify-start">
								<button onClick={handleShowModal} className="btn-primary text-white uppercase w-fit py-2 sm:py-4 px-4 sm:px-8 font-medium bg-primary hover:bg-primary-2 transition-colors 2xl:text-lg rounded-full">Kostenloses Angebot erhalten</button>
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
				<div className={"min-h-[40rem]"} style={{ height: 'calc(100vh - 5rem)' }}>
					<div className={"flex flex-col justify-between h-full p-8 px-4 relative"}>
						<div className={"flex flex-col gap-3 text-center text-white"}>
							<h1 className={"text-3xl leading-[2.2rem] xs:text-4xl xs:leading-[2.8rem] text-center font-semibold text-white"}>Professionelle Website- und App-Entwicklung</h1>
							<div className={"flex flex-col"}>
								<p className={"font-light"}>Lassen Sie uns Ihre digitale Präsenz gemeinsam neu definieren. Unsere Experten für Website- und App-Entwicklung begleiten Sie auf dem Weg zu einem herausragenden Online-Auftritt.</p>
								<div className={"font-medium text-lg"}>Jetzt 10 % Rabatt sichern</div>
							</div>
							{/* <div className={"flex items-center justify-center gap-1 font-medium text-lg text-white"}>
								<div>
									<div className={"grid place-content-center border-2 border-white w-10 h-11 rounded-sm text-xl"}>{countDown.days}</div>
								</div>
								<div>
									<div className={"grid place-content-center border-2 border-white w-10 h-11 rounded-sm text-xl"}>{countDown.hours}</div>
								</div>
								<div>
									<div className={"grid place-content-center border-2 border-white w-10 h-11 rounded-sm text-xl"}>{countDown.minutes}</div>
								</div>
								<div>
									<div className={"grid place-content-center border-2 border-white w-10 h-11 rounded-sm text-xl"}>{countDown.seconds}</div>
								</div>
							</div> */}
						</div>
						<div className={"flex flex-col gap-5"}>
							<div className={"flex flex-col gap-3 w-full"}>
								<button onClick={() => redirectToSection("our-process")} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-2 w-full border-2 border-white"}>
									<span className={"font-light"}>Entwicklungsprocess</span>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
									</svg>
								</button>
								<button onClick={() => redirectToSection("our-services")} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-2 w-full border-2 border-white"}>
									<span className={"font-light"}>Dienstleistungen</span>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
									</svg>
								</button>
							</div>
							<button onClick={handleShowModal} className={"flex items-center gap-1 justify-center text-lg text-white rounded-full py-3 w-full bg-[#866bfef1]"}>
								<span className={"font-light"}>Kostenloses Angebot erhalten</span>
							</button>
							<div className={"flex items-center gap-1 gap-y-0 flex-wrap justify-center"}>
								<p className={"text-white"}>Haben Sie bereits ein Projekt?</p>
								<Link href={"/login"} className={"text-white underline"}>Anmelden</Link>
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