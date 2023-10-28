import Layout from "@/components/Layout";
import useContextProvider from "@/hooks/useAppContextProvider";
import { useEffect, useState } from "react";
import lang from '../lang/confirmation.json'
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/ArrowButton";

const TITLE = {
    "de": "Wir haben ihre Anfrage erhalten",
    "en": "We have received your request",
    "es": "Hemos recibido tu solicitud"
}

const BUTTON_REDIRECT = {
    "de": "/",
    "en": "/en",
    "es": "/es"
}

export default function ConfirmationPage() {
    
    const { darkMode, language } = useContextProvider();

    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        
        gtag('event', 'conversion', { 'send_to': 'AW-11148352893/ixFeCOuN_q0YEP26-cMp' });
    }, [])

    useEffect(() => {
        if(!language) {
            return;
        }
        getBlogs();
    }, [language])

    async function getBlogs() {
        if(!language) {
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post('/api/blogs/get', { language, limit: 3 });
            if (data.data.length != 0) {
                setLatestBlogs(data.data);
                setFetchError(false);
                return;
            }

            setLatestBlogs([]);
            setFetchError(true);
        } catch (error) {
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout title={TITLE[language] || TITLE.de} lang={language}>
            <div className={`py-20 sm:pb-28 2xl:px-40 px-6 sm:px-20 ${darkMode ? 'blog-bg-dark' : 'blog-bg-light'}`}>
                <div className={"flex flex-col gap-40"}>
                    <div className={"flex flex-col-reverse lg:flex-row items-center justify-center gap-20 lg:gap-10"}>
                        <div className={"flex flex-col gap-10 text-center lg:text-left items-center lg:items-start lg:w-2/3"}>
                            <div className={"flex flex-col gap-4"}>
                                <h1 className={"text-4xl xl:text-5xl 2xl:text-6xl leading-[3.2rem] xl:leading-[4rem] 2xl:leading-[4.5rem] font-semibold"}>{lang[language].title}</h1>
                                <p className={`${darkMode ? "description-dark" : "description-light"} xl:text-lg`}>{lang[language].subtitle}</p>
                            </div>
                            <Button
                                text={lang[language].button}
                                toLeft={true}
                                link={BUTTON_REDIRECT[language]}
                                classes={"py-2 px-4 rounded-full"}
                            />
                        </div>
                        <div className={"w-[80%] sm:w-1/2 lg:w-1/3"}>
                            <Image loading={'eager'} className={"w-full"} src={"/confirmation.webp"} width={1684} height={1876} />
                        </div>
                    </div>
                    <LatestBlogsSection blogs={latestBlogs || []} loading={loading} fetchError={fetchError} />
                </div>
            </div>
        </Layout>
    )
}

function LatestBlogsSection({ blogs, loading, fetchError }) {

    const { language, darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-5"}>
            <div className={"text-2xl sm:text-3xl"}>{lang[language].articles.title}</div>
            <div>
                <div className={"grid grid-cols-1 lg:grid-cols-3 gap-5"}>
                    {!loading && !fetchError && blogs.length != 0 && blogs.map((blog, index) => (
                        <BlogPopularBlog key={index} blog={blog} />
                    ))}
                    {loading && (
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </>
                    )}
                </div>
                {!loading && blogs.length == 0 && fetchError && (
                    <div className={"flex flex-col gap-2"}>
                        <div className={`flex flex-col ${darkMode ? "description-dark" : "description-light"}`}>
                            <div>{lang[language].articles["no-articles"].title}</div>
                            <div>{lang[language].articles["no-articles"].description}</div>
                        </div>
                        <Link href={"/website"} className={"flex items-center gap-1 text-primary hover:text-primary-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>{lang[language].articles["no-articles"].back}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

function BlogPopularBlog({ blog }) {

    const { url, title, subtitle, preview } = blog.attributes || {};

    const { darkMode, language } = useContextProvider();

    return (
        <Link href={`/blogs/${url}`} className="flex flex-col gap-3 hover:text-primary hover:scale-[102%] transition-all">
            <div className="image-container aspect-video overflow-hidden rounded-md">
                <Image className="relative object-cover rounded-md aspect-video" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
            </div>
            {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
            <div className="flex items-center gap-5">
                <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </div>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
        </Link>
    )
}

function BlogSkeleton() {

    const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className={`aspect-[3/2] w-full animate-pulse ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md`}></div>
            <div className={`h-4 w-2/3 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md animate-pulse`}></div>
            <div className={`h-3 w-full ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} rounded-md animate-pulse`}></div>
        </div>
    )
}