"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"
import styles from "./page.module.css"
import { useUser } from "./context/UserContext"
import Navbar from "./components/Navbar/page"

export default function HomePage() {

    const router = useRouter()
    const { loggedIn, checking } = useUser()

    useEffect(() => {
        console.log(checking);

        if (!loggedIn && checking) {
            router.push('/unprotected-home')
        }
    }, [!checking])

    return (
        <>
            <img src="./chandernahan-lake.jpg" alt="" style={{ width: "100vw", opacity: "0.07", height: "100vh" }} className={styles.bg} />
            <Navbar />
            <div className={styles.main}>
                <div className={styles.cute}>
                    {/* <img src="./Welcome to(1).png" alt="" style={{height: "110px"}} /> */}
                </div>
                <div className={styles.up}>
                    <div>
                        <div className={styles.sign}>
                            <img src="./Sweet_no_bg.png" alt="" style={{width: "35vw", optacity: "0.2"}}/>
                        </div>
                        <div className={styles.d1}></div>
                    </div>
                    <div>
                        <div className={styles.d2}></div>
                        <div className={styles.d3}></div>
                    </div>
                </div>
                <div className={styles.down}>
                    <div className={styles.sign}></div>
                    <div className={styles.d1}></div>
                    <div className={styles.d2}></div>
                    <div className={styles.d3}></div>
                </div>
            </div>
        </>
    )
}