
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

export default function MarketingDigital() {

    return (
        <Layout title={"Digitales Marketing"} lang={"de"}>
            <MDHero />
            <MDIntroduction />
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