import axios from "axios";
// Nextjs
import Head from "next/head";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import HeroSection from "@/components/en/HomeSections/Hero";
import ServicesSection from "@/components/en/HomeSections/Services";
import ProcessSection from "@/components/en/HomeSections/Process";
import TechnologiesSection from "@/components/en/HomeSections/Technologies";
import MyProjectSection from "@/components/en/HomeSections/MyProject";
import Footer from "@/components/en/Footer";
import FAQSection from "@/components/HomeSections/FAQ";

export default function Home({ faqs }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	return (
		<>
			<Head>
				<title>Website | HelphisTech</title>
				<meta name="description" content="We offer customized web development services for businesses of all sizes. We create websites, e-commerce platforms, and web applications that are perfectly tailored to your needs." />
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
		const { data } = await axios.get(`${process.env.STRAPI_URI}/api/faq?populate=element&locale=en`, config)

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