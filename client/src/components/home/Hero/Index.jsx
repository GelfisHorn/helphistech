
// React
import { useRef, useState } from 'react';
// Nextjs
import Image from 'next/image';
// Components
import ContactModal from '@/components/Modals/Contact/Index';
// Styles
import styles from './Index.module.css'
// Animations
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeHero() {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <section className={styles.backgroundImage}>
            <div className={"flex items-center gap-20 h-full place-content-center px-6 sm:px-20"} style={{ position: "relative", zIndex: "2" }}>
                <div className={"flex flex-col gap-14 justify-center items-center lg:items-start h-full text-center lg:text-left"}>
                    <div className={"flex flex-col gap-3"}>
                        <h1 className={"text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] font-black uppercase break-word"}>Die Macht der <span className={"text-primary"}>Digitalisierung</span>: Kunden begeistern, Gewinne <span className={"text-primary"}>maximieren</span></h1>
                        <p className={"font-light md:text-lg"}>Erfolgreich in der digitalen Ära mit <span className={"font-semibold text-primary"}>HelphisTech</span></p>
                    </div>
                    <button onClick={handleShowModal} className={"flex items-center gap-4 bg-primary hover:bg-primary-2 text-white transition-colors px-4 md:px-8 py-2 md:py-3 text-base sm:text-lg w-fit rounded-full"}>
                        <div>Kostenloses Angebot erhalten</div>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </button>
                </div>
                <motion.div
                    className={"hidden xl:block image-container min-w-[30rem]"}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, origin: 1 }}
                >
                    <Image src={"/home/hero/side-image-1.webp?v=1005"} className={"image"} fill />
                </motion.div>
                {/* <div className={"hidden lg:block"}>
                    <VideoPlayer
                        url={"https://res.cloudinary.com/drdor2wz7/video/upload/v1681591174/helphistech_eynapv.mp4"}
                    />
                </div> */}
            </div>
            <AnimatePresence>
                {showModal && (
                    <ContactModal blog={{ title: 'Home', url: "" }} handleClose={handleShowModal} language={'de'} />
                )}
            </AnimatePresence>
        </section>
    )
}

function VideoPlayer({ url }) {

    // Hero section video
    const video = useRef(null);
    const [paused, setPaused] = useState(true);

    function handlePlayVideo() {
        if (video.current.paused) {
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