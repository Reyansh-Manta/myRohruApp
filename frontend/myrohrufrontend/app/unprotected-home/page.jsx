"use client"

import Navbar from "../components/Navbar/page"
import styles from "./unprotected-home.module.css"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function UnprotectedHome() {

    const router = useRouter()
    const { loggedIn, checking } = useUser()

    useEffect(() => {
        console.log(checking);

        if (loggedIn && checking) {
            router.push('/')
        }
    }, [!checking])

    return (
        <>
            <div className={styles.main}>
                <Navbar />
                <div className={styles.mainins}>
                    <div className={styles.mainleft}>From Rohru? {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}Explore these</div>
                    <div className={styles.mainright}>
                        <div className={styles.box1}>
                            <img src="/localnews.png" alt="" className={styles.b1img1}/>
                            <img src="/b1i2.png" alt="" className={styles.b1img2}/>
                        </div>
                        <div className={styles.box2}> 

                        </div>
                        <div className={styles.box3}> 

                        </div>
                        <div className={styles.box4}> 

                        </div>
                        <div className={styles.box5}> 

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}