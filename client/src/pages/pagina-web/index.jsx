import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import Image from "next/image";
import Link from "next/link";
// Components
import Layout from "@/components/Layout";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { motion } from "framer-motion";
// Languages
import lang from '../../lang/services/index.json'

export default function ServicesPage({ categories }) {

	const { darkMode, language, setLanguage } = useContextProvider();

	const [selectedCategory, setSelectedCategory] = useState({ name: lang['es'].categories.default, code: "all" });
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [fetchError, setFetchError] = useState(false);
	
	useEffect(() => {
		setLanguage('es');
		setLoading(true);
		getBlogs();
	}, [language])

	useEffect(() => {
		setLoading(true);
		if (selectedCategory.code != "all") {
			getBlogsByCategory();
			return;
		}

		getBlogs();
	}, [selectedCategory])

	async function getBlogs() {
		if (!language) {
			setLoading(false);
			return;
		}

		if (language != localStorage.getItem('language')) {
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post('/api/blogs/get', { language: 'es' });
			if (data.data.length != 0) {
				setBlogs(data.data);
				return;
			}

			setBlogs([]);
			setFetchError(true);
		} catch (error) {
			setFetchError(true);
		} finally {
			setLoading(false);
		}
	}

	async function getBlogsByCategory() {
		try {
			const { data } = await axios.post('/api/blogs/getByCategory', { category: selectedCategory.code, language });
			if (data.data.length != 0) {
				setBlogs(data.data);
				return;
			}

			setBlogs([]);
			setFetchError(true);
		} catch (error) {
			setFetchError(true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Layout title={"Nuestros servicios"} lang={'es'}>
			<div className={`${darkMode ? 'blog-bg-dark bg-gradient-to-br from-[#080808] to-[#070707]' : 'blog-bg-light bg-gradient-to-br from-[#F6F6F6] to-[#FFF]'}`}>
				<div className={`flex flex-col gap-10 mx-auto py-20 sm:pb-28 2xl:px-40 px-6 sm:px-20`}>
					<div className="flex items-center sm:items-start gap-5 relative">
						<div className="flex flex-col justify-center sm:items-start gap-6 sm:gap-10">
							<motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`text-4xl md:text-5xl lg:text-6xl font-medium h-fit lg:leading-[4rem]`}>
								<h1 className="w-full break-all">{lang['es'].title}</h1>
							</motion.div>
							<motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0, duration: 1.2 }} className={`flex flex-col gap-5 ${darkMode ? 'description-dark font-light' : 'description-light'}`}>
								<p className="break-all">{lang['es'].description}</p>
							</motion.div>
						</div>
					</div>
					<div className="flex flex-col gap-20">
						<div className="flex flex-col items-start gap-2">
							{/* <div>Categories</div> */}
							<div className="flex flex-col items-start gap-3">
								<div className="text-lg">{lang['es'].categories.title}</div>
								<div className="flex items-center gap-2 flex-wrap">
									<Category key={"all"} category={{ name: lang['es'].categories.default, code: "all" }} fn={{ state: selectedCategory, set: setSelectedCategory }} />
									{categories.map((category, index) => (
										<Category key={index} category={category.attributes} fn={{ state: selectedCategory, set: setSelectedCategory }} />
									))}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-5">
							<div className="text-3xl break-all">{lang['es'].articles.title}</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-10">
								{blogs.length != 0 && !loading && blogs.map((blog, index) => (
									<Blog key={index} blog={blog} />
								))}
								{loading && (
									<>
										<BlogSkeleton />
										<BlogSkeleton />
										<BlogSkeleton />
										<BlogSkeleton />
									</>
								)}
							</div>
							{blogs.length == 0 && !loading && fetchError && (
								<div className={`text-center ${darkMode ? 'description-dark' : 'description-light'}`}>
									<p>{lang['es'].notFound.p1}</p>
									<p>{lang['es'].notFound.p2}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

function Blog({ blog }) {

	const { darkMode } = useContextProvider();

	const { url, title, subtitle, preview } = blog.attributes || {};

	return (
		<Link href={`/services/${url}`} className="flex flex-col gap-3 hover:scale-[102%] transition-transform active:scale-100">
			<div className="image-container aspect-video">
				<Image loading="eager" className="object-cover rounded-md" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
			</div>
			{/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
			<Link className="flex items-center justify-between gap-2 hover:text-primary transition-colors" href={`/services/${url}`}>
				<div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
				<div className="w-5 h-5">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
					</svg>
				</div>
			</Link>
			<div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
		</Link>
	)
}

function BlogSkeleton() {

	const { darkMode } = useContextProvider();

	return (
		<div className="flex flex-col gap-3">
			<div className={`aspect-[3/2] w-full animate-pulse ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md`}></div>
			<div className={`h-4 w-2/3 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md`}></div>
			<div className={`h-3 w-full ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md`}></div>
		</div>
	)
}

function Category({ category, fn }) {

	const { darkMode } = useContextProvider();

	function handleSelectCategory() {
		if (category.code == fn.state.code) {
			return;
		}
		fn.set(category);
	}

	return (
		<div onClick={handleSelectCategory} className={`grid place-content-center border rounded-lg ${darkMode ? "border-white hover:bg-white hover:text-black hover:border-transparent" : "border-black hover:bg-black hover:text-white hover:border-transparent"} px-3 py-2 transition-colors cursor-pointer ${fn.state.code == category.code ? `${darkMode ? 'bg-white text-black' : 'bg-black text-white'}` : ''}`}>
			<span>{category.name}</span>
		</div>
	)
}

export const getStaticProps = async (context) => {
	const config = {
		headers: {
			Authorization: `bearer ${process.env.STRAPI_TOKEN}`
		}
	}

	const { data } = await axios(`${process.env.STRAPI_URI}/api/categories`, config);

	return {
		props: {
			categories: data.data
		}
	}
}