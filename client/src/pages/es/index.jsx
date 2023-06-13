import axios from "axios";
// Nextjs
import Head from "next/head";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Components
import Footer from "@/components/es/Footer";
import HeroSection from "@/components/es/HomeSections/Hero";
import ServicesSection from "@/components/es/HomeSections/Services";
import ProcessSection from "@/components/es/HomeSections/Process";
import TechnologiesSection from "@/components/es/HomeSections/Technologies";
import MyProjectSection from "@/components/es/HomeSections/MyProject";
import FAQSection from "@/components/HomeSections/FAQ";

export default function Home({ faqs }) {

    // Get functions and variables from context
	const { darkMode } = useContextProvider();

	return (
		<>
			<Head>
				<title>Sitio web | HelphisTech</title>
				<meta name="description" content="Ofrecemos servicios de desarrollo web personalizados para empresas de todos los tamaños. Creamos sitios web, plataformas de comercio electrónico y aplicaciones web que se adaptan perfectamente a tus necesidades." />
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
		const { data } = await axios.get(`${process.env.STRAPI_URI}/api/faq?populate=element&locale=es`, config)

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