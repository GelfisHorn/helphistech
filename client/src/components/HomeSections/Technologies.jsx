// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function TechnologiesSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`relative overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 px-6 sm:px-10 lg:px-20 2xl:px-0 border-t`} id="our-technologies">
            <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                <div className="blur-shadow -top-6 -left-6"></div>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto flex flex-col gap-20 overflow-hidden">
                    <div className="flex flex-col gap-4 text-white relative">
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-5">
                            <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Unsere Technologien</span>
                            <h2 className={`flex flex-col items-center sm:items-start gap-2 sm:gap-3 text-3xl sm:text-5xl font-bold ${darkMode ? 'title-dark' : 'title-light'}`}>
                                <div className="flex flex-col md:flex-row gap-3 sm:gap-5 md:gap-2">Dies sind die <span className="text-primary">Technologien</span></div> 
                                <div className="leading-[3rem] sm:leading-[4rem]">die wir am häufigsten verwenden</div>
                            </h2>
                        </div>
                        <div className={`2xl:text-lg ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                            <p className="text-center sm:text-left">Die passende Technologie bereichert das Projekt. Hier sind einige von denen, die wir am häufigsten verwenden:</p>
                        </div>
                    </div>
                    <div className="overflow-x-scroll hide-scroll">
                        <div className="grid grid-cols-5 gap-y-10 gap-x-14 xl:gap-x-28 select-none min-w-[60rem]">
                            <TechnologyImage src={"/technologies/react.webp"} alt={"React technology image"} />
                            <TechnologyImage src={"/technologies/nextjs.webp"} alt={"Next js technology image"} darkmode={"/technologies/darkmode/nextjs.webp"} />
                            <TechnologyImage src={"/technologies/angular.webp"} alt={"Angular technology image"} />
                            <TechnologyImage src={"/technologies/vuejs.webp"} alt={"Vue technology image"} />
                            <TechnologyImage src={"/technologies/astro.webp"} alt={"Astro technology image"} darkmode={"/technologies/darkmode/astro.webp"} />
                            <TechnologyImage src={"/technologies/tailwind.webp"} alt={"Tailwind technology image"} />
                            <TechnologyImage src={"/technologies/nodejs.webp"} alt={"Node js technology image"} darkmode={"/technologies/darkmode/nodejs.webp"} />
                            <TechnologyImage src={"/technologies/mongodb.webp"} alt={"MongoDB technology image"} />
                            <TechnologyImage src={"/technologies/mysql.webp"} alt={"MySQL technology image"} />
                            <TechnologyImage src={"/technologies/socketio.webp"} alt={"Socket.io technology image"} darkmode={"/technologies/darkmode/socketio.webp"} />
                        </div>
                    </div>
                    <Link className="flex justify-center" href={"/technologien"}>
                        <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                            <div>Mehr Erfahren</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

// Technology image of Technologies section.
function TechnologyImage({ src, alt, darkmode }) {
	
	const { darkMode } = useContextProvider();

	return darkmode && darkMode ? (
		<div>
			<Image src={darkmode} width={166} height={104} alt={alt} />
		</div>
	) : (
		<div>
			<Image src={src} width={166} height={104} alt={alt} />
		</div>
	)
}