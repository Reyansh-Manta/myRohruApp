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
                            <img src="/saru.webp" alt="" className={styles.b1bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                            <div style={{ zIndex: '1', position:'relative', backgroundColor: 'transparent' }}>
                                <p className={styles.b1s1} style={{ color: '#004aad' }}>Local News</p>
                            </div>
                        </div>

                        <div className={styles.box2}>

                        </div>

                        <div className={styles.box3}>
                            <img src="/apple.jpg" alt="" className={styles.b3bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                            <div style={{ zIndex: '1', position:'relative', backgroundColor: 'transparent' }}>
                                <p className={styles.b3s1} style={{ color: '#004aad' }}>Orchards</p>
                            </div>
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