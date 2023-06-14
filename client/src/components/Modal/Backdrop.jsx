import { motion } from "framer-motion";

export default function ModalBackdrop({ children, onClick }) {

    return (
        <motion.div
            className={"backdrop z-50"}
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}