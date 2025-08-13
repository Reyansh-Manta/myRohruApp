"use client"

import axios from "axios"
import Navbar from "../components/Navbar/page"
import styles from "./local-feed.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LocalFeedPage() {
    const [sort, setsort] = useState("new")
    const [fetchposts, setfetchposts] = useState([false])
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2002/api/v1/posts/category/local-feed?sortBy=${sort}`,
                    { withCredentials: true }
                )
                setPosts(response.data.data)
            } catch (error) {
                throw new Error("Failed to fetch posts")
            } finally {
                setfetchposts(true)
            }
        }
        fetchData()
    }, [sort])

    if (fetchposts) {

        return (
            <>
                <Navbar />
                <div className={styles.main}>
                    <img src="/Untitled design.png" alt="" className={styles.bgimage} />
                    <div className={styles.cp}>
                        <p className={styles.p1}>Local</p>
                        <p className={styles.p2}>Feed!</p>
                    </div>
                    <div>
                        <div>
                            <button className={`${styles.new} ${styles.glowButton}`} id="new" onClick={() => setsort("new")}>What's new</button>
                            <button className={`${styles.trending} ${styles.glowButton}`} id="trending" onClick={() => setsort("likes")}>Trending</button>
                        </div>
                        <div>
                            <button className={`${styles.new} ${styles.glowButton}`} id="create-post" onClick={() => router.push("/create-post")}>Create Post</button>
                        </div>
                    </div>

                    {posts.map((post) => (
                        // <div><h1>hi</h1>
                        <div className={styles.container} key={post.id}>
                            <div className={styles.incont}>
                                <img src={post.image} alt="" style={{}} />
                            </div>
                            <p className={styles.title}>{post.title}</p>
                            <p className={styles.author}>{post.postedBy}</p>
                            <p className={styles.date}>{post.createdAt}</p>
                        </div>
                        // </div>
                    ))}

                </div>
            </>
        )
    }
    else {
        <h1>Loading...</h1>
    }
}