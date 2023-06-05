import axios from "axios";
// React
import { useEffect, useState } from 'react'
// Components
import Layout from "@/components/Layout";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Markdown to format Starpi data
import ReactMarkdown from 'react-markdown'

export default function DataProtection() {
    
    const { darkMode, language } = useContextProvider();

    const [ data, setData ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (language) {
            getDatenchutzData();
        }
    }, [language])

    async function getDatenchutzData() {
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/datenschutz`, { language });
            setData(data);
        } catch (error) {
            console.log(error.response.data)
            console.error("Error getting datenchutz data");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout title={data.title || "Datenschutz"} lang={language} metaDesc={data.meta || ""} styles={{ backgroundColor: darkMode ? "#080808" : "#F6F6F6" }}>
            <div className={`${darkMode ? 'blog-bg-dark' : 'blog-bg-light'}`}>
                <div className={"flex flex-col gap-10 px-6 xs:px-10 md:px-20 2xl:px-28 py-20 text-center xs:text-left"}>
                    {!loading && data?.title && (
                        <>
                            <h1 className={"text-4xl xs:text-5xl lg:text-6xl font-medium break-words"}>{data.title}</h1>
                            <div className={`flex flex-col gap-5 ${darkMode ? "description-dark" : "description-light"}`}>
                                {data.content.split('\n\n').map((section, index) => (
                                    <ReactMarkdown key={index} className={"strapi-markdown lg:text-lg"}>{section}</ReactMarkdown>
                                ))}
                            </div>
                        </>
                    )}
                    {loading && (
                        <LoadingSkeleton />
                    )}
                </div>
            </div>
        </Layout>
    )
}

function LoadingSkeleton() {

    const { darkMode } = useContextProvider();

    return (
        <div className={"flex flex-col gap-10"}>
            <div className={`rounded-2xl h-16 w-1/2 ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'}`}></div>
            <div className={"flex flex-col gap-5"}>
                <div className={`h-48 w-full rounded-2xl ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} animate-pulse`}></div>
                <div className={`h-56 w-full rounded-2xl ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} animate-pulse`}></div>
                <div className={`h-64 w-full rounded-2xl ${darkMode ? 'bg-neutral-900' : 'bg-neutral-200'} animate-pulse`}></div>
            </div>
        </div>
    )
}