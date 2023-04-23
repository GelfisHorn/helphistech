import Link from "next/link";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

export default function ProcessSection() {
    
    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <section className={`px-6 sm:px-10 lg:px-20 2xl:px-0 ${darkMode ? 'section-bg-dark' : 'section-bg-light'} py-28 overflow-hidden`} id="our-process">
            <div className="flex flex-col gap-20 max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                <div className="flex flex-col gap-5 items-center sm:items-start">
                    <div className="blur-shadow -left-28 -top-28 -z-10"></div>
                    <div className="flex flex-col">
                        <span className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Development process</span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div>
                            <h2 className={`flex flex-col items-center sm:items-start gap-5 text-3xl sm:text-5xl font-bold whitespace-nowrap ${darkMode ? 'title-dark' : 'title-light'}`}>
                                <div className="hidden xs:block">How the <span className="text-primary">development</span></div>
                                <div className="hidden xs:block">process works</div>
                                <div className="xs:hidden">How the</div>
                                <div className="xs:hidden text-primary">development</div>
                                <div className="xs:hidden">process works</div>
                            </h2>
                        </div>
                        <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                            <p className="text-center sm:text-left">If you need an effective online presence for your business or project, a website is a vital part of the process. Here's a breakdown of the web development process so you know what to expect when working with us.</p>
                        </div>
                    </div>
                </div>
                <div className="pb-10 overflow-x-scroll w-full">
                    <div className="flex items-start gap-20 w-[186.66rem] 2xl:w-[210rem]">
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>1.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>2.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>3.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Planning"}
                                    description={"We work with you to understand your needs and goals for the website. We then design and develop a website that meets your needs and wants, including the functionality, look and feel and behavior you want."} 
                                />
                                <ProcessItem 
                                    title={"Design and prototyping"}
                                    description={"Once we've understood what you need, we'll prototype your website using Figma or a similar tool. This prototype will show the appearance and behavior of the website. If there's something you don't like or want to change, we'll do it here before moving on to the next step."} 
                                />
                                <ProcessItem 
                                    title={"Back-end development"}
                                    description={`After designing and prototyping, we'll work on the part of the website called the backend that handles server operations. We use modern and reliable technologies to ensure smooth operation and store content and manage databases.`} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-3 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>4.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>5.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>6.</div>
                                    <div className={`w-full h-[1px] ${darkMode ? 'bg-[#19191F]' : 'bg-neutral-300'}`}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-20">
                                <ProcessItem 
                                    title={"Front-end development"}
                                    description={"The frontend is the part of the website that users see and interact with. This is where we create the website's user interface using HTML, CSS, and JavaScript. We make sure that the website is responsive and looks good on any device."} 
                                />
                                <ProcessItem 
                                    title={"SEO optimization"}
                                    description={"To help people find your website, we optimize it for search engines. We do keyword research to make sure your website is optimized for the search terms that matter most to your business or project."} 
                                />
                                <ProcessItem 
                                    title={"Marketing"}
                                    description={'If you want more people to visit your website, we can help you with online marketing. This may include advertising on Google Ads and meta ads, as well as social media marketing.'} 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 gap-20">
                                <div className="flex items-center gap-10">
                                    <div className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600 opacity-80'} text-5xl`}>7.</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-20">
                                <ProcessItem 
                                    title={"Maintenance"}
                                    description={"Once your website is online, we continue to work with you to keep it updated and optimized. We make regular security and software updates to make sure your website is protected from online threats and remains easy to use."} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ProcessItem({ title, description }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className="text-xl">{title}</div>
            <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
            <Link className="w-fit" href={"#"}>
                <div className="flex items-center gap-2 text-primary hover:text-primary-2 hover:underline transition-colors">
                    <div>Ver más</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </Link>
        </div>
    )
}