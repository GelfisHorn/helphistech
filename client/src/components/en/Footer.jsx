// Nextjs
import { useRouter } from "next/router";
import Link from "next/link"
import Image from "next/image";
// Context
import useContextProvider from "@/hooks/useAppContextProvider";

// Redirects routes
const REDIRECTS = {
    "hero": "/en",
    "our-services": "/website",
    "our-process": "/en/custom-web-development",
    "our-technologies": "/en/technologies",
    "my-project": "/en/contact",
}

export default function Footer() {

    const router = useRouter();

    const { darkMode } = useContextProvider();

    function handleNavButton(hash) {
        if(router.pathname === '/en') {
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
            <div className="flex flex-col items-start gap-16 py-16 px-16 xl:px-0 max-w-6xl w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-10 justify-center lg:justify-start text-center lg:text-left lg:gap-y-0 w-full">
                    <FooterColumn>
                        <Link href={"/"} className={"flex justify-center lg:justify-start"}>
                            <Image className="w-auto h-[3.8rem]" src={`${router.pathname == '/' ? "/logo/dark/full-256.webp" : darkMode ? '/logo/dark/full-256.webp' : '/logo/light/full-256.webp'}`} width={255} height={122} alt="HelphisTech logo" priority />
                        </Link>
                    </FooterColumn>
                    <FooterColumn title={"Navigation"}>
                        <div className={`flex flex-col gap-2 items-center lg:items-start ${darkMode ? 'text-dark' : 'text-light'}`}>
                            <div className="cursor-pointer" onClick={() => handleNavButton("hero")}>
                                <span className="hover:underline hover:text-primary transition-colors">Home</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-services")}>
                                <span className="hover:underline hover:text-primary transition-colors">Services</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-process")}>
                                <span className="hover:underline hover:text-primary transition-colors">Process</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("our-technologies")}>
                                <span className="hover:underline hover:text-primary transition-colors">Technologies</span>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleNavButton("my-project")}>
                                <span className="hover:underline hover:text-primary transition-colors">Contact</span>
                            </div>
                            <Link href={"/en#faq"} className="cursor-pointer">
                                <span className="hover:underline hover:text-primary transition-colors">FAQs</span>
                            </Link>
                        </div>
                    </FooterColumn>
                    {/* <FooterColumn title={"Social media"}>
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
                            <Link href={"/impressum"} className={"flex items-center gap-2 hover:underline hover:text-primary transition-colors"}>Legal notice</Link>
                            <Link href={"/datenschutz"} className={"flex items-center gap-2 hover:underline hover:text-primary transition-colors"}>Data protection</Link>
                        </div>
                    </FooterColumn>
                    <FooterColumn title={"Contact"}>
                        <div className={`flex flex-col gap-2 items-center lg:items-start`}>
                            <div>
                                <Link className="flex items-center gap-2 hover:underline hover:text-primary transition-colors" href="mailto:helphis.tech@gmail.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-[1.1rem] h-[1.1rem] ${darkMode ? 'text-dark' : 'text-light'}`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <span>helphis.tech@gmail.com</span>
                                </Link>
                            </div>
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
    return (
        <div className="flex flex-col gap-5 lg:w-fit lg:mx-auto">
            <div className="text-2xl font-semibold">{title}</div>
            <div>{children}</div>
        </div>
    )
}