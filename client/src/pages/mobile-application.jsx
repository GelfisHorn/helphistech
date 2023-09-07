// Components
import BenefitsSection from "@/components/BenefitsSection/Index";
import ContactSection from "@/components/ContactSection";
import Layout from "@/components/Layout";
import AppsComments from "@/components/apps/Comments/Index";
import AppsFAQ from "@/components/apps/FAQ/Index";
import AppsHero from "@/components/apps/Hero/Index";
import AppsQuote from "@/components/apps/QuoteProject/Index";
import { AppsServices } from "@/components/apps/Services/Index";
import AppsTechnologies from "@/components/apps/Technologies/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Mock Data
import comments from "@/mockData/apps/comments";
import faqs from '@/mockData/apps/faqs'

export default function AppsPage() {

    const { language } = useContextProvider();

    return (
        <Layout title={"Entwicklung mobiler Anwendungen"} lang={"de"}>
            <AppsHero />
            <BenefitsSection
                title={"Steigere deine Online-Präsenz"}
                subtitle={"Erfahre die Vorteile unseres Webentwicklungs-Services"}
                content={[
                    { icon: "fa-light fa-bullseye-pointer", title: "Schneller und Einfacher Zugang", description: "Deine Dienstleistungen sind nur einen Fingertipp entfernt, jederzeit und überall." },
                    { icon: "fa-light fa-bell", title: "Persönliche Kommunikation", description: "Benachrichtigungen und exklusive Angebote, individuell auf die Bedürfnisse der Kunden zugeschnitten." },
                    { icon: "fa-light fa-users", title: "Kundenbindung", description: "Aufbau von Kundenloyalität durch kundenzentrierte Erlebnisse." },
                    { icon: "fa-light fa-lightbulb", title: "Spezifische Funktionen", description: "Nutze die einzigartigen Fähigkeiten von Mobilgeräten, um innovative Dienstleistungen anzubieten." }
                ]}
            />
            <AppsQuote />
            <AppsTechnologies />
            <AppsServices />
            <AppsComments comments={comments.de} />
            <AppsFAQ faqs={faqs.de} />
            <ContactSection fromPage={"apps"} />
        </Layout>
    )
}