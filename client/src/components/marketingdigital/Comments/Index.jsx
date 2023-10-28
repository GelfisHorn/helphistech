
// React
import { useState } from "react";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";;
// import required modules
import { Pagination } from "swiper";
// Lang
import locales from "@/lang/components/marketingdigital/Comments";
// Animation
import { motion } from "framer-motion";

export default function MDComments({ comments }) {

    const { darkMode, language } = useContextProvider();

    return (
        <section className={`${darkMode ? 'section-bg-dark border-neutral-900' : 'section-bg-light border-zinc-300'} py-28 overflow-hidden border-t`} id="client-comments">
            <div className={"flex flex-col gap-20 px-6 sm:px-10"}>
                <div className="flex flex-col gap-5 items-center">
                    <span
                        className={`uppercase font-semibold ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}
                    >{locales[language.toUpperCase()].subtitle}</span>
                    <h2
                        className={`text-center text-3xl sm:text-5xl font-bold ${darkMode ? 'title-dark' : 'title-light'}`}
                    >{locales[language.toUpperCase()].title}</h2>
                    <div className={`flex flex-col items-center gap-2 border-t pt-5 ${darkMode ? 'border-neutral-800' : 'border-neutral-300'}`}>
                        <div>{locales[language.toUpperCase()].averageRating}</div>
                        <div className={"flex items-center gap-1"}>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                        </div>
                    </div>
                </div>
                <motion.div 
                    className={"client-comment"}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: .2, origin: 1 }}
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 20
                            }
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className={`process-swiper ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                    >
                        <div className={"h-full"}>
                            {comments.map((comment, index) => (
                                <SwiperSlide key={index} className={"cursor-move"}>
                                    <CommentCard
                                        title={comment?.title}
                                        description={comment?.description}
                                        name={comment?.name}
                                        gender={comment?.gender}
                                    />
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </motion.div>
            </div>
        </section>
    )
}

function CommentCard({ title, description, name, gender }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`flex flex-col gap-4 justify-center ${darkMode ? "bg-neutral-900" : "bg-white"} shadow-sm w-full h-full px-10 py-8 rounded-lg`}>
            <div className={"flex flex-col justify-between h-full gap-6"}>
                <div className={"flex flex-col gap-5"}>
                    <div className={"text-xl font-light"}>{title}</div>
                    <div className={`font-light ${darkMode ? "description-dark" : "description-light"}`}>{description}</div>
                </div>
                <div className={"flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0"}>
                    <div className={"flex items-center gap-4"}>
                        <div className={`grid place-content-center w-16 h-16 ${darkMode ? "bg-neutral-800 text-neutral-300" : "section-bg-light"} rounded-full text-zinc-500`}>
                            {gender == 'male' ? (
                                <i className="fa-solid fa-user-hair text-3xl text-primary"></i>
                            ) : (
                                <i className="fa-solid fa-user-hair-long text-3xl text-primary"></i>
                            )}
                        </div>
                        <div className={`font-light text-lg ${darkMode ? "text-neutral-300" : "text-neutral-700"}`}>{name}</div>
                    </div>
                    <div className={'flex justify-end'}>
                        <Stars stars={5} darkMode={darkMode} />
                    </div>
               </div>
            </div>
        </div>
    )
}

function Stars({ stars, darkMode }) {

    const [ remainingStars ] = useState(5 - stars);

    return (
        <div className={"flex items-center gap-[2px]"}>
            {Array.from(Array(stars), (star, index) => (
                <i key={index} className={"fa-solid fa-star text-primary"}></i>
            ))}
            {remainingStars ? (
                Array.from(Array(remainingStars), (star, index) => (
                    <i key={index} className={`fa-solid fa-star ${darkMode ? "text-neutral-600" : "text-neutral-300"}`}></i>
                ))
            ) : null}
        </div>
    )
}