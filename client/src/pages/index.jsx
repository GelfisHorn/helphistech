
import axios from "axios";
// Nextjs
import Head from "next/head";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Sections
import HomeHero from "@/components/home/Hero/Index";
import HomeIntroduction from "@/components/home/Introduction/Index";
import HomeServices from "@/components/home/Services/Index";
import ClientCommentsSection from "@/components/website/ClientComments";
import FAQSection from "@/components/website/FAQ";
import TechnologiesSection from "@/components/website/Technologies";
import ContactSection from "@/components/website/Contact/Index";
import HomeAboutUs from "@/components/home/AboutUs/Index";

export default function Home({ faqs, clientComments }) {

    const { darkMode } = useContextProvider();

    return (
        <>
            <Head>
                <title>Webseiten | HelphisTech</title>
                <meta name="description" content="Maßgeschneiderte Webentwicklungsdienstleistungen für Unternehmen jeder Größe. Wir erstellen Websites, E-Commerce-Plattformen und webbasierte Anwendungen, die perfekt auf Ihre Bedürfnisse zugeschnitten sind." />
            </Head>
            <main className={darkMode ? 'bg-black text-zinc-200' : 'bg-white text-black'} >
                <Navbar />
                <HomeHero />
                <HomeIntroduction />
                <HomeServices />
                <ClientCommentsSection comments={clientComments} />
                <ContactSection language={"de"} />
                <HomeAboutUs />
                <TechnologiesSection />
                <FAQSection faqs={faqs} />
                <Footer />
            </main>
        </>
    )
}

export const getStaticProps = async (context) => {

    const config = {
        headers: {
            Authorization: `bearer ${process.env.STRAPI_TOKEN}`
        }
    }

    try {
        const response = await Promise.all([
            axios.get(`${process.env.STRAPI_URI}/api/faq?populate=element&locale=de`, config),
            axios.get(`${process.env.STRAPI_URI}/api/client-comments?locale=de`, config)
        ])
        return {
            props: {
                faqs: response[0]?.data?.data?.attributes || {},
				clientComments: response[1]?.data.data || []
            }
        }
    } catch (error) {
        return {
            props: {
                faqs: {},
                clientComments: []
            }
        }
    }
}