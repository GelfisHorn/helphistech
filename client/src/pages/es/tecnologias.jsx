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
        

        <Layout title={"Las tecnologías que usamos"} lang={'es'}>
            <main className={`px-6 sm:px-10 lg:px-20 2xl:px-0 py-20 overflow-hidden`}>
                <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto z-10 relative">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-28">
                            <div className="flex items-center sm:items-start gap-5 relative">
                                <div className="flex flex-col justify-center sm:items-start gap-10">
                                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
                                        <h1 className="text-center sm:text-left w-full">Estas son las Tecnologías que más usamos</h1>
                                    </div>
                                    <div className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
                                        <p className="text-center sm:text-left">En HelphisTech estamos comprometidos en proporcionar software de alta calidad utilizando tecnologías innovadoras y herramientas de última generación. Nuestro equipo de desarrolladores utiliza las herramientas adecuadas para cada proyecto específico. Algunas de las tecnologías que utilizamos incluyen React, Nextjs, Angular, Nodejs, Express, MongoDB y MySQL. En HelphisTech creemos que la tecnología es una herramienta poderosa para impulsar la innovación y la eficiencia, y nos esforzamos por utilizar las mejores soluciones para cada proyecto que abordamos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 gap-y-20`}>
                                <TechnologyItem 
                                    image={"/technologies/react.webp"}
                                    imageAlt={"React image"}
                                    description={"React es una biblioteca de JavaScript creada por Facebook para construir interfaces de usuario (UI) en aplicaciones web. Se enfoca en la creación de componentes reutilizables de interfaz de usuario y utiliza una sintaxis llamada JSX para combinar HTML y JavaScript."}
                                    href={"https://react.dev"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nextjs.webp"}
                                    darkImg={"/technologies/darkmode/nextjs.webp"}
                                    imageAlt={"Next.js image"}
                                    description={"Next.js es un framework de JavaScript basado en React que se utiliza para crear aplicaciones web modernas del lado del servidor y del lado del cliente. Fue creado por Vercel y su objetivo principal es proporcionar una experiencia de desarrollo web rápida, sencilla y escalable."}
                                    href={"https://nextjs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/angular.webp"}
                                    imageAlt={"Angular image"}
                                    description={"Angular es un framework de desarrollo web, mantenido por Google, que se utiliza para construir aplicaciones web dinámicas y de una sola página (SPA). Angular proporciona una estructura para el desarrollo de aplicaciones web que permite a los desarrolladores crear aplicaciones altamente escalables y mantenibles."}
                                    href={"https://angular.io"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/vuejs.webp"}
                                    imageAlt={"Vuejs image"}
                                    description={"Vue.js es un framework de JavaScript que se utiliza para construir interfaces de usuario y aplicaciones de una sola página (SPA). Al igual que Angular y React, Vue.js se enfoca en la creación de aplicaciones web altamente escalables y dinámicas."}
                                    href={"https://vuejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/astro.webp"}
                                    darkImg={"/technologies/darkmode/astro.webp"}
                                    imageAlt={"Astro image"}
                                    description={'Astro es un nuevo framework de desarrollo web, lanzado recientemente en 2021 por la empresa de tecnología de pagos "Stripe". Astro permite la creación de aplicaciones web modernas y rápidas utilizando tecnologías web estándar como HTML, CSS y JavaScript, junto con el uso de componentes reutilizables.'}
                                    href={"https://astro.build"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/tailwind.webp"}
                                    darkImg={"/technologies/darkmode/tailwind.webp"}
                                    imageAlt={"Tailwind image"}
                                    description={"Tailwind CSS es un framework de diseño que se utiliza para desarrollar interfaces de usuario web personalizadas y escalables. A diferencia de otros frameworks de diseño, como Bootstrap o Foundation, Tailwind CSS se enfoca en proporcionar herramientas de bajo nivel para diseñar componentes de interfaz de usuario personalizados."}
                                    href={"https://tailwindcss.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/nodejs.webp"}
                                    darkImg={"/technologies/darkmode/nodejs.webp"}
                                    imageAlt={"Nodejs image"}
                                    description={"Node.js es un entorno de tiempo de ejecución de JavaScript, que se utiliza principalmente en el lado del servidor para construir aplicaciones web escalables y de alta velocidad. Node.js utiliza el motor de JavaScript V8 de Google, que se utiliza en el navegador Chrome, para ejecutar el código JavaScript en el servidor."}
                                    href={"https://nodejs.org"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mongodb.webp"}
                                    imageAlt={"Mongodb image"}
                                    description={"MongoDB es una base de datos NoSQL que se utiliza para almacenar y recuperar datos en aplicaciones web y móviles. A diferencia de las bases de datos relacionales tradicionales, como MySQL y PostgreSQL, que utilizan tablas y esquemas, MongoDB utiliza un modelo de documentos y colecciones."}
                                    href={"https://www.mongodb.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/mysql.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"MySQL es un sistema de gestión de bases de datos relacionales que se utiliza para almacenar y recuperar datos en aplicaciones web y de software. MySQL utiliza el lenguaje de consulta estructurado (SQL)."}
                                    href={"https://www.mysql.com"}
                                />
                                <TechnologyItem 
                                    image={"/technologies/socketio.webp"}
                                    darkImg={"/technologies/darkmode/socketio.webp"}
                                    imageAlt={"Mysql image"}
                                    description={"Socket.IO es una biblioteca de JavaScript que permite la comunicación en tiempo real entre el servidor y el cliente en aplicaciones web. Socket.IO se basa en el protocolo de WebSockets y proporciona una capa de abstracción para simplificar la implementación de comunicaciones bidireccionales entre el servidor y el cliente."}
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
                        <div>Ver más</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}