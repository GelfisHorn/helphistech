
// Nextjs
import Link from "next/link";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
import Image from "next/image";
// Styles
import styles from "./Index.module.css";

export default function Projects() {

    const { darkMode } = useContextProvider();

    return (
        <section className={`${darkMode ? 'bg-[#101010]' : 'bg-white'}`}>
            <div className={"flex flex-col items-center gap-14 px-6 sm:px-10 py-28 text-center"}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                        <div className={"flex flex-col gap-5"}>
                            <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>einige Designs</div>
                            <h2 className={"text-3xl sm:text-5xl font-bold"}>Beispiele unserer kreativen Kraft</h2>
                        </div>
                        <p className={`${darkMode ? "description-dark" : "description-light"}`}>Entdecken Sie Spitzenleistungen in der Webentwicklung mit Projekten, die Innovation, Funktionalität und fesselndes Design widerspiegeln und Ideen in außergewöhnliche Erlebnisse verwandeln.</p>
                    </div>
                </div>
                <div className={"hidden xl:grid grid-cols-2 grid-rows-16 gap-4 w-full h-[60rem] max-w-7xl mx-auto"}>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden col-start-1 col-end-2 row-start-1 row-end-6 ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl`}>
                        <Image loading={"eager"} src={"/website/vertical-1.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden col-start-2 col-end-3 row-start-1 row-end-4 ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl`}>
                        <Image loading={"eager"} src={"/website/horizontal-1.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>

                    <div className={`border-2 ${styles.imageContainer} overflow-hidden col-start-1 col-end-2 row-start-6 row-end-[9] ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl`}>
                        <Image loading={"eager"} src={"/website/horizontal-2.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden col-start-2 col-end-3 row-start-4 row-end-[9] ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl`}>
                        <Image loading={"eager"} src={"/website/vertical-2.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                </div>
                <div className={"xl:hidden grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-3 aspect-[7/16] md:aspect-video w-full"}>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl aspect-video`}>
                        <Image loading={"eager"} src={"/website/vertical-1.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl aspect-video`}>
                        <Image loading={"eager"} src={"/website/horizontal-1.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>

                    <div className={`border-2 ${styles.imageContainer} overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl aspect-video`}>
                        <Image loading={"eager"} src={"/website/horizontal-2.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                    <div className={`border-2 ${styles.imageContainer} overflow-hidden ${darkMode ? "bg-neutral-800 border-neutral-200" : "bg-neutral-200"} rounded-xl aspect-video`}>
                        <Image loading={"eager"} src={"/website/vertical-2.webp?v=1"} className={styles.image} fill alt={"Website Landing page"} />
                    </div>
                </div>
            </div>
        </section>
    )
}