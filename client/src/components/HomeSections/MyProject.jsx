// Nextjs
import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";

export default function MyProjectSection() {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className="px-6 sm:px-10 lg:px-20 2xl:px-0 flex flex-col gap-16 py-28 text-center bg-cover bg-fixed bg-center" id="my-project" style={{ backgroundImage: darkMode ? "url(home/waves-variant.svg)" : "url(home/waves-light.svg)" }}>
            <div className="flex flex-col gap-8">
                <div className={`${darkMode ? 'subtitle-dark' : 'subtitle-light'} text-lg uppercase font-semibold`}>
                    <span>Haben sie eine Idee?</span>
                </div>
                <motion.div 
                initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                viewport={{ once: true }}
                className="lg:w-3/4 2xl:w-2/4 mx-auto">
                    <span className={`${darkMode ? 'title-dark' : 'title-light'} text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] font-semibold`}>Wir brauchen nur eine Idee oder ein Problem, damit wir Ihr Projekt umsetzen können</span>
                </motion.div>
            </div>
            <motion.div
            initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1, delay: .2 }}
            viewport={{ once: true }}
            >
                <Link href={'/contact'}>
                    <button className="text-2xl transition-colors font-semibold border-b-2 border-primary text-primary hover:border-white hover:text-white" onClick={null}>Starten Sie Ihr Projekt</button>
                </Link>
            </motion.div>
        </section>
    )
}