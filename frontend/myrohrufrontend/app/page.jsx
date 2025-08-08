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
            <img src="./bg.jpg" alt="" style={{ width: "100vw", opacity: "0.8", height: "100vh", position: "fixed", top: "0px" }} className={styles.bg} />

            <div className={styles.main}>
                <Navbar />
                <div className={styles.cute}>
                    {/* <img src="./Welcome to(1).png" alt="" style={{height: "110px"}} /> */}
                </div>
                <div className={styles.up}>
                    <div className={styles.up1}>
                        <div className={`${styles.sign} ${styles.cards}`}>
                            <h1>From Rohru?</h1>
                            <h1>Explore</h1>
                            <h1>these!!!</h1>
                        </div>
                        <div className={`${styles.d1} ${styles.cards}`}>
                            <a href="/local">
                                <img src="./Sweet(16).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.d2} ${styles.cards}`}>
                            <a href="/events">
                                <img src="./Sweet(14).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                    </div>
                    <div className={styles.up2}>
                        <div className={`${styles.d3} ${styles.cards}`}>
                            <a href="/general">
                                <img src="./Sweet(12).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.d4} ${styles.cards}`}>
                            <a href="/weathernroads">
                                <img src="./Sweet(10).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.d5} ${styles.cards}`}>
                            <a href="/orchards">
                                <img src="./Sweet(9).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
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