
import axios from "axios";
// Components 
import Layout from "@/components/Layout";
// Sections
import MDHero from "@/components/marketingdigital/Hero/Index";
import MDIntroduction from "@/components/marketingdigital/Introduction/Index";
import MDPricing from "@/components/marketingdigital/Pricing/Index";
import MDComments from "@/components/marketingdigital/Comments/Index";
import ContactSection from "@/components/ContactSection";
// Mock Data
import comments from "@/mockData/marketingdigital/comments";
import BenefitsSection from "@/components/BenefitsSection/Index";

export default function MarketingDigital() {

    return (
        <Layout title={"Digitales Marketing"} lang={"de"}>
            <MDHero />
            <MDIntroduction />
            <BenefitsSection 
                title={"Maximiere deinen Online-Erfolg"}
                subtitle={"Entdecke die Vorteile unseres Digitalen Marketingdienstes"}
                content={[
                    { icon: "fa-light fa-globe", title: "Globale Reichweite und präzise Segmentierung", description: "Erreiche globale Zielgruppen und richte deine Botschaft gezielt an diejenigen aus, die am meisten zählen, um die Konversionen zu maximieren." },
                    { icon: "fa-light fa-chart-mixed", title: "Messung und detaillierte Analyse", description: "Greife in Echtzeit auf Daten zu, um fundierte Entscheidungen zu treffen und deine Kampagnen zu optimieren." },
                    { icon: "fa-light fa-chart-pie-simple-circle-dollar", title: "Kosteneffizienz", description: "Digitales Marketing ist kosteneffizienter und anpassbar, wodurch die Kosten für die Kundenakquise durch organische Strategien reduziert werden." },
                    { icon: "fa-light fa-user-plus", title: "Interaktion und Engagement mit dem Publikum", description: "Baue starke Beziehungen auf und fördere die Markentreue durch die bidirektionale Kommunikation auf digitalen Plattformen." }
                ]} 
            />
            <MDPricing />
            <MDComments comments={comments.de} />
            <ContactSection fromPage={"marketingdigital"} />
            {/* <ContactSection language={"de"} /> */}
        </Layout>
    )
}

/* export const getStaticProps = async (context) => {

    const config = {
        headers: {
            Authorization: `bearer ${process.env.STRAPI_TOKEN}`
        }
    }

    try {
        const response = await Promise.all([
            axios.get(`${process.env.STRAPI_URI}/api/client-comments?locale=de`, config)
        ])
        return {
            props: {
                comments: response[0]?.data.data || []
            }
        }
    } catch (error) {
        return {
            props: {
                comments: []
            }
        }
    }
} */