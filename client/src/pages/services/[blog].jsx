import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Date formatter
import moment from "moment";
// Markdown to format Starpi data
import ReactMarkdown from 'react-markdown'

export default function Blog({ blog }) {

    const router = useRouter();
    const { blog: blogUrl } = router.query;

    const { darkMode, language } = useContextProvider();

    const [ latestBlogs, setLatestBlogs ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ fetchError, setFetchError ] = useState(false);

    useEffect(() => {
        if(!blog.title) {
            router.push('/404');
            return;
        }
        // Fetch popular blogs
        setLoading(true);
        if(language != "") {
            getLatestBlogs();
        }
    }, [blogUrl, language])

    async function getLatestBlogs() {
        try {
            const { data } = await axios.post('/api/blogs/blog/get', { actualBlog: blogUrl, language });
            if(data.data.length == 0) {
                setFetchError(true);
                return;
            }
            setLatestBlogs(data.data);
        } catch (error) {
            setFetchError(true)
        } finally {
            setLoading(false);
        }
    }

    return (
        blog.title && (
            <Layout title={`${blog.title} | Blogs`} lang={language} metaDesc={blog.metaDescription} styles={{backgroundColor: darkMode ? "#080808" : "#F6F6F6"}}>
                <div className={`${darkMode ? 'bg-gradient-to-br from-[#080808] to-[#070707] blog-bg-dark' : 'bg-gradient-to-br from-[#F6F6F6] to-[#FFF] blog-bg-light'}`}>
                    <div className="relative image-container min-h-[30rem] md:min-h-[35rem] 2xl:min-h-[40rem] h-[50vh] md:h-[70vh] overflow-hidden">
                        <Image className="object-cover opacity-40" fill src={blog.preview.data.attributes.url} />
                        <div className="grid grid-cols-1 relative px-10 md:px-20 2xl:px-28 mx-auto 2xl:mx-0 h-full text-center xs:text-left">
                            <div className="flex flex-col gap-10 justify-center absolute h-full w-fit col-start-1 col-end-1">
                                <h1 className="lg:w-2/3 text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-white font-semibold uppercase leading-[3rem] md:leading-[3.5rem] xl:leading-[4.4rem] 2xl:leading-[5.5rem]">{blog.title}</h1>
                                <div className="text-xl 2xl:text-2xl text-white font-light">
                                    <h4>HelphisTech</h4>
                                    <span className="text-base 2xl:text-lg">ihr Weg zur Digitalisierung</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col py-14 xs:py-20 px-6 xs:px-10 md:px-20 2xl:px-28">
                        {blog.section.map((section, index) => (
                            <BlogElement key={index} element={section} type={section.__component.split('.')[1]} />
                        ))}
                    </div>
                </div>
            </Layout>
        )
    )
}

function BlogElement({ element, type }) {
    
    const { darkMode } = useContextProvider();

    // console.log(element?.content && element?.content.split('\n'))

    const ELEMENTS = {
        title: (
            <div className={"pt-3"}>
                <h2 className={`text-3xl xl:text-5xl font-semibold uppercase`}>{element.title}</h2>
            </div>
        ),
        subtitle: (
            <div className={`${darkMode ? 'description-dark' : 'description-light'} text-lg uppercase font-medium`}>{element.subtitle}</div>
        ),
        content: (
            <div className="flex flex-col gap-5 pt-10">
                {element?.content?.split("\n\n").map((line, index) => (
                    <ReactMarkdown className={"strapi-markdown"} key={index}>{line}</ReactMarkdown>
                ))}
            </div>
        ),
        image: (
            <div className="image-container pt-10">
                <Image className="image rounded-md" src={element?.image?.data?.attributes?.url} fill alt={element?.image?.data?.attributes?.hash} />
            </div>
        ),
        video: (
            <div></div>
        )
    }

    return (
        <div className="">{ELEMENTS[type]}</div>
    )
}

function BlogPopularBlog({ blog }) {

    const { url, title, subtitle, preview } = blog.attributes || {};

    const { darkMode, language } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className="image-container">
                <Image className="image rounded-md" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
            </div>
            {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
            <Link className="flex items-center gap-5 hover:text-primary transition-colors" href={`/services/${url}`}>
                <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </Link>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
        </div>
    )
}

function BlogSkeleton() {

    const { darkMode } = useContextProvider();

    return(
        <div className="flex flex-col gap-3">
            <div className={`aspect-[3/2] w-full animate-pulse ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md`}></div>
            <div className={`h-4 w-2/3 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md animate-pulse`}></div>
            <div className={`h-3 w-full ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md animate-pulse`}></div>
        </div>
    )
}

export const getStaticProps = async (context) => {

    const blogUrl = context.params.blog;

    const config = {
        headers: {
            Authorization: `bearer ${process.env.STRAPI_TOKEN}`
        }
    }

    try {
        const { data } = await axios.get(`${process.env.STRAPI_URI}/api/blogs?filters[url][$eq]=${blogUrl}&populate=section.image&populate=preview.image&locale=all`, config)
        // axios.get(`${process.env.STRAPI_URI}/api/blogs?locale=all&populate=preview&pagination[page]=1&pagination[pageSize]=4&filters[url][$not]=${blogUrl}`, config)

        return {
            props: {
                blog: data?.data[0]?.attributes || {}
            }
        }
    } catch (error) {
        return {
            props: {
                blog: {}
            }
        }
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}