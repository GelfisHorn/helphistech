import { useEffect } from "react";
// Nextjs
import Image from "next/image";
import Link from "next/link";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Layout from "@/components/Layout";
import Button from "@/components/ArrowButton";
import BottomContact from "@/components/BottomContact";
// Animations
import { motion } from "framer-motion";

export default function CustomWebDevelopment() {
    
    const { darkMode } = useContextProvider();

    function scrollTo(hash) {
        const element = document.getElementById(`${hash}-section`);
        if(element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const hash = location.hash;
        if(hash) {
            scrollTo(hash.split('#')[1]);
        }
    }, [])

    return (
        <Layout title={"Our work process"} lang={'en'}>
            <main>
                <div className="flex flex-col">
                    <div className={`flex flex-col gap-10 w-full text-center xs:text-left px-6 sm:px-10 lg:px-20 2xl:px-40 pt-28 pb-20 2xl:pt-36 2xl:pb-24`}>
                        <motion.div  initial={{ x:-40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                            <h1 className="w-full">Our work process</h1>
                        </motion.div>
                        <motion.div  initial={{ x:40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }}>
                            <p>If you need an effective online presence for your business or project, a website is a vital part of the process.</p>
                            <p>Here's a breakdown of the web development process so you know what to expect when working with us.</p>
                        </motion.div>
                    </div>
                    <div className={`grid grid-cols-1 gap-20 ${darkMode ? 'bg-[#080808]' : 'bg-neutral-100'} px-6 sm:px-10 lg:px-20 2xl:px-40 pt-10 pb-28`}>
                        <div className={"flex justify-center"}>
                            <Button text={"BOOK A FREE CONSULTATION"} toRight={true} link={"/en/contact"} classes={"text-sm xs:text-base px-3 xs:px-4 py-1 xs:py-2 rounded-full"} />
                        </div>
                        <div className="grid grid-rows-7 gap-5">
                            <ProcessItem 
                                title={"Kick-off Meeting and Planning"}
                                description={"In this phase, we meet with you to learn about your needs and goals for the website. We listen to your ideas and requirements and integrate them into a work plan that we present to you for your approval. We work with you to design and develop a strategy that meets your needs."} 
                                hash={"plan"}
                                image={"/process/idea.webp"}
                                alt={"Idea"}
                                number={1}
                            />
                            <ProcessItem 
                                title={"Design and Prototyping"}
                                description={"We created a prototype of the website using design tools like Figma. This prototype shows the appearance and behavior of the website, including its design, functionality and navigation. Through prototyping, we can iterate and tweak the design until it meets your needs."} 
                                hash={"design"}
                                image={"/process/prototype.webp"}
                                alt={"Prototype"}
                                number={2}
                            />
                            <ProcessItem 
                                title={"Development"}
                                description={`After the successful approval of the design, we implement the development of your application or website in several steps. First, we conduct careful planning and analysis to fully understand your unique needs. We then design the technical architecture and develop both the frontend and the backend of your application. To ensure everything works smoothly, we conduct extensive testing in a production environment. Once your application is running successfully in the production environment, we provide your application or website with free hosting and domain for 12 months.`} 
                                hash={"backend"}
                                image={"/process/backend.webp"}
                                alt={"Backend"}
                                number={3}
                            />
                            <ProcessItem 
                                title={"Maintenance"}
                                description={"Website maintenance is crucial to ensure its security and efficiency. We make regular software and security updates to keep the website up-to-date and protected against online threats. We also offer technical support services to help you with any problems you may have with the website."} 
                                number={4}
                                hash={"maintenance"}
                                image={"/process/maintenance.webp"}
                                alt={"Maintenance"}
                                last={true}
                            />
                        </div>
                        <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                            <div className="flex justify-center">
                                <Link href="/en/contact" className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors">
                                    <span>Contact us</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                        <BottomContact blog={{ title: 'Process', url: '' }} language={"en"} />
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function ProcessItem({ title, description, number, hash, last, image, alt }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex items-start gap-20">
            <div className="flex items-start gap-5 py-5" id={`${hash}-section`}>
                <div className="flex flex-col items-center gap-10">
                    <div className={`text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>{number}.</div>
                    <div className={`${last ? 'w-0' : 'w-[1px]'} h-36 bg-primary-2 opacity-30`}></div>
                </div>
                <div className="flex flex-col gap-3">
                    <motion.div  initial={{ x:-40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{title}</div>
                    </motion.div>
                    <motion.div  initial={{ x:40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                        <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
                    </motion.div>
                </div>
            </div>
            <div className="hidden lg:block">
                <motion.div initial={{ y: 70, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} viewport={{ once: true }}>
                    <Image className="max-w-[20rem]" src={image} width={200} height={200} priority alt={alt} />
                </motion.div>
            </div>
        </div>
    )
}