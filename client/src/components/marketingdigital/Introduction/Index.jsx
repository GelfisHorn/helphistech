
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Styles
import styles from "./Index.module.css";
import Link from "next/link";

export default function MDIntroduction() {

    const { darkMode } = useContextProvider();

    return (
        <section className={`p-4 sm:p-7 m-5 bg-[#101010] rounded-xl`} style={{ zIndex: "2" }}>
            <div className={`relative rounded-xl`}>
                <div className={"flex flex-col items-center gap-14 px-6 sm:px-10 py-10 lg:pt-12 pb-12 text-center"}>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"uppercase font-semibold text-primary"}>Online-Erfolgsstrategien</div>
                        <div className={"flex flex-col items-center gap-8"} style={{ position: "relative", zIndex: "2" }}>
                            <div className={"lg:text-xl"}>
                                <p>Um in diesem digitalen Zeitalter erfolgreich zu sein, ist eine solide Online-Präsenz unerlässlich. Dafür benötigen Sie eine gut gestaltete <Link href={"/website"}>Website</Link> und strategisches Online-Marketing. Sie ermöglichen es Ihnen nicht nur, ein breiteres Publikum zu erreichen, sondern auch eine starke Marke aufzubauen und neue Kunden zu gewinnen.</p>
                            </div>
                            <p className={"lg:text-xl"}>Es gibt eine Vielzahl von Strategien im digitalen Marketing, aber einige, die in der Regel die besten Ergebnisse liefern, sind:</p>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center gap-8"}>
                        <button className={"bg-primary hover:bg-primary-2 transition-colors text-white rounded-full py-2 sm:py-3 px-6 sm:px-8 w-fit text-lg sm:text-xl"}>Kontakt uns</button>
                        <div className={`flex flex-col items-center gap-3 text-primary text-lg`}>
                            <span>Entdecken Sie unsere Leistungen</span>
                            <i className={`fa-regular fa-arrow-down-long ${styles.animationScrollDown}`}></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}