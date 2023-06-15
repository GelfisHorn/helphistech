import { useEffect } from 'react';
// Modal Backdrop
import ModalBackdrop from "./Backdrop";
// Hooks
import useContextProvider from "@/hooks/useAppContextProvider";
// Animations
import { motion } from "framer-motion";

export default function Modal({ handleClose, children }) {

    const { darkMode } = useContextProvider();

    useEffect(() => {
        document.body.classList.add("body-in-modal-open")
        return () =>
            document.body.classList.remove("body-in-modal-open")
    }, [])

    return (
        <ModalBackdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className={`modal ${darkMode ? "bg-neutral-900" : "bg-white"} rounded-md`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {children}
            </motion.div>
        </ModalBackdrop>
    )
}