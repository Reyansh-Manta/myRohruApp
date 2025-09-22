"use client"

import axios from "axios"
import Navbar from "../../components/Navbar/page"
import styles from "./photo-book.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter , useParams} from "next/navigation"
import React from "react"

export default function PostPage() {
    const params = useParams();
    const { id } = params
    const [fetchposts, setfetchposts] = useState([false])
    const [post, setPosts] = useState([])
    const router = useRouter()
    console.log(id);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2002/api/v1/posts/post/${id}`,
                    { withCredentials: true }
                )
                setPosts(response.data.data[0])
                console.log(response.data.data[0]);
            } catch (error) {
                throw new Error("Failed to fetch post")
            } finally {
                setfetchposts(true)
            }
        }
        fetchData()
    }, [])

    if (fetchposts) {

        return (
            <>
                <div style={{ position: "fixed", top: "0px", width: "100%", zIndex: "100" }}>
                    <Navbar />
                </div>

                <div className={styles.main}>


                    <input type="checkbox" id="sidetg" hidden />
                    <label htmlFor="sidetg" style={{ backgroundColor: "transparent", zIndex: "10", width: "40px", height: "40px", display: "block", position: "fixed", top: "115px", left: "12px", cursor: "pointer" }}>
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
                        <div className={styles.cp} style={{marginTop:"40px"}}>
                            <p className={styles.p1}>{`${post.title}`}</p>
                        </div>
                        <div className={styles.cp}>
                            <p className={styles.p12}>{`Posted by ${post.postedBy} at ${new Date(post.createdAt).toLocaleString()}`}</p>
                        </div>
                        <div className={styles.cp1}>
                            <p className={styles.p2}>{`${post.content}`}</p>
                        </div>
                        <div className={styles.pica1} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" , marginBottom:"150px", marginTop:"55px", gap:"20px"}}>
                            {post.image?.map(image => (<img src={image} alt="" key={image} className={styles.image} style={{ width: "100%", height: "auto" }} />))}
                        </div>
                    </div>

                </div>
            </>
        )
    }
    else {
        {<h1>Loading...</h1>}
    }
}