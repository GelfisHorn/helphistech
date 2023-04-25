// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function MyProjectSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();
    
    return (
        <section className="px-6 sm:px-10 lg:px-20 2xl:px-0 flex flex-col gap-16 py-28 text-center" id="my-project">
            <div className="flex flex-col gap-8">
                <div className={`${darkMode ? 'subtitle-dark' : 'subtitle-light'} text-lg uppercase font-semibold`}>
                    <span>Tienes una idea?</span>
                </div>
                <div className="lg:w-3/4 2xl:w-2/4 mx-auto">
                    <span className={`${darkMode ? 'title-dark' : 'title-light'} text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-semibold`}>Solo necesitamos una idea o un problema para que podamos llevar a cabo tu proyecto</span>
                </div>
            </div>
            <Link href={'/es/contacto'}>
                <button className="text-2xl transition-colors font-semibold border-b-2 border-primary text-primary hover:border-white hover:text-white" onClick={null}>Empezar mi proyecto</button>
            </Link>
        </section>
    )
}