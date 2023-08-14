
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider"
// Animations
import { motion } from "framer-motion";
import Link from "next/link";

const TECHNOLOGIES = {
    de: {
        swift: "Swift ist eine universelle Programmiersprache, die auf einem modernen Ansatz für Sicherheit, Leistung und Software-Designmuster basiert.",
        kotlin: "Kotlin ließ sich von vielen Programmiersprachen inspirieren, darunter (aber nicht beschränkt auf) Java, Scala, C# und Groovy.",
        flutter: "Flutter verändert den App-Entwicklungsprozess. Erstellen, testen und implementieren Sie wunderschöne Mobil-, Web-, Desktop- und eingebettete Apps aus einer einzigen Codebasis.",
        react: "React Native kombiniert die besten Teile der nativen Entwicklung mit React, einer erstklassigen JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen.",
        showMore: "Mehr sehen"
    }
}

export default function AppsTechnologies() {

    const { darkMode } = useContextProvider();

    return (
        <div className={`${darkMode ? "bg-[#101010]" : "section-bg-light"} py-20`}>
            <div className={"flex flex-col items-center gap-20"}>
                <div className={"flex flex-col items-center gap-8 text-center px-6 sm:px-10 lg:px-20 "}>
                    <div className={"flex flex-col gap-5"}>
                        <div className={`font-semibold uppercase ${darkMode ? 'subtitle-dark' : 'subtitle-light'}`}>Technologie-Stack</div>
                        <motion.h2
                            className={"text-3xl sm:text-5xl font-bold"}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >Unser <span className={"text-primary"}>Technologie-Stack</span></motion.h2>
                    </div>
                    <p className={`${darkMode ? "description-dark" : "description-light"} w-full xl:w-2/3`}>Wir unterstützen unsere Kreationen mit einer Reihe robuster Spitzentechnologien. Von vielseitigen Programmiersprachen bis hin zu innovativen Designtools sorgt unser Technologie-Stack für modernste mobile Lösungen.</p>
                </div>
                <motion.div 
                    className={"grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-fit gap-5 px-6 sm:px-10 lg:px-20 2xl:px-0"}
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0}}
                >
                    <div className={`flex flex-col gap-5 bg-[#e84e3614] w-full 2xl:w-[22rem] p-7 rounded-3xl border-2 border-transparent hover:border-[#e84e36] transition-colors`}>
                        <div className={`grid place-content-center w-20 h-20 bg-[#e84e3641] rounded-2xl`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 32 32"> <path fill={"#e84e36"} d="M29.312 21.797c0.073-0.152 0.073-0.297 0.152-0.448 1.791-7.032-2.469-15.256-9.797-19.589 3.213 4.333 4.484 9.495 3.364 14.131-0.072 0.375-0.224 0.823-0.375 1.197-0.203-0.115-0.405-0.239-0.599-0.375 0 0-7.251-4.484-15.027-12.339-0.224-0.224 4.188 6.281 9.12 11.443-2.317-1.348-8.896-6.057-13.011-9.869 0.448 0.817 1.125 1.64 1.797 2.464 3.437 4.411 7.927 9.796 13.308 13.905-3.813 2.323-9.12 2.469-14.505 0-1.344-0.593-2.469-1.344-3.74-2.239 2.245 3.515 5.76 6.728 9.948 8.448 5.011 2.171 10.093 2.020 13.755 0h0.079c0.145-0.073 0.297-0.152 0.448-0.297 1.792-0.901 5.307-1.869 7.249 1.869 0.527 1.047 1.495-3.812-2.167-8.301z" /> </svg>
                        </div>
                        <div className={"font-medium text-2xl"}>{"Swift"}</div>
                        <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.swift}</div>
                        <Link target={"_blank"} href={"https://www.swift.org"} className={"flex items-center gap-2 w-fit text-[#e84e36] hover:text-[#e84e36c4] transition-colors"}>
                            <span>{TECHNOLOGIES.de.showMore}</span>
                            <i class="fa-regular fa-arrow-right-long"></i>
                        </Link>
                    </div>
                    <div className={`flex flex-col gap-5 bg-[#d42fa914] w-full 2xl:w-[22rem] p-7 rounded-3xl border-2 border-transparent hover:border-[#d42fa9] transition-colors`}>
                        <div className={`grid place-content-center w-20 h-20 bg-[#d42fa941] rounded-2xl`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"> <path fill={"#d42fa9"} d="M1.734 32l15.068-15.333 15.198 15.333zM0 0h16l-16 16.667zM17.865 0l-17.865 18.667v13.333l32-32z" /> </svg>
                        </div>
                        <div className={"font-medium text-2xl"}>{"Kotlin"}</div>
                        <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.kotlin}</div>
                        <Link target={"_blank"} href={"https://kotlinlang.org"} className={"flex items-center gap-2 w-fit text-[#d42fa9] hover:text-[#d42fa9c4] transition-colors"}>
                            <span>{TECHNOLOGIES.de.showMore}</span>
                            <i class="fa-regular fa-arrow-right-long"></i>
                        </Link>
                    </div>
                    <div className={`flex flex-col gap-5 bg-[#01549614] w-full 2xl:w-[22rem] p-7 rounded-3xl border-2 border-transparent hover:border-[#015496] transition-colors`}>
                        <div className={`grid place-content-center w-20 h-20 bg-[#01549641] rounded-2xl`}>
                            <svg width={55} height={55} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path fill-rule="nonzero" fill={"#015496"} d="M13.503 2.001l-10 10 3.083 3.083 13.08-13.083h-6.163zm-.006 9.198L8.122 16.62 13.494 22h6.189l-5.387-5.4 5.389-5.4h-6.188z" /> </g> </svg>
                        </div>
                        <div className={"font-medium text-2xl"}>{"Flutter"}</div>
                        <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.flutter}</div>
                        <Link target={"_blank"} href={"https://flutter.dev"} className={"flex items-center gap-2 w-fit text-[#015496] hover:text-[#015496c4] transition-colors"}>
                            <span>{TECHNOLOGIES.de.showMore}</span>
                            <i class="fa-regular fa-arrow-right-long"></i>
                        </Link>
                    </div>
                    <div className={`flex flex-col gap-5 bg-[#61dafb14] w-full 2xl:w-[22rem] p-7 rounded-3xl border-2 border-transparent hover:border-[#61dafb] transition-colors`}>
                        <div className={`grid place-content-center w-20 h-20 bg-[#61dafb41] rounded-2xl`}>
                            <svg width="55" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_950_642)"> <path d="M24 11.689C24 10.0991 22.009 8.59234 18.9564 7.65797C19.6608 4.54668 19.3477 2.07134 17.9682 1.27884C17.6502 1.09295 17.2784 1.00489 16.8724 1.00489V2.0958C17.0974 2.0958 17.2784 2.13983 17.4301 2.22299C18.0954 2.60457 18.384 4.05748 18.159 5.92621C18.1052 6.38606 18.0171 6.87036 17.9095 7.36445C16.9507 7.12964 15.9038 6.94863 14.8031 6.83123C14.1427 5.92621 13.4578 5.10436 12.768 4.38524C14.3628 2.90298 15.8598 2.09091 16.8773 2.09091V1C15.532 1 13.7709 1.95883 11.9902 3.6221C10.2095 1.96861 8.44843 1.01957 7.10314 1.01957V2.11048C8.11578 2.11048 9.61761 2.91765 11.2124 4.39013C10.5275 5.10925 9.84264 5.92621 9.19201 6.83123C8.08643 6.94863 7.03954 7.12964 6.08072 7.36934C5.9682 6.88015 5.88504 6.40563 5.82633 5.95067C5.59641 4.08194 5.88015 2.62903 6.54056 2.24256C6.68732 2.1545 6.87811 2.11537 7.10314 2.11537V1.02446C6.69221 1.02446 6.32042 1.11252 5.99755 1.29841C4.62291 2.09091 4.31472 4.56135 5.02405 7.66286C1.98125 8.60212 0 10.104 0 11.689C0 13.2788 1.99103 14.7856 5.04362 15.7199C4.33918 18.8312 4.65226 21.3066 6.0318 22.0991C6.34978 22.285 6.72157 22.373 7.13249 22.373C8.47778 22.373 10.2389 21.4142 12.0196 19.7509C13.8002 21.4044 15.5614 22.3534 16.9066 22.3534C17.3176 22.3534 17.6894 22.2654 18.0122 22.0795C19.3869 21.287 19.6951 18.8166 18.9857 15.715C22.0188 14.7807 24 13.274 24 11.689ZM17.6307 8.42601C17.4497 9.05707 17.2246 9.7077 16.9702 10.3583C16.7697 9.96698 16.5593 9.57562 16.3294 9.18427C16.1044 8.79291 15.8647 8.41133 15.625 8.03954C16.3196 8.14227 16.9898 8.26947 17.6307 8.42601ZM15.3901 13.636C15.0086 14.2964 14.6172 14.9225 14.2112 15.5047C13.4823 15.5683 12.7436 15.6025 12 15.6025C11.2613 15.6025 10.5226 15.5683 9.79861 15.5096C9.39258 14.9274 8.99633 14.3062 8.61476 13.6506C8.24297 13.0098 7.90542 12.3592 7.59723 11.7036C7.90053 11.0481 8.24297 10.3926 8.60987 9.75173C8.99144 9.09132 9.3828 8.46515 9.78883 7.883C10.5177 7.81941 11.2564 7.78516 12 7.78516C12.7387 7.78516 13.4774 7.81941 14.2014 7.87811C14.6074 8.46025 15.0037 9.08153 15.3852 9.73706C15.757 10.3779 16.0946 11.0285 16.4028 11.6841C16.0946 12.3396 15.757 12.9951 15.3901 13.636ZM16.9702 13C17.2344 13.6555 17.4594 14.311 17.6453 14.947C17.0045 15.1035 16.3294 15.2356 15.6298 15.3384C15.8695 14.9617 16.1093 14.5752 16.3343 14.179C16.5593 13.7876 16.7697 13.3914 16.9702 13ZM12.0098 18.2197C11.5548 17.7501 11.0999 17.2267 10.6498 16.6543C11.0901 16.6739 11.5402 16.6885 11.9951 16.6885C12.455 16.6885 12.9099 16.6788 13.3551 16.6543C12.9148 17.2267 12.4598 17.7501 12.0098 18.2197ZM8.37016 15.3384C7.6755 15.2356 7.0053 15.1084 6.36445 14.9519C6.54545 14.3208 6.77048 13.6702 7.02487 13.0196C7.22544 13.4109 7.43579 13.8023 7.66572 14.1936C7.89564 14.585 8.13045 14.9666 8.37016 15.3384ZM11.9853 5.15817C12.4403 5.6278 12.8952 6.15124 13.3453 6.7236C12.905 6.70404 12.455 6.68936 12 6.68936C11.5402 6.68936 11.0852 6.69914 10.64 6.7236C11.0803 6.15124 11.5353 5.6278 11.9853 5.15817ZM8.36527 8.03954C8.12556 8.41622 7.88585 8.80269 7.66082 9.19894C7.43579 9.5903 7.22544 9.98166 7.02487 10.373C6.7607 9.71749 6.53567 9.06197 6.34978 8.42601C6.99062 8.27436 7.66572 8.14227 8.36527 8.03954ZM3.93804 14.1643C2.20628 13.4256 1.08602 12.457 1.08602 11.689C1.08602 10.9209 2.20628 9.94741 3.93804 9.21362C4.35875 9.03261 4.81859 8.87118 5.29311 8.71953C5.57195 9.67835 5.93885 10.6763 6.3938 11.6987C5.94374 12.7163 5.58174 13.7093 5.30779 14.6633C4.82348 14.5116 4.36364 14.3453 3.93804 14.1643ZM6.56991 21.1549C5.90461 20.7733 5.61598 19.3204 5.84101 17.4517C5.89482 16.9918 5.98288 16.5075 6.0905 16.0135C7.04933 16.2483 8.09621 16.4293 9.1969 16.5467C9.85732 17.4517 10.5422 18.2735 11.232 18.9927C9.63718 20.4749 8.14024 21.287 7.12271 21.287C6.90257 21.2821 6.71667 21.2381 6.56991 21.1549ZM18.1737 17.4272C18.4036 19.296 18.1199 20.7489 17.4594 21.1353C17.3127 21.2234 17.1219 21.2625 16.8969 21.2625C15.8842 21.2625 14.3824 20.4554 12.7876 18.9829C13.4725 18.2638 14.1574 17.4468 14.808 16.5418C15.9136 16.4244 16.9605 16.2434 17.9193 16.0037C18.0318 16.4978 18.1199 16.9723 18.1737 17.4272ZM20.0571 14.1643C19.6364 14.3453 19.1765 14.5067 18.702 14.6584C18.4232 13.6996 18.0563 12.7016 17.6013 11.6792C18.0514 10.6616 18.4134 9.66857 18.6873 8.71464C19.1716 8.86629 19.6315 9.03261 20.062 9.21362C21.7937 9.9523 22.914 10.9209 22.914 11.689C22.9091 12.457 21.7888 13.4305 20.0571 14.1643Z" fill="#61dafb" /> <path d="M11.9951 13.9246C13.2298 13.9246 14.2307 12.9237 14.2307 11.689C14.2307 10.4542 13.2298 9.45332 11.9951 9.45332C10.7604 9.45332 9.75948 10.4542 9.75948 11.689C9.75948 12.9237 10.7604 13.9246 11.9951 13.9246Z" fill="#61dafb" /> </g> <defs> <clipPath id="clip0_950_642"> <rect width="24" height="24" fill="white" /> </clipPath> </defs> </svg>
                        </div>
                        <div className={"font-medium text-2xl"}>{"React Native"}</div>
                        <div className={`${darkMode ? "description-dark" : "description-light"} text-ellipsis-3`}>{TECHNOLOGIES.de.react}</div>
                        <Link target={"_blank"} href={"https://reactnative.dev"} className={"flex items-center gap-2 w-fit text-[#61dafb] hover:text-[#61dafbc4] transition-colors"}>
                            <span>{TECHNOLOGIES.de.showMore}</span>
                            <i class="fa-regular fa-arrow-right-long"></i>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}