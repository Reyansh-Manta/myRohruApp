"use client"

import styles from "./Navbar.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "@/app/context/UserContext"

export default function Navbar({ children }) {

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
            <div style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                <nav className={styles.nav} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                    <div className={styles.po00}>
                        <a className={styles.logo} href="/">
                            <div className={styles.po0} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                                <p className={styles.po1} style={{backgroundColor: "white", margin: "0", padding: "0"}}>My</p>
                                <p className={styles.po2} style={{backgroundColor: "white", margin: "0", padding: "0"}}>Rohru</p>
                            </div>
                        </a>
                    </div>

                    <input type="checkbox" id="side" hidden />
                    <label htmlFor="side" className={styles.menuIconLabel} style={{ backgroundColor: "transparent", zIndex: "100", width: "40px", top: "30px", height: "40px", display: "block", position: "fixed", right: "12px", cursor: "pointer" }}>
                        <img className={styles.menuIcon} src="/menu.png" alt="" style={{ width: "30px", height: "30px", marginRight: "7px", backgroundColor: "transparent", zIndex: "10" }} />
                    </label>

                    <div className={styles.navoptions}>
                        <Link className={` ${styles.linkNavOptions}`} href={"/logout"}>
                            Logout
                        </Link>
                        <Link className={` ${styles.linkNavOptions}`} href={"/dashboard"}>
                            Dashboard
                        </Link>
                        <Link className={` ${styles.linkNavOptions}`} href={"/aboutus"}>
                            About Us
                        </Link>
                    </div>

                    <ul className={styles.list} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
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
           <div style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                <nav className={styles.nav} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                    <div className={styles.po00}>
                        <a className={styles.logo} href="/">
                            <div className={styles.po0} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
                                <p className={styles.po1} style={{backgroundColor: "white", margin: "0", padding: "0"}}>My</p>
                                <p className={styles.po2} style={{backgroundColor: "white", margin: "0", padding: "0"}}>Rohru</p>
                            </div>
                        </a>
                    </div>

                    <input type="checkbox" id="side" hidden />
                    <label htmlFor="side" className={styles.menuIconLabel} style={{ backgroundColor: "transparent", zIndex: "100", width: "40px", top: "30px", height: "40px", display: "block", position: "fixed", right: "12px", cursor: "pointer" }}>
                        <img className={styles.menuIcon} src="/menu.png" alt="" style={{ width: "30px", height: "30px", marginRight: "7px", backgroundColor: "transparent", zIndex: "10" }} />
                    </label>

                    <div className={styles.navoptions} >
                        <Link className={` ${styles.linkNavOptions}`} href={"/login"}>
                            Login
                        </Link>
                        <Link className={` ${styles.linkNavOptions}`} href={"/register"}>
                            Register
                        </Link>
                        <Link className={` ${styles.linkNavOptions}`} href={"/aboutus"}>
                            About Us
                        </Link>
                    </div>

                    <ul className={styles.list} style={{backgroundColor: "white", margin: "0", padding: "0"}}>
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
