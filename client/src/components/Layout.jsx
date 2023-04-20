import Head from "next/head";
// DE Components
import NavbarDE from "./Navbar";
import FooterDE from "./Footer";
// EN Components
import NavbarEN from "./en/Navbar";
import FooterEN from "./en/Footer";
// ES Components
import NavbarES from "./es/Navbar";
import FooterES from "./es/Footer";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function Layout({ title, metaDesc, children }) {

    // Get functions and variables from context
    const { language, darkMode } = useContextProvider();

    return(
        <>
            <Head>
                <title>{title} | Helphis Tech</title>
                <meta name="description" content={metaDesc || "Maßgeschneiderte Webentwicklungsdienstleistungen für Unternehmen jeder Größe. Wir erstellen Websites, E-Commerce-Plattformen und webbasierte Anwendungen, die perfekt auf Ihre Bedürfnisse zugeschnitten sind."} />
            </Head>
            <div className={`${darkMode ? 'bg-darkmode text-zinc-200' : 'bg-white text-black'} transition-colors`}>
                {/* Navbar */}
                { language == 'de' && <NavbarDE /> }
                { language == 'en' && <NavbarEN /> }
                { language == 'es' && <NavbarES /> }
                {/* Page content */}
                {children}
                {/* Footer */}
                { language == 'de' && <FooterDE /> }
                { language == 'en' && <FooterEN /> }
                { language == 'es' && <FooterES /> }
            </div>
        </>
    )
}