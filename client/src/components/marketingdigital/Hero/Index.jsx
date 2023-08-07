
// React
import { useState } from 'react';
// Nextjs
import Image from 'next/image';
// Components
import VideoCallModal from '@/components/Modals/VideoCall/Index';
// Styles
import styles from './Index.module.css'
// Animations
import { AnimatePresence } from 'framer-motion';

export default function MDHero() {

    const [ showModal, setShowModal ] = useState(false);
    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    return (
        <section className={styles.backgroundImage}>
            <div className={"flex items-center gap-20 h-full place-content-center px-6 sm:px-20"} style={{ position: "relative", zIndex: "2" }}>
                <div className={"flex flex-col gap-14 justify-center items-center lg:items-start h-full text-center lg:text-left"}>
                    <div className={"flex flex-col gap-3"}>
                        <h1 className={"text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] font-black uppercase break-word"}>Mehr <span className="text-primary">Kunden</span>, mehr <span className="text-primary">Umsatz</span>: Die Macht des <span className="text-primary">Digital Marketings</span></h1>
                        <p className={"font-light md:text-lg"}>Steigern Sie Ihren Erfolg: Entdecken Sie die Macht des Digital Marketings für mehr Kunden und Umsatz!</p>
                    </div>
                    <button onClick={handleShowModal} className={"flex items-center gap-4 bg-primary hover:bg-primary-2 text-white transition-colors px-4 md:px-8 py-2 md:py-3 text-base sm:text-lg w-fit rounded-full"}>
                        <div>Kostenlose Beratung buchen</div>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </button>
                </div>
                <div className={"hidden xl:block image-container min-w-[30rem]"}>
                    <Image src={"/marketingdigital/side-image.webp?v=4"} className={"image"} fill alt={"Side image"} />
                </div>
            </div>
            <AnimatePresence>
                {showModal && (
                    <VideoCallModal closeVideoCallForm={handleShowModal} language={'de'} />
                )}
            </AnimatePresence>
        </section> 
    )
}