"use client"

import axios from "axios"
import Navbar from "../components/Navbar/page"
import styles from "./announcements.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AnnouncementsPage() {
    const [sort, setsort] = useState("new")
    const [fetchposts, setfetchposts] = useState([false])
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/posts/category/general-announcements?sortBy=${sort}`,
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
                <div style={{ position: "fixed", top: "0px", width: "100%", zIndex: "100" }}>
                    <Navbar />
                </div>

                <div className={styles.main}>


                    <input type="checkbox" id="sidetg" hidden />
                    <label htmlFor="sidetg" style={{ backgroundColor: "transparent", zIndex: "10", width: "40px", height: "40px" , display: "block", position: "fixed", top: "115px" , left: "12px", cursor: "pointer"}}>
                        <img className={styles.menuIcon} src="/menu.png" alt="" style={{ width: "30px", height: "30px", marginLeft: "7px", marginTop: "5px", backgroundColor: "transparent", zIndex: "10" }} />
                    </label>

                    <div className={styles.mainleft} >
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

                    <img src="/Untitled design.png" alt="" className={styles.bgimage} />

                    <div className={styles.mainright}>
                        <div className={styles.cp}>
                            <p className={styles.p1}>Announ</p>
                            <p className={styles.p2}>cements!</p>
                        </div>
                        <div className={styles.sortButtons} style={{ backgroundColor: "transparent" }}>
                            <div style={{ backgroundColor: "transparent" }}>
                                {/* <button className={`${styles.new} ${styles.glowButton}`} id="new" onClick={() => setsort("new")}>What's new</button>
                                <button className={`${styles.trending} ${styles.glowButton}`} id="trending" onClick={() => setsort("likes")}>Trending</button> */}
                            </div>
                        </div>

                        <div className={styles.posts}>
                            {posts.map((post) => (
                                <Link href={`/post-open/${post.id}`} key={post.id}>
                                <div className={styles.container} key={post.id}>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className={styles.incont}>
                                        <img style={{ width: "inherit"}} src={post?.image?.trim() || "/placeholder.png"} alt="" />
                                    </div>
                                    <p className={styles.title}>{post.title}</p>
                                    <p className={styles.author}>{post.postedBy}</p>
                                    <p className={styles.date}>{new Date(post.createdAt).toLocaleString()}</p>
                                </div>
                                </Link>
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