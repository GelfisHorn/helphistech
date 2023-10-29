// Nextjs
import { useRouter } from "next/router";
import Link from "next/link"
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

// Redirects routes
const REDIRECTS = {
    "hero": "/",
    "digitalmarketing": "/marketingdigital",
    "app": "/mobile-application",
    "website": "/website",
    "my-project": "/contact",
}

export default function Footer() {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    function handleNavButton(hash) {
        router.push(REDIRECTS[hash]);
    }

    return (
        <footer className={`${darkMode ? 'text-dark border-neutral-900 bg-darkmode' : 'text-light border-neutral-200'} border-t`}>
            <div className="flex flex-col items-start gap-16 py-16 px-6 lg:px-10 xl:px-0 max-w-7xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 justify-center lg:justify-start text-center lg:text-left lg:gap-y-0 w-full">
                    <FooterColumn>
                        <Link href={"/"} className={"flex justify-center lg:justify-start"}>
                            <Image className="w-auto h-[3.8rem]" src={`${darkMode ? '/logo/dark/full-256.webp' : '/logo/light/full-256.webp'}`} width={255} height={122} alt="HelphisTech logo" priority />
                        </Link>
                    </FooterColumn>
                    <FooterColumn title={"Navigation"}>
                        <div className={`flex flex-col gap-2 ${darkMode ? 'text-dark' : 'text-light'}`}>
                            <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                                <span className="hover:underline hover:text-primary transition-colors">Startseite</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("digitalmarketing")}>
                                <span className="hover:underline hover:text-primary transition-colors">Online Marketing</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("app")}>
                                <span className="hover:underline hover:text-primary transition-colors">App Entwicklung</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("website")}>
                                <span className="hover:underline hover:text-primary transition-colors">Website Entwicklung</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("my-project")}>
                                <span className="hover:underline hover:text-primary transition-colors">Kontakt</span>
                            </div>
                            <Link href={"/#faq"} className="cursor-pointer">
                                <span className="hover:underline hover:text-primary transition-colors">Häufig gestellte Fragen</span>
                            </Link>
                        </div>
                    </FooterColumn>
                    {/* <FooterColumn title={"Sozialen Medien"}>
                        <div className="flex flex-col gap-2 items-center lg:items-start">
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://linkedin.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/linkedin2.webp" : "/footer/linkedin.webp"} width={30} height={26} alt="Linkedin image" />    
                                </div>
                                <div>Linkedin</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://github.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/github2.webp" : "/footer/github.webp"} width={30} height={26} alt="Github image" />   
                                </div>
                                <div>GitHub</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://youtube.com/@HelphisTech"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/youtube2.webp" : "/footer/youtube.webp"} width={30} height={26} alt="Youtube image" />   
                                </div>
                                <div>Youtube</div>
                            </Link>
                            <Link className="flex items-center gap-2 hover:text-primary transition-colors" href={"https://instagram.com"}>
                                <div className="grid place-content-center w-4">
                                    <Image src={darkMode ? "/footer/darkmode/instagram2.webp" : "/footer/instagram.webp"} width={30} height={26} alt="Instagram image" />   
                                </div>
                                <div>Instagram</div>
                            </Link>
                        </div>
                    </FooterColumn> */}
                    <FooterColumn title={"Legal"}>
                        <div className={`flex flex-col gap-2 items-center lg:items-start`}>
                            <Link href={"/impressum"} className={"flex items-center gap-2 hover:underline hover:text-primary transition-colors"}>Impressum</Link>
                            <Link href={"/datenschutz"} className={"flex items-center gap-2 hover:underline hover:text-primary transition-colors"}>Datenschutz</Link>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Socials"}>
                        <div className={`flex flex-col gap-2 ${darkMode ? 'text-dark' : 'text-light'}`}>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-[#FF0000] transition-colors" href="https://www.youtube.com/@HelphisTech" target={"_blank"}>
                                <i className="fa-brands fa-youtube w-5 grid place-content-center"></i>
                                <span>Youtube</span>
                            </Link>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-[#C13584] transition-colors" href="https://www.instagram.com/helphis.tech/" target={"_blank"}>
                                <i className="fa-brands fa-instagram w-5 grid place-content-center"></i>
                                <span>Instagram</span>
                            </Link>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-[#4267B2] transition-colors" href="https://www.facebook.com/profile.php?id=61551224920707" target={"_blank"}>
                                <i className="fa-brands fa-square-facebook w-5 grid place-content-center"></i>
                                <span>Facebook</span>
                            </Link>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-[#ff0050] transition-colors" href="#" target={"_blank"}>
                                <i className="fa-brands fa-tiktok w-5 grid place-content-center"></i>
                                <span>Tiktok</span>
                            </Link>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-[#0A66C2] transition-colors" href="https://www.linkedin.com/in/helphistech" target={"_blank"}>
                                <i className="fa-brands fa-linkedin w-5 grid place-content-center"></i>
                                <span>Linkedin</span>
                            </Link>
                            <Link className="flex items-center justify-center lg:justify-start gap-2 hover:text-primary transition-colors" href="info@helphistech.com">
                                <i className="fa-light fa-envelope w-5 grid place-content-center"></i>
                                <span>info@helphistech.com</span>
                            </Link>
                        </div>
                    </FooterColumn>
                </div>
            </div>
            <div className={`${darkMode ? 'border-neutral-900 text-neutral-400' : 'border-neutral-300 text-neutral-600'} text-center border-t  py-3`}>
                <div className="text-sm">©Helphis Tech 2023</div>
            </div>
        </footer>
    )
}

function FooterColumn({title, children}) {
    
    const { darkMode } = useContextProvider();

    return (
        <div className="flex flex-col items-center lg:items-start gap-3 lg:w-fit lg:mx-auto h-full">
            {title && (
                <div className={`text-lg uppercase font-semibold ${darkMode ? "description-dark" : "description-light"}`}>{title}</div>
            )}
            <div className={"h-full"}>{children}</div>
        </div>
    )
}