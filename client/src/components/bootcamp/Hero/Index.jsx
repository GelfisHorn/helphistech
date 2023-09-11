
// Nextjs
import Link from 'next/link';
// Styles
import styles from './Index.module.css'
// Hooks
import useContextProvider from '@/hooks/useAppContextProvider'

export default function BootcampHero({ lang }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`${styles.backgroundImage}`}>
            <div className={`grid place-content-center min-h-[45rem] w-1/2 mx-auto relative`} style={{ zIndex: 1, height: 'calc(100vh - 5rem)' }}>
                <div className={"flex flex-col items-center gap-8 text-center"}>
                    <h1 className={"text-4xl leading-[3rem] sm:text-5xl sm:leading-[3.6rem] 2xl:text-6xl 2xl:leading-[4.5rem] text-neutral-200"}>Aprende <span className={"text-primary"}>desarrollo web</span> en sólo <span className={"border-b-[3px] border-primary whitespace-nowrap text-[#beb1ff]"}>3 meses</span>!</h1>
                    <p className={`text-neutral-300 sm:text-lg`}>Aprende desarrollo web de forma intensiva y comienza tu carrera en el sector tecnológico. Aprenda habilidades esenciales en un tiempo récord.</p>
                    <Link href={"/bootcamp#contact"} className={"text-neutral-200 flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-primary hover:bg-primary-2 transition-colors w-fit rounded-full text-lg"}>
                        <span>Empieza ahora</span>
                        <i className="fa-light fa-arrow-up-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}