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

export default function Home() {

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
				<MyProjectSection />
				{/* Footer */}
				<Footer />
			</main>
		</>
	)
}