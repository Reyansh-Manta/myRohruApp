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
                            <p>From Rohru?</p>
                            <p>Explore</p>
                            <p>these!!!</p>
                        </div>
                        <div className={`${styles.d1} ${styles.cards}`}>
                            <a href="/local-feed">
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
                    <div className={styles.down1}>
                        <div className={`${styles.sign} ${styles.cards}`}>
                            <a href="/wiki">
                                <img src="./Sweet(19).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.d6} ${styles.cards}`}>
                            <a href="/must-visit">
                                <img src="./Sweet(20).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.sign} ${styles.cards}`}>
                            <p>A Visitor?</p>
                            <p>Explore</p>
                            <p>these!!!</p>
                        </div>
                    </div>
                    <div className={styles.down2}>
                        <div className={`${styles.d7} ${styles.cards}`}>
                            <a href="/accomodations">
                                <img src="./Sweet(21).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                        <div className={`${styles.d8} ${styles.cards}`}>
                            <a href="/tips-from-locals">
                                <img src="./Sweet(22).png" alt="" style={{ width: "20vw", borderRadius: "15px", border: "3px", borderColor: "black", borderStyle: "solid" }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}