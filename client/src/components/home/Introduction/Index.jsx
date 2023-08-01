
// Styles
import useContextProvider from "@/hooks/useAppContextProvider";
import styles from "./Index.module.css";

export default function HomeIntroduction() {

    const { darkMode } = useContextProvider();
    
    return (
        <div className={`${styles.backgroundImage} relative`} style={{ zIndex: "2" }}>
            <div className={styles.glassmorphism}>
                <div className={"flex flex-col gap-8 px-6 sm:px-10 py-28 text-center"} style={{ position: "relative", zIndex: "2" }}>
                    <h2 className={`text-4xl font-extrabold uppercase`}>Herzlich willkommen bei HelphisTech!</h2>
                    <div className={"text-lg"}>
                        <p>Wir sind ein leidenschaftliches Team von Entwicklern und Designern, das sich dafür einsetzt, die digitale Transformation Ihres Unternehmens voranzutreiben.</p>
                        <p>Wir bieten Webdesign-, App-Entwicklungs- und digitale Marketingdienstleistungen an, um Sie auf die nächste Stufe der technologischen Welt zu bringen.</p>
                    </div>
                    <p className={"text-lg"}>Gemeinsam lassen wir Ihre digitale Vision Wirklichkeit werden! Wir freuen uns darauf, Teil Ihres Erfolgs zu sein.</p>
                </div>
            </div>
        </div>
    )
}