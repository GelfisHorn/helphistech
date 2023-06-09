import axios from "axios";
// React
import { useEffect, useState } from "react";
// Nextjs
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// Components
import Layout from "@/components/Layout";
// import ShortContact from "@/components/ShortContact";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Markdown to format Starpi data
import ReactMarkdown from 'react-markdown'
// Languages
import lang from '../../lang/services/blog.json'
// Animations
import { AnimatePresence } from "framer-motion";

export default function Blog({ blog }) {

    const router = useRouter();
    const { blog: blogUrl } = router.query;

    const { darkMode, language, setLanguage } = useContextProvider();

    const [ latestBlogs, setLatestBlogs ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ fetchError, setFetchError ] = useState(false);

    useEffect(() => {
        setLanguage('de')
        if(!blog.title) {
            router.push('/404');
            return;
        }
        // Fetch popular blogs
        setLoading(true);
        getLatestBlogs();
    }, [blogUrl, language])

    async function getLatestBlogs() {
        const category = blog?.category?.data?.attributes?.code;
        getBlogsByCategory(blog.url, category, 'de');
    }

    async function getBlogsByCategory(actual, category, language) {
        try {
            const { data } = await axios.post('/api/blogs/getByCategory', { actual, category, language });
            if (data.data.length != 0) {
                setLatestBlogs(data.data);
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

    const [showContactPopup, setShowContactPopup] = useState(false);
    const [hideContactPopup, setHideContactPopup] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (hideContactPopup) {
                window.removeEventListener('scroll', handleScroll);
                return;
            }

            const scrollPosition = window.scrollY;
            const triggerPosition = 700;

            if (scrollPosition > triggerPosition) {
                setShowContactPopup(true);
            } else {
                setShowContactPopup(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        blog.title && (
            <Layout title={`${blog.title} | Blogs`} lang={'de'} metaDesc={blog.metaDescription} styles={{backgroundColor: darkMode ? "#080808" : "#F6F6F6"}}>
                <div className={`${darkMode ? 'blog-bg-dark' : 'blog-bg-light'}`}>
                    <BlogHeroSection blog={blog} />
                    <div className={"flex flex-col gap-20 py-14 xs:py-20 px-8 xs:px-10 md:px-20 2xl:px-28"}>
                        <div className="flex flex-col">
                            {blog.section.map((section, index) => (
                                <BlogElement key={index} element={section} type={section.__component.split('.')[1]} />
                            ))}
                        </div>
                        <div className={"flex flex-col gap-20"}>
                            <LatestBlogsSection blogs={latestBlogs || []} loading={loading} fetchError={fetchError} />
                            {/* <ShortContact /> */}
                        </div>
                    </div>
                </div>
                {blog.popupTitle && (
                    <ContactPopup show={{ get: showContactPopup, set: setShowContactPopup }} hide={{ get: hideContactPopup, set: setHideContactPopup }} title={blog.popupTitle} description={blog.popupDescription} />
                )}
            </Layout>
        )
    )
}

function BlogHeroSection({ blog }) {

    const { language } = useContextProvider();

    return (
        <div className="image-container min-h-[30rem] md:min-h-[35rem] 2xl:min-h-[40rem] h-[50vh] md:h-[70vh] overflow-hidden">
            <div className={"absolute top-0 left-0 bg-black w-full h-full"}>
                <Image className="object-cover opacity-40" fill src={blog.preview.data.attributes.url} />
            </div>
            <div className="grid grid-cols-1 relative px-8 xs:px-10 md:px-20 2xl:px-28 mx-auto 2xl:mx-0 h-full">
                <div className="flex flex-col gap-20 xs:gap-10 justify-center absolute h-full w-fit col-start-1 col-end-1">
                    <h1 className={`lg:w-2/3 text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-white font-semibold uppercase leading-[3rem] md:leading-[3.5rem] xl:leading-[4.4rem] 2xl:leading-[5.5rem]`}>{blog.title}</h1>
                    <div className={`text-right xs:text-left text-xl 2xl:text-2xl text-white font-light`}>
                        <h4>HelphisTech</h4>
                        <span className="text-base 2xl:text-lg">{lang['de'].slogan.description}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BlogElement({ element, type }) {
    
    const { darkMode } = useContextProvider();

    // console.log(element?.content && element?.content.split('\n'))

    const ELEMENTS = {
        title: (
            <div className={"pt-3 pb-5"}>
                <h2 className={`text-3xl xl:text-5xl font-semibold uppercase`}>{element.title}</h2>
            </div>
        ),
        subtitle: (
            <div className={`${darkMode ? 'text-[#C7C7C7]' : 'text-[#333333]'} text-xl uppercase font-medium`}>{element.subtitle}</div>
        ),
        content: (
            <div className="flex flex-col gap-5 pt-5 pb-10 2xl:text-lg">
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

function LatestBlogsSection({ blogs, loading, fetchError }) {

    const { language, darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-5"}>
            <div className={"text-2xl sm:text-3xl"}>{lang['de'].articles.title}</div>
            <div>
                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-5"}>
                    {!loading && !fetchError && blogs.length != 0 && blogs.map((blog, index) => (
                        <BlogPopularBlog key={index} blog={blog} />
                    ))}
                    {loading && (
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </>
                    )}
                </div>
                {!loading && blogs.length == 0 && fetchError && (
                    <div className={"flex flex-col gap-2"}>
                        <div className={`flex flex-col ${darkMode ? "description-dark" : "description-light"}`}>
                            <div>{lang['de'].articles["no-articles"].title}</div>
                            <div>{lang['de'].articles["no-articles"].description}</div>
                        </div>
                        <Link href={"/internetseite"} className={"flex items-center gap-1 text-primary hover:text-primary-2"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>{lang['de'].articles["no-articles"].back}</span>
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
        <div className="flex flex-col gap-3">
            <div className="image-container">
                <Image className="image rounded-md" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
            </div>
            {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
            <Link className="flex items-center gap-5 hover:text-primary transition-colors" href={`/internetseite/${url}`}>
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

function ContactPopup({ show, hide, title, description }) {

    const { darkMode } = useContextProvider();

    const [showModal, setShowModal] = useState(false);

    const [showContactModal, setShowContactModal] = useState(false);

    const handleShowModal = () => setShowContactModal(true);
    const handleCloseModal = () => setShowContactModal(false);
    const handleClosePopup = () => {
        show.set(false);
        setTimeout(() => {
            hide.set(true)
            setShowModal(show);
        }, 170)
    }

    useEffect(() => {
        if (hide.get) {
            return;
        }
        if (show.get) {
            setShowModal(show.get);
            return;
        }
        setTimeout(() => {
            setShowModal(show.get);
        }, 170)
    }, [show.get])

    return (
        showModal && (
            <div className={`${show.get ? "contact-popup-show" : "contact-popup-hide"} fixed right-5 bottom-5 ${darkMode ? "bg-gradient-to-br from-[#070707] to-neutral-900 text-zinc-300" : "bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-lg"} rounded-2xl px-7 py-7 min-w-[24rem]`}>
                <button className={"absolute top-2 right-2"} onClick={handleClosePopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={"flex flex-col gap-5 text-center"}>
                    <div className={"flex flex-col"}>
                        <div className={"uppercase text-lg 2xl:text-xl font-medium"}>{title}</div>
                        <div className={"2xl:text-lg"}>{description}</div>
                    </div>
                    <button onClick={handleShowModal} className={"flex items-center justify-center gap-1 bg-primary hover:bg-primary-2 py-1 2xl:py-2 px-3 rounded-full text-white transition-colors"}>
                        <span>Kontakt</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
                <AnimatePresence
                    initial={false}
                    mode={"wait"}
                    onExitComplete={() => null}
                >
                    {/* {showContactModal && (
                        <SecondaryContactModal modalOpen={showContactModal} handleClose={handleCloseModal} />
                    )} */}
                </AnimatePresence>
            </div>
        )
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
        const { data } = await axios.get(`${process.env.STRAPI_URI}/api/blogs?filters[url][$eq]=${blogUrl}&populate=section.image&populate=preview.image&populate=category&locale=all`, config)
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