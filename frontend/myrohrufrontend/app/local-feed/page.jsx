"use client"

import axios from "axios"
import Navbar from "../components/Navbar/page"
import styles from "./local-feed.module.css"
import Link from "next/link"
import { useState } from "react"

export default async function LocalFeedPage() {
    const [sort, setsort] = useState("new")
    try {
        const data = await axios.get('http://localhost:2002/api/v1/posts/category/local-feed',
            { withCredentials: true }    
        )
        var posts = data.posts
        
    } catch (error) {
        throw new Error("Failed to fetch posts")
    }
    return (
        <>
            <Navbar />
            <div className={styles.main}>
                <img src="/Untitled design.png" alt="" className={styles.bgimage}/>
                <div className={styles.cp}>
                    <p className={styles.p1}>Local</p>
                    <p className={styles.p2}>Feed!</p>
                </div>
                <div>
                    <button className={`${styles.new} ${styles.glowButton}`} id="new" onClick={() => setsort("new")}>What's new</button>
                    <button className={`${styles.trending} ${styles.glowButton}`} id="trending" onClick={() => setsort("trending")}>Trending</button>
                </div>

                {posts.map((post) => (
                    <div className={styles.container} key={post.id}>
                        <div className={styles.incont}>
                            <img src={post.image} alt="" style={{}}/>
                        </div>
                        <p className={styles.title}>{post.title}</p>
                        <p className={styles.author}>{post.user}</p>
                        <p className={styles.date}>{post.createdAt}</p>
                    </div>
                ))}

            </div>
        </>
    )
}