"use client"

import Navbar from "../components/Navbar/page"
import styles from "./local-feed.module.css"
import Link from "next/link"
import { useState } from "react"

export default function LocalFeedPage() {
    const [sort, setsort] = useState("new")
    return (
        <>
            <Navbar />
            <div className={styles.cp}>
                <p className={styles.p1}>Local</p>
                <p className={styles.p2}>Feed!</p>
            </div>
            <div>
               <button className={`${styles.new} ${styles.glowButton}`} id="new" onClick={() => setsort("new")}>What's new</button>
               <button className={`${styles.trending} ${styles.glowButton}`} id="trending" onClick={() => setsort("trending")}>Trending</button>
            </div>
            <div>
                
            </div>
        </>
    )
}