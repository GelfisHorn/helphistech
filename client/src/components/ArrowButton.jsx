import Link from "next/link";
import { motion } from "framer-motion";

const toLeftVar = {
    rest: { opacity: 1, x: 0, ease: "easeOut", duration: 0.1, type: "tween" },
    hover: {
        x: -5,
        transition: {
            duration: 0.1,
            type: "tween",
            ease: "easeIn"
        }
    }
};

const toRightVar = {
    rest: { opacity: 1, x: 0, ease: "easeOut", duration: 0.1, type: "tween" },
    hover: {
        x: 5,
        transition: {
            duration: 0.1,
            type: "tween",
            ease: "easeIn"
        }
    }
};

export default function Button({ text, toLeft, toRight, link, classes, width }) {
    return (
        link ? (
            <motion.div initial="rest" whileHover="hover" animate="rest" className={width}>
                <Link href={link} className={`flex items-center gap-1 w-full bg-primary hover:bg-primary-2 transition-colors text-white ${classes}`}>
                        {toRight && (
                            <>
                                <span>{text}</span>
                                <motion.svg variants={toRightVar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </motion.svg>
                            </>
                        )}
                        {toLeft && (
                            <>
                                <motion.svg variants={toLeftVar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </motion.svg>
                                <span>{text}</span>
                            </>
                        )}
                </Link>
            </motion.div>
        ) : (
            <div className={"w-fit cursor-pointer"}>
                <motion.div initial="rest" whileHover="hover" animate="rest" className={`flex items-center gap-1 bg-primary hover:bg-primary-2 transition-colors text-white w-fit ${classes}`}>
                    {toRight && (
                        <>
                            <span>{text}</span>
                            <motion.svg variants={toRightVar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </motion.svg>
                        </>
                    )}
                    {toLeft && (
                        <>
                            <motion.svg variants={toLeftVar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </motion.svg>
                            <span>{text}</span>
                        </>
                    )}
                </motion.div>
            </div>
        )
    )
}