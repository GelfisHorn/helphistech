// Nextjs
import { useRouter } from "next/router";
import Link from "next/link"
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

// Redirects routes
const REDIRECTS = {
    "hero": "/",
    "our-services": "/internetseite",
    "our-process": "/custom-web-entwicklung",
    "our-technologies": "/technologien",
    "my-project": "/contact",
}

export default function Footer() {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    function handleNavButton(hash) {
        if(router.pathname === '/') {
            const element = document.getElementById(`${hash}`);
            if(element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        router.push(REDIRECTS[hash]);
    }

    return (
        <footer className={`${darkMode ? 'text-dark border-neutral-900 bg-darkmode' : 'text-light border-neutral-200'} border-t`}>
            <div className="flex flex-col items-start gap-16 py-16 px-6 lg:px-10 xl:px-0 max-w-7xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 justify-center lg:justify-start text-center lg:text-left lg:gap-y-0 w-full">
                    <FooterColumn>
                        <Link href={"/"} className={"flex justify-center lg:justify-start"}>
                            <Image className="w-auto h-[3.8rem]" src={`${router.pathname == '/' ? "/logo/dark/full-256.webp" : darkMode ? '/logo/dark/full-256.webp' : '/logo/light/full-256.webp'}`} width={255} height={122} alt="HelphisTech logo" priority />
                        </Link>
                    </FooterColumn>
                    <FooterColumn title={"Navigation"}>
                        <div className={`flex flex-col gap-2 ${darkMode ? 'text-dark' : 'text-light'}`}>
                            <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                                <span className="hover:underline hover:text-primary transition-colors">Startseite</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-services")}>
                                <span className="hover:underline hover:text-primary transition-colors">Dienstleistungen</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-process")}>
                                <span className="hover:underline hover:text-primary transition-colors">Verfahren</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-technologies")}>
                                <span className="hover:underline hover:text-primary transition-colors">Technologien</span>
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
                    <FooterColumn title={"Kontakt"}>
                        <Link className="flex items-center justify-center lg:justify-start gap-2 hover:underline hover:text-primary transition-colors" href="mailto:helphis.tech@gmail.com">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-[1.1rem] h-[1.1rem] ${darkMode ? 'text-dark' : 'text-light'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            <span>helphis.tech@gmail.com</span>
                        </Link>
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