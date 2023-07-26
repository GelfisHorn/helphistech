
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
import locales from "@/lang/components/HomeSections/ClientComments";

export default function ClientCommentsSection({ comments }) {

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
                </div>
                <div className={"flex flex-col gap-3 fade-background"}>
                    <div className={"hidden 2xl:grid grid-cols-2 gap-3 fade-element"}>
                        <CommentCard
                            name={comments[0]?.attributes?.name}
                            description={comments[0]?.attributes?.description}
                            stars={comments[0]?.attributes?.stars}
                            gender={comments[0]?.attributes?.gender}
                        />
                        <CommentCard
                            name={comments[1]?.attributes?.name}
                            description={comments[1]?.attributes?.description}
                            stars={comments[1]?.attributes?.stars}
                            gender={comments[1]?.attributes?.gender}
                        />
                    </div>
                    <div className={"hidden 2xl:grid grid-cols-3 gap-3 fade-element"}>
                        <CommentCard
                            name={comments[2]?.attributes?.name}
                            description={comments[2]?.attributes?.description}
                            stars={comments[2]?.attributes?.stars}
                            gender={comments[2]?.attributes?.gender}
                        />
                        <CommentCard
                            name={comments[3]?.attributes?.name}
                            description={comments[3]?.attributes?.description}
                            stars={comments[3]?.attributes?.stars}
                            gender={comments[3]?.attributes?.gender}
                        />
                        <CommentCard
                            name={comments[4]?.attributes?.name}
                            description={comments[4]?.attributes?.description}
                            stars={comments[4]?.attributes?.stars}
                            gender={comments[4]?.attributes?.gender}
                        />
                    </div>
                    <div className={"hidden 2xl:grid grid-cols-2 gap-3 fade-element"}>
                        <CommentCard
                            name={comments[5]?.attributes?.name}
                            description={comments[5]?.attributes?.description}
                            stars={comments[5]?.attributes?.stars}
                            gender={comments[5]?.attributes?.gender}
                        />
                        <CommentCard
                            name={comments[6]?.attributes?.name}
                            description={comments[6]?.attributes?.description}
                            stars={comments[6]?.attributes?.stars}
                            gender={comments[6]?.attributes?.gender}
                        />
                    </div>
                    <div className={"block 2xl:hidden"}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={12}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 12
                                }
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            className={`process-swiper cursor-move ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                        >
                            {comments.map((comment, index) => (
                                <SwiperSlide key={index}>
                                    <CommentCard
                                        name={comment?.attributes?.name}
                                        description={comment?.attributes?.description}
                                        stars={comment?.attributes?.stars}
                                        gender={comment?.attributes?.gender}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CommentCard({ name, description, stars, gender }) {

    const { darkMode } = useContextProvider();

    return (
        <div className={`flex flex-col gap-4 justify-center ${darkMode ? "bg-neutral-900" : "bg-white"} shadow-sm w-full px-4 py-4 rounded-lg fade-element`}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex items-center gap-2"}>
                    <div className={`grid place-content-center w-9 h-9 ${darkMode ? "bg-neutral-800 text-neutral-300" : "section-bg-light"} rounded-full text-primary`}>
                        {gender == 'male' ? (
                            <i className="fa-solid fa-user-hair text-xl"></i>
                        ) : (
                            <i className="fa-solid fa-user-hair-long text-lg"></i>
                        )}
                    </div>
                    <div className={`font-semibold text-lg ${darkMode ? "text-neutral-300" : "text-neutral-700"}`}>{name}</div>
                </div>
                <div className={"text-sm"}>{description}</div>
            </div>
            <Stars stars={stars} darkMode={darkMode} />
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