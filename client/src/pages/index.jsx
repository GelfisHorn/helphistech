import axios from "axios";
import { useEffect } from "react";
// Nextjs
import Head from "next/head";
import { useRouter } from "next/router";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import HeroSection from "@/components/HomeSections/Hero";
import ServicesSection from "@/components/HomeSections/Services";
import ProcessSection from "@/components/HomeSections/Process";
import TechnologiesSection from "@/components/HomeSections/Technologies";
import MyProjectSection from "@/components/HomeSections/MyProject";
import Footer from "@/components/Footer";
import FAQSection from "@/components/HomeSections/FAQ";
import ContactSection from "@/components/HomeSections/Contact/Index";
import ClientCommentsSection from "@/components/HomeSections/ClientComments";
import PricingSection from "@/components/HomeSections/Pricing/Index";

export default function Home({ services, faqs, clientComments }) {

	const router = useRouter();

    // Get functions and variables from context
	const { darkMode, language } = useContextProvider();

	useEffect(() => {
		if(!language) {
			return;
		}
		
		if(language != 'de') {
			router.push(`/${language}`)
		}
	}, [language])

	return (
		<>
			<Head>
				<title>Webseiten | HelphisTech</title>
				<meta name="description" content="Maßgeschneiderte Webentwicklungsdienstleistungen für Unternehmen jeder Größe. Wir erstellen Websites, E-Commerce-Plattformen und webbasierte Anwendungen, die perfekt auf Ihre Bedürfnisse zugeschnitten sind." />
			</Head>
			<main className={darkMode ? 'bg-black text-zinc-200' : 'bg-white text-black'}>
				{/* Sections */}
				<HeroSection />
				<ServicesSection services={services} />
				<PricingSection />
				<ClientCommentsSection comments={clientComments} />
				<ProcessSection />
				<TechnologiesSection />
				<ContactSection language={'de'} />
				{/* <MyProjectSection /> */}
				{faqs && Object.keys(faqs).length != 0 && (
					<FAQSection faqs={faqs} />
				)}
				{/* Footer */}
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
			axios.get(`${process.env.STRAPI_URI}/api/blogs?locale=de&populate=preview&filters[showOnHomePage][$eq]=true`, config),
			axios.get(`${process.env.STRAPI_URI}/api/client-comments?locale=de`, config)
		])
		return {
			props: {
				faqs: response[0]?.data?.data?.attributes || {},
				services: response[1]?.data.data || [],
				clientComments: response[2]?.data.data || []
			}
		}
	} catch (error) {
		return {
			props: {
				faqs: {},
				services: [],
				clientComments: []
			}
		}
	}
}