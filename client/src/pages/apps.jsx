// Components
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
            <AppsQuote />
            <AppsTechnologies />
            <AppsServices />
            <AppsComments comments={comments.de} />
            <AppsFAQ faqs={faqs.de} />
            <ContactSection fromPage={"apps"} />
        </Layout>
    )
}