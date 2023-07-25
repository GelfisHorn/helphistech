// Nextjs
import Link from "next/link";
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";
import { motion } from "framer-motion";
// Carousel
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

export default function PricesSection() {

    // Get functions and variables from context
    const { darkMode } = useContextProvider();

    return (
        <section className={`relative overflow-hidden ${darkMode ? 'section-bg-dark border-[#19191F]' : 'section-bg-light border-zinc-300'} flex items-center py-28 border-t`} id="our-technologies">
            <div className="xl:max-w-7xl 2xl:max-w-[90rem] mx-auto w-full relative">
                <div className={"flex flex-col gap-20"}>
                    <div className={"flex flex-col gap-8 text-center px-6 sm:px-10 lg:px-20"}>
                        <div className={"flex flex-col gap-5"}>
                            <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Encuentra el plan perfecto para llevar tu proyecto al siguiente nivel</div>
                            <h2 className={"text-3xl sm:text-5xl font-bold"}>Servicios de Desarrollo Web a la medida</h2>
                        </div>
                        <p className={`${darkMode ? "description-dark" : "description-light"}`}>A continuación, te presentamos nuestros tres paquetes diseñados para satisfacer las necesidades de cualquier proyecto, desde pequeñas empresas hasta aplicaciones web de gran escala.</p>
                    </div>
                    <div className={"flex justify-center w-full"}>
                        <div className={"hidden xl:flex items-start gap-6"}>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full bg-[#131313] py-16 px-12 border ${darkMode ? "border-neutral-800" : "border-neutral-300"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan básico</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>350</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Sitio web estático.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Diseño responsivo.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Integración con un CMS.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Formulario de contacto.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Costo asequible y tiempo de entrega rápido.</span>
                                        </div>
                                    </div>
                                    <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"grid place-content-center bg-primary h-10 text-center rounded-t-xl"}>
                                    <div className={"uppercase text-sm"}>Más popular</div>
                                </div>
                                <div className={`flex flex-col items-center justify-between gap-12 bg-[#0D1020] py-16 px-12 rounded-b-xl text-center`}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan pro</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>750</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Todo lo del Plan Básico.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Sitio web dinámico.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Integración de base de datos.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Autenticación de usuarios.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Optimización de rendimiento.</span>
                                        </div>
                                    </div>
                                    <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                            <div className={"w-[22rem] h-full"}>
                                <div className={"bg-transparent h-10 text-center"}></div>
                                <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full bg-[#131313] py-16 px-12 border ${darkMode ? "border-neutral-800" : "border-neutral-300"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                    <div className={"flex flex-col items-center gap-5"}>
                                        <div className={"text-2xl font-light"}>Plan premium</div>
                                        <div className={"flex items-center"}>
                                            <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                <span>1250</span>
                                            </div>
                                            <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Todo lo del Plan Avanzado.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Aplicación Full-stack.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Admin panel.</span>
                                        </div>
                                        <div className={"flex items-start gap-4"}>
                                            <i className="fa-regular fa-check text-primary mt-1"></i>
                                            <span>Soporte prioritario.</span>
                                        </div>
                                    </div>
                                    <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Swiper
                                slidesPerView={3}
                                centeredSlides={true}
                                spaceBetween={20}
                                grabCursor={true}
                                pagination={{
                                    clickable: true,
                                }}
                                className={"prices-swiper"}
                            >
                                <SwiperSlide>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full bg-[#131313] py-16 px-12 border ${darkMode ? "border-neutral-800" : "border-neutral-300"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan básico</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>350</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Sitio web estático.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Diseño responsivo.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Integración con un CMS.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Formulario de contacto.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Costo asequible y tiempo de entrega rápido.</span>
                                                </div>
                                            </div>
                                            <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"grid place-content-center bg-primary h-10 text-center rounded-t-xl"}>
                                            <div className={"uppercase text-sm"}>Más popular</div>
                                        </div>
                                        <div className={`flex flex-col items-center justify-between gap-12 bg-[#0D1020] py-16 px-12 rounded-b-xl text-center`}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan pro</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>750</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Todo lo del Plan Básico.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Sitio web dinámico.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Integración de base de datos.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Autenticación de usuarios.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Optimización de rendimiento.</span>
                                                </div>
                                            </div>
                                            <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={"w-[22rem] h-full mx-auto"}>
                                        <div className={"bg-transparent h-10 text-center"}></div>
                                        <div className={`flex flex-col items-center justify-between gap-12 w-[22rem] h-full bg-[#131313] py-16 px-12 border ${darkMode ? "border-neutral-800" : "border-neutral-300"} rounded-xl text-center`} style={{ height: "calc(100% - 2.5rem)" }}>
                                            <div className={"flex flex-col items-center gap-5"}>
                                                <div className={"text-2xl font-light"}>Plan premium</div>
                                                <div className={"flex items-center"}>
                                                    <div className={"flex items-center gap-1 font-medium text-5xl"}>
                                                        <i className="fa-sharp fa-solid fa-euro-sign text-[2.6rem]"></i>
                                                        <span>1250</span>
                                                    </div>
                                                    <div className={`${darkMode ? "text-neutral-500" : "text-neutral-500"} uppercase font-semibold`}>/month</div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-3 list-disc w-full text-left"}>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Todo lo del Plan Avanzado.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Aplicación Full-stack.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Admin panel.</span>
                                                </div>
                                                <div className={"flex items-start gap-4"}>
                                                    <i className="fa-regular fa-check text-primary mt-1"></i>
                                                    <span>Soporte prioritario.</span>
                                                </div>
                                            </div>
                                            <button className={"py-3 px-8 bg-primary hover:bg-primary-2 transition-colors text-white rounded-md uppercase font-semibold"}>Empezar</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}