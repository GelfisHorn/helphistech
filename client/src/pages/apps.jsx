// Components
import Layout from "@/components/Layout";
import AppsHero from "@/components/apps/Hero/Index";
import AppsServices from "@/components/apps/QuoteProject/Index";
import AppsTechnologies from "@/components/apps/Technologies/Index";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";

export default function AppsPage() {

    const { language } = useContextProvider();

    return (
        <Layout title={"Entwicklung mobiler Anwendungen"} lang={"de"}>
            <AppsHero />
            <AppsServices />
            <AppsTechnologies />
        </Layout>
    )
}