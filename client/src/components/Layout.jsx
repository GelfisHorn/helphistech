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
import WhatsAppButton from "./WhatsAppButton/Index";

export default function Layout({ title, metaDesc, lang, children, styles }) {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return(
        <>
            <Head>
                <title>{title} | Helphis Tech</title>
                <meta name="description" content={metaDesc || "Maßgeschneiderte Webentwicklungsdienstleistungen für Unternehmen jeder Größe. Wir erstellen Websites, E-Commerce-Plattformen und webbasierte Anwendungen, die perfekt auf Ihre Bedürfnisse zugeschnitten sind."} />
            </Head>
            <div className={`${darkMode ? 'bg-darkmode text-zinc-300' : 'bg-white text-[#202020]'} transition-colors overflow-hidden`} style={styles}>
                {/* Navbar */}
                { lang == 'de' && <NavbarDE /> }
                { lang == 'en' && <NavbarEN /> }
                { lang == 'es' && <NavbarES /> }
                {/* Page content */}
                {children}
                {/* Footer */}
                { lang == 'de' && <FooterDE /> }
                { lang == 'en' && <FooterEN /> }
                { lang == 'es' && <FooterES /> }
            </div>
            <WhatsAppButton />
        </>
    )
}