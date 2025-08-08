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
            <img src="./chandernahan-lake.jpg" alt="" style={{ width: "100vw", opacity: "0.08", height: "100vh", position:"fixed", top: "0px" }} className={styles.bg} />
            
            <div className={styles.main}>
                <Navbar />
                <div className={styles.cute}>
                    {/* <img src="./Welcome to(1).png" alt="" style={{height: "110px"}} /> */}
                </div>
                <div className={styles.up}>
                    <div className={styles.up1}>
                        <div className={`${styles.sign} ${styles.cards}`}>
                            <img src="./Sweet_no_bg.png" alt="" style={{width: "35vw", optacity: "0.2"}}/>
                        </div>
                        <div className={`${styles.d1} ${styles.cards}`}>
                            <img src="./Sweet(2).png" alt="" style={{width: "20vw", borderRadius:"15px", border:"3px", borderColor:"black", borderStyle:"solid"}}/>
                        </div>
                        <div className={`${styles.d2} ${styles.cards}`}>
                            <img src="./Sweet(3).png" alt="" style={{width: "20vw", borderRadius:"15px", border:"3px", borderColor:"black", borderStyle:"solid"}}/>
                        </div>
                    </div>
                    <div className={styles.up2}>
                        <div className={`${styles.d3} ${styles.cards}`}>
                            <img src="./Sweet(5).png" alt="" style={{width: "20vw", borderRadius:"15px", border:"3px", borderColor:"black", borderStyle:"solid"}}/>
                        </div>
                        <div className={`${styles.d4} ${styles.cards}`}>
                            <img src="./Sweet(6).png" alt="" style={{width: "20vw", borderRadius:"15px", border:"3px", borderColor:"black", borderStyle:"solid"}}/>
                        </div>
                        <div className={`${styles.d5} ${styles.cards}`}>
                            <img src="./Sweet(7).png" alt="" style={{width: "20vw", borderRadius:"15px", border:"3px", borderColor:"black", borderStyle:"solid"}}/>
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