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
                            <Button text={"BOOK A FREE CONSULTATION"} toRight={true} link={"/en/contact"} classes={"px-4 py-2 rounded-full"} />
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
                                title={"Back-end Development"}
                                description={`In this phase, we work on the development of the backend of the website, which handles the server operations. This may include creating and storing content and managing databases. We work with Node.js in the back-end.`} 
                                hash={"backend"}
                                image={"/process/backend.webp"}
                                alt={"Backend"}
                                number={3}
                            />
                            <ProcessItem 
                                title={"Front-end Development"}
                                description={"We build the website UI using modern frontend technologies like React, Angular, Vue, Astro and Qwik. We also make sure that the website is responsive, which means that it will look good on any device, from a smartphone to a desktop computer. We ensure the quality of the code and the compatibility with the main browsers."} 
                                hash={"frontend"}
                                image={"/process/frontend.webp"}
                                alt={"Frontend"}
                                number={4}
                            />
                            <ProcessItem 
                                title={"SEO Optimization"}
                                description={"Once the website is complete, we focus on optimizing it for search engines. We carry out keyword research to identify the most relevant keywords for your website and incorporate them into the content and structure of the website. In addition, we work on the technical optimization of the website to improve its ranking in search engines."} 
                                hash={"seo"}
                                image={"/process/seo.webp"}
                                alt={"SEO"}
                                number={5}
                            />
                            <ProcessItem 
                                title={"Marketing"}
                                description={'We offer content marketing services, which include the creation of a blog, the management of social networks and the development of email marketing campaigns. We create high-quality, relevant content that engages your target audience and provides them with value. We work together with you to define the most effective content strategy for your business or project.'} 
                                hash={"marketing"}
                                image={"/process/marketing.webp"}
                                alt={"Marketing"}
                                number={6}
                            />
                            <ProcessItem 
                                title={"Maintenance"}
                                description={"Website maintenance is crucial to ensure its security and efficiency. We make regular software and security updates to keep the website up-to-date and protected against online threats. We also offer technical support services to help you with any problems you may have with the website."} 
                                number={7}
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