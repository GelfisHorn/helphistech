// Layout
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Image from "next/image";
import Link from "next/link";

export default function TechnologiesPage() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return(
        

        <Layout title={"The technologies we use"} lang={'en'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-28">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">These are the Technologies we use the most</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">At HelphisTech we are committed to providing high-quality software using innovative technologies and cutting-edge tools. Our team of developers uses the right tools for each specific project. Some of the technologies we use include React, Nextjs, Angular, Nodejs, Express, MongoDB, and MySQL. At HelphisTech we believe that technology is a powerful tool to drive innovation and efficiency, and we strive to use the best solutions for each project we tackle.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 gap-y-20`}>
                                <TechnologyItem 
                                    image={"/technologies/react.webp"}
                                    imageAlt={"React image"}
                                    description={"React is a JavaScript library created by Facebook for building user interfaces (UI) in web applications. It focuses on creating reusable UI components and uses a syntax called JSX to combine HTML and JavaScript."}
                                    href={"https://react.dev"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nextjs.webp"}
                                    darkImg={"/technologies/darkmode/nextjs.webp"}
                                    imageAlt={"Next.js image"}
                                    description={"Next.js is a React-based JavaScript framework used to build modern server-side and client-side web applications. It was created by Vercel and its main goal is to provide a fast, easy and scalable web development experience."}
                                    href={"https://nextjs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/angular.webp"}
                                    imageAlt={"Angular image"}
                                    description={"Angular is a web development framework, maintained by Google, used to build dynamic single-page web applications (SPAs). Angular provides a framework for web application development that allows developers to build highly scalable and maintainable applications."}
                                    href={"https://angular.io"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/vuejs.webp"}
                                    imageAlt={"Vuejs image"}
                                    description={"Vue.js is a JavaScript framework used to build user interfaces and single page applications (SPAs). Like Angular and React, Vue.js focuses on building highly scalable and dynamic web applications."}
                                    href={"https://vuejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/astro.webp"}
                                    darkImg={"/technologies/darkmode/astro.webp"}
                                    imageAlt={"Astro image"}
                                    description={'Astro is a new web development framework, recently launched in 2021 by the payment technology company "Stripe". Astro enables the creation of modern and fast web applications using standard web technologies such as HTML, CSS and JavaScript, along with the use of reusable components.'}
                                    href={"https://astro.build"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/tailwind.webp"}
                                    darkImg={"/technologies/darkmode/tailwind.webp"}
                                    imageAlt={"Tailwind image"}
                                    description={"Tailwind CSS is a design framework used to develop custom and scalable web user interfaces. Unlike other design frameworks, such as Bootstrap or Foundation, Tailwind CSS focuses on providing low-level tools for designing custom UI components."}
                                    href={"https://tailwindcss.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nodejs.webp"}
                                    darkImg={"/technologies/darkmode/nodejs.webp"}
                                    imageAlt={"Nodejs image"}
                                    description={"Node.js is a JavaScript runtime environment, which is primarily used on the server side to build high-speed and scalable web applications. Node.js uses Google's V8 JavaScript engine, which is used in the Chrome browser, to execute JavaScript code on the server."}
                                    href={"https://nodejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mongodb.webp"}
                                    imageAlt={"Mongodb image"}
                                    description={"MongoDB is a NoSQL database used to store and retrieve data in web and mobile applications. Unlike traditional relational databases, such as MySQL and PostgreSQL, which use tables and schemas, MongoDB uses a document-collection model."}
                                    href={"https://www.mongodb.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mysql.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"MySQL is a relational database management system used to store and retrieve data in software and web applications. MySQL uses Structured Query Language (SQL)."}
                                    href={"https://www.mysql.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/socketio.webp"}
                                    darkImg={"/technologies/darkmode/socketio.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"Socket.IO is a JavaScript library that enables real-time communication between the server and the client in web applications. Socket.IO is based on the WebSockets protocol and provides an abstraction layer to simplify the implementation of bidirectional communications between the server and the client."}
                                    href={"https://socket.io"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

function TechnologyItem({ image, darkImg, imageAlt, description, href }) {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return (
        <div className={``}>
            <div className="flex flex-col gap-5">
                <div className={`grid place-content-center aspect-square ${darkMode ? 'bg-[#090909]' : 'bg-[#E9E9E9]'}`}>
                    <div className={`grid place-content-center aspect-square border ${darkMode ? 'border-[#181818]' : 'border-white'} m-10 px-5 sm:px-10`}>
                        { darkMode && darkImg ? (
                            <Image src={darkImg} width={400} height={250} alt={imageAlt} />
                        ) : (
                            <Image src={image} width={400} height={250} alt={imageAlt} />
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center text-center gap-5">
                    <div className={`${darkMode ? 'description-dark' : 'description-light'}`}>{description}</div>
                    <Link href={href} target="_blank" className="flex items-center gap-1 text-primary hover:text-primary-2 transition-colors hover:underline">
                        <div>See more</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}