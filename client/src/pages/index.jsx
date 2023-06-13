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

export default function Home({ faqs }) {

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
				<ServicesSection />
				<ProcessSection />
				<TechnologiesSection />
				{Object.keys(faqs).length != 0 && (
					<FAQSection faqs={faqs} />
				)}
				<MyProjectSection />
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
		const { data } = await axios.get(`${process.env.STRAPI_URI}/api/faq?populate=element&locale=de`, config)

		return {
			props: {
				faqs: data?.data?.attributes || {}
			}
		}
	} catch (error) {
		return {
			props: {
				faqs: {}
			}
		}
	}
}