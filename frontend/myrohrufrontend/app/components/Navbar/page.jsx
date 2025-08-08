"use client"

import styles from "./Navbar.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/UserContext"

export default function Navbar({children}) {

    const { loggedIn, checking } = useUser()
    const [islog, setislog] = useState(false)

    useEffect(() => {
        console.log(checking);

        if (loggedIn && checking) {
            setislog(true)
        }
    }, [!checking])

    if (islog) {
        return (
            <div style={{opacity: "0.9"}}>
            <nav className={styles.nav}>
                <a href="/">
                    <img src="/My.png" alt="logo" style={{height: "85px" , top:"10px", position: "relative"}}/>
                </a>
                <ul className={styles.list}>
                    <Link className={`${styles.dashboard} ${styles.link}`} href={"/dashboard"}>
                        Dashboard
                    </Link>
                    <Link className={`${styles.about} ${styles.link}`} href={"/aboutus"}>
                        About Us
                    </Link>
                </ul>
            </nav>
            {children}
            </div>
        )
    }
    else {
        return (
            <div>
            <nav className={styles.nav}>
                <a href="/home">
                    <img src="/My.png" alt="logo" />
                </a>
                <ul className={styles.list}>
                    <Link className={`${styles.dashboard} ${styles.link}`} href={"/login"}>
                        Login
                    </Link>
                    <Link className={`${styles.dashboard} ${styles.link}`} href={"/register"}>
                        Register
                    </Link>
                    <Link className={`${styles.about} ${styles.link}`} href={"/aboutus"}>
                        About Us
                    </Link>
                </ul>
            </nav>
            {children}
            </div>
        )
    }
}
