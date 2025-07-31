import styles from "./Navbar.module.css"
import Link from "next/link"

export default function Navbar() {
    return(
        <nav className={styles.nav}>
            <a href="/home">
            <img src="/My.png" alt="logo" />
            </a>

            <ul className={styles.list}>
                <Link className={`${styles.dashboard} ${styles.link}`}>
                Dashboard
                </Link>
                <Link className={`${styles.about} ${styles.link}`}>
                About Us
                </Link>
            </ul>
        </nav>
    )
}