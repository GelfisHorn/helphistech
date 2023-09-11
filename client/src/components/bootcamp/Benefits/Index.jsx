
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion } from "framer-motion";

export default function BootcampBenefits({ lang }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-20 max-w-7xl mx-auto py-28 px-6"}>
            <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                <div className={"flex flex-col gap-5"}>
                    <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Aprender a programar</div>
                    <motion.h2
                        className={"text-3xl sm:text-5xl font-bold"}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: .2, origin: 1 }}
                    >Por qué <span className={"text-primary"}>aprender programación?</span></motion.h2>
                </div>
                <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Descubra por qué aprender a codificar es tan importante en el mundo actual y analice las oportunidades profesionales y la capacidad de innovar.</p>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>
                <Card
                    icon={"fa-regular fa-user-plus"}
                    title={"Mejora tu vida"}
                    description={"No es un secreto que pasamos la mayor parte de nuestras vidas trabajando. Casi siempre en trabajos que no nos gustan, ni nos ofrecen oportunidad de crecimiento. Al aprender a programar, puedes trabajar en proyectos emocionantes, seguir creciendo en profesionalmente, obtener sueldos mucho más altos que la mayoría y todo eso desde la comodidad de tu casa."}
                />
                <Card
                    icon={"fa-regular fa-industry-windows"}
                    title={"Oportunidades laborales"}
                    description={"La demanda de profesionales de la programación está en constante crecimiento. Aprender a programar te brinda oportunidades laborales en un mercado altamente competitivo y bien remunerado."}
                />
                <Card
                    icon={"fa-regular fa-code"}
                    title={"Emprendimiento y desarrollo de proyectos personales"}
                    description={"La programación te permite convertir tus ideas en realidad. Puedes crear tu propio negocio en línea, desarrollar aplicaciones o construir sitios web que generen ingresos."}
                />
                <Card
                    icon={"fa-regular fa-briefcase"}
                    title={"Aplicabilidad en diversas industrias"}
                    description={"La programación se utiliza en una amplia gama de industrias, desde el desarrollo de software y la inteligencia artificial hasta la robótica y la medicina. Aprender a programar te abre puertas en múltiples campos profesionales."}
                />
            </div>
        </div>
    )
}

function Card({ icon, title, description }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col items-center gap-6 p-8 rounded-2xl bg-[#866bfe25] border-2 border-[#866bfe25] text-center"}>
            <div className={`grid place-content-center w-16 h-16 bg-[#866bfe7a] text-[#ffffffb0] rounded-full text-2xl`}>
                <i className={icon}></i>
            </div>
            <div className={"text-primary text-lg font-medium"}>{title}</div>
            <div className={`${darkMode ? "description-dark" : "description-light"} text-[0.93rem]`}>{description}</div>
            {/* <div className={`flex flex-col gap-3 text-center`}>
            </div> */}
        </div>
    )
}