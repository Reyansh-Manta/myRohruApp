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
                <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
                    <Navbar />
                </div>
                <div className={styles.main}>

                    <div className={styles.mainleft} style={{ position: "fixed", top: "100px", zIndex: "5", overflowY: "scroll" }}>
                        <a href="/create-post" className={styles.SidebarLink}>Create Post</a>
                        <a href="/local-feed" className={styles.SidebarLink}>Local Feed</a>
                        <a href="/announcements" className={styles.SidebarLink}>Announcements</a>
                        <a href="/orchards" className={styles.SidebarLink}>Orchards</a>
                        <a href="/businesses" className={styles.SidebarLink}>Local Businesses</a>
                        <a href="/events" className={styles.SidebarLink}>Events</a>
                        <a href="/wiki" className={styles.SidebarLink}>Rohru Wiki</a>
                        <a href="/locations" className={styles.SidebarLink}>Travel Locations</a>
                        <a href="/facilities" className={styles.SidebarLink}>Local Facilities</a>
                        <a href="/photo-book" className={styles.SidebarLink}>Photo Book</a>
                    </div>
                    <div className={styles.leftpopup} style={{ position: "fixed", top: "100px", zIndex: "5", overflowY: "scroll"  }}>
                        <img src="/menu.png" alt=""  style={{ width: "30px", height: "30px", marginLeft: "15px", marginTop: "15px", backgroundColor: "transparent" }} />
                    </div>

                    <img src="/Untitled design.png" alt="" className={styles.bgimage} />

                    <div className={styles.mainright}>
                        <div className={styles.cp}>
                            <p className={styles.p1}>Local</p>
                            <p className={styles.p2}>Feed!</p>
                        </div>
                        <div style={{ backgroundColor: "transparent", paddingBottom: "20px", paddingLeft: "10px" }}>
                            <div style={{ backgroundColor: "transparent" }}>
                                <button className={`${styles.new} ${styles.glowButton}`} id="new" onClick={() => setsort("new")}>What's new</button>
                                <button className={`${styles.trending} ${styles.glowButton}`} id="trending" onClick={() => setsort("likes")}>Trending</button>
                            </div>
                        </div>

                        <div className={styles.posts}>
                            {posts.map((post) => (
                                <div className={styles.container} key={post.id}>
                                    <div className={styles.incont}>
                                        <img src={post.image} alt="" />
                                    </div>
                                    <p className={styles.title}>{post.title}</p>
                                    <p className={styles.author}>{post.postedBy}</p>
                                    <p className={styles.date}>{post.createdAt}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </>
        )
    }
    else {
        <h1>Loading...</h1>
    }
}