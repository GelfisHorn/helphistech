import { useRef, useState } from "react";
// Nextjs
import Image from "next/image";
import Link from "next/link";
// Components
import Navbar from "@/components/es/Navbar";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function HeroSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className={'relative overflow-hidden'} id="hero">
            <Image className="absolute top-0 w-full h-full object-cover" src={`${darkMode ? '/home/hero/wave/dark/wave.webp' : '/home/hero/wave/light/wave.webp'}`} fill={true} alt="" priority={true} />
            <Navbar />
            <section className="relative flex items-center justify-center px-6 sm:px-10 lg:px-20 2xl:px-0 min-h-[57rem] sm:min-h-[55rem] md:min-h-[65rem] lg:min-h-[75rem] xl:min-h-[50rem]" style={{height: 'calc(100vh - 5rem)', zIndex: '1'}}>
                <div className="max-w-7xl 2xl:max-w-[90rem] flex flex-col xl:flex-row items-center gap-12 2xl:gap-20 w-full">
                    <div className="flex flex-col gap-10 text-center xl:text-left xl:max-w-[33rem] 2xl:max-w-[37rem]">
                        <div className={`flex flex-col gap-5`}>
                            <h1 className={`${darkMode ? 'title-dark' : 'title-light'} text-4xl leading-[4rem] md:text-5xl md:leading-[4.5rem] lg:text-6xl lg:leading-[5rem] 2xl:text-7xl 2xl:leading-[5.5rem] font-bold`}>Desarrollo web personalizado para tu negocio</h1>
                            <p className={`${darkMode ? 'description-dark font-light' : 'description-light'} 2xl:text-lg`}>Ofrecemos soluciones personalizadas para ayudar a que su empresa se destaque en línea. Desde el diseño y desarrollo de sitios web hasta la programación de aplicaciones y la optimización de motores de búsqueda, nuestro equipo de expertos puede ayudarlo a alcanzar sus objetivos en línea.</p>
                        </div>
                        <div className="flex justify-center xl:justify-start">
                            <Link href={"/es/contacto"}>
                                <button className="btn-primary text-white uppercase w-fit py-4 px-8 font-medium bg-primary hover:bg-primary-2 transition-colors 2xl:text-lg rounded-sm">Start a project with us</button>
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <VideoPlayer 
                            url={"https://res.cloudinary.com/drdor2wz7/video/upload/v1681591174/helphistech_eynapv.mp4"} 
                        />
                    </div>
                </div>
            </section>
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