import { useRef, useState } from "react";
// Nextjs
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import ContactModal from "../../Modals/Contact/Index";
// Animations
import { motion, AnimatePresence } from "framer-motion";
// Styles
import styles from './Index.module.css'

export default function HeroSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();
    
	const [ showModal, setShowModal ] = useState(false);

	const handleModal = {
		show: () => setShowModal(true),
		close: () => setShowModal(false)
	}

    return (
		<section className={`${styles.backgroundImage} overflow-hidden`}>
			<div className={"flex items-center gap-20 h-full place-content-center px-6 sm:px-20"} style={{ position: "relative", zIndex: "2" }}>
				<div className={"flex flex-col gap-14 justify-center items-center xl:items-start h-full text-center xl:text-left"}>
					<div className={"flex flex-col gap-3"}>
						<h1 className={"text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] font-black uppercase break-word"}><span className={"text-primary"}>Professionelle</span> Website Entwicklung</h1>
						<p className={"font-light md:text-lg w-full 2xl:w-2/3"}>Lassen Sie uns Ihre digitale Präsenz gemeinsam neu definieren. Unsere Experten für Website-Entwicklung begleiten Sie auf dem Weg zu einem herausragenden Online-Auftritt.</p>
					</div>
					<motion.button
						onClick={handleModal.show}
						className={"flex items-center gap-4 bg-primary hover:bg-primary-2 text-white transition-colors px-4 md:px-8 py-2 md:py-3 text-base sm:text-lg w-fit rounded-full"}
						initial={{ opacity: 0, x: 100 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: .2, origin: 1 }}
					>
						<div>Kostenlose Beratung buchen</div>
						<i className="fa-light fa-arrow-up-right"></i>
					</motion.button>
				</div>
				<motion.div
					className={`hidden xl:block ${styles.imageContainer}`}
					initial={{ opacity: 0, x: 50 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, origin: 1 }}
				>
					<Image src={"/website/side-image.webp"} className={`${styles.image}`} fill alt={"Side image"} />
				</motion.div>
			</div>
			<AnimatePresence>
				{showModal && (
					<ContactModal service={"Desarrollo de aplicaciones móviles"} handleClose={handleModal.close} language={'de'} />
				)}
			</AnimatePresence>
		</section>
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