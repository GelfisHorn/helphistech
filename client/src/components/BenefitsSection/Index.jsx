
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Styles
import styles from './Index.module.css'

export default function BenefitsSection({ title, subtitle, content }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`flex flex-col items-center justify-center gap-28 py-28 px-6 sm:px-10 lg:px-20 ${styles.backgroundImage}`}>
            <div className="flex flex-col gap-8 text-center" style={{ zIndex: 1, position: "relative" }}>
                <h2 className={"text-3xl sm:text-5xl font-bold"}>{title}</h2>
                <p className={`${darkMode ? "description-dark" : "description-light"}`}>{subtitle}</p>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5"} style={{ zIndex: 1, position: "relative" }}>
                {content.map(c => (
                    <Card icon={c.icon} title={c.title} description={c.description} />
                ))}
            </div>
        </div>
    )
}

function Card({ icon, title, description }) {
    return (
        <div className={"flex flex-col items-center gap-4 text-center p-8 bg-[#866bfe18] border-2 border-[#866bfe18] rounded-2xl"}>
            <div className={"grid place-content-center w-16 h-16 rounded-full bg-[#866bfe7e] text-neutral-100"}><i className={`text-3xl ${icon}`}></i></div>
            <div className={"text-xl"}>{title}</div>
            <div>{description}</div>
        </div>
    )
}