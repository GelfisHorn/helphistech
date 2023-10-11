import Link from 'next/link'
// Styles
import styles from './Index.module.css'

const WAPP_NUMBER = "+491512077952"

export default function WhatsAppButton() {
    return (
        <Link href={`https://api.whatsapp.com/send?phone=${WAPP_NUMBER}`} target={"_blank"} className={styles.button}>
            <i className={`fa-brands fa-whatsapp text-white text-4xl`}></i>
        </Link>
    )
}