import axios from "axios";
// Nextjs
import { useRouter } from "next/router";
// Components
import Layout from "@/components/Layout";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { useEffect } from "react";

export default function Blog({ blog, popularBlogs }) {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    useEffect(() => {
        if(!blog.title) {
            router.push('/404')
        }
    }, [])

    return (
        blog.title && (
            <Layout title={`${blog.title} | Blogs`} lang={'de'} metaDesc={blog.metaDescription}>
                <div className="flex flex-col xl:flex-row items-start gap-20 2xl:gap-28 mx-auto py-20 px-6 sm:px-20 2xl:max-w-[95rem]">
                    <div className="flex flex-col gap-20 xl:w-3/4">
                        <div className="flex flex-col gap-5">
                            <h1 className={`${darkMode ? 'title-dark' : 'title-light'} text-[2.5rem] xl:text-5xl font-medium xl:leading-[3.8rem]`}>{blog.title}</h1>
                            <p>{blog.subtitle}</p>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <div>By</div>
                                    <div className="font-medium">{blog.author}</div>
                                </div>
                                <div className={`${darkMode ? 'title-dark' : 'title-light'} font-medium`}>{moment(blog.publishedAt).format('LLL')}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-10">
                            {Object.keys(blog).length != 0 && blog.section.map((element, index) => (
                                <BlogElement key={index} element={element} type={element.__component.split('.')[1]} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 xl:w-1/4">
                        <div className={`text-xl ${darkMode ? 'title-dark' : 'title-light'}`}>Popular posts</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-10">
                            {popularBlogs.length != 0 && popularBlogs.map((blog, index) => (
                                <BlogPopularBlog key={index} blog={blog} />
                            ))}
                        </div>
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
            <h2 className={`${darkMode ? 'title-dark' : 'title-light'} text-3xl xl:text-4xl font-medium mt-10`}>{element.title}</h2>
        ),
        subtitle: (
            <div className={darkMode ? 'description-dark' : 'description-light'}>{element.subtitle}</div>
        ),
        content: (
            <div className="flex flex-col gap-4">
                {element?.content?.split("\n\n").map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        ),
        image: (
            <div className="image-container">
                <Image className="image" src={element?.image?.data?.attributes?.url} fill alt={element?.image?.data?.attributes?.hash} />
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

    const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col gap-3">
            <div className="image-container">
                <Image className="image" src={preview?.data?.attributes?.url} fill alt={preview?.data?.attributes?.hash} />
            </div>
            {/* <div className={`aspect-[3/2] ${darkMode ? 'bg-neutral-900' : 'bg-zinc-200'} transition-colors`}></div> */}
            <Link className="flex items-center gap-5 hover:text-primary transition-colors" href={`/blogs/${url}`}>
                <div className="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[40px] h-[40px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </Link>
            <div className={`${darkMode ? 'description-dark' : 'description-light'} overflow-hidden text-ellipsis line-clamp-3`}>{subtitle}</div>
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

    const data = await Promise.all([
        axios.get(`${process.env.STRAPI_URI}/api/blogs?filters[url][$eq]=${blogUrl}&populate=section.image&locale=en`, config),
        axios.get(`${process.env.STRAPI_URI}/api/blogs?locale=en&populate=preview&pagination[page]=1&pagination[pageSize]=4`, config)
    ])

    return {
        props: {
            blog: data[0].data?.data[0]?.attributes || {},
            popularBlogs: data[1].data?.data || []
        }
    }
}

export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}