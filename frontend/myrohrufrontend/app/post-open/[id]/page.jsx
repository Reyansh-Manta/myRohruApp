"use client"

import axios from "axios"
import Navbar from "../../components/Navbar/page"
import styles from "./post-open.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useUser } from "../../context/UserContext"
import React from "react"

export default function PostPage() {
    const params = useParams();
    const { id } = params
    const [fetchposts, setfetchposts] = useState([false])
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [post, setPosts] = useState([])
    const { loggedIn, checking, user } = useUser()
    const [same, setsame] = useState(false)
    const router = useRouter()
    console.log("init: ", same);
    
    // console.log(user.username);

    useEffect(() => {
        if (showDeleteConfirmation) {
            document.querySelector(`.${styles.suredel}`).style.display = "block"
        }
        else {
            document.querySelector(`.${styles.suredel}`).style.display = "none"
        }
    }, [showDeleteConfirmation])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/posts/post/${id}`,
                    { withCredentials: true }
                )
                setPosts(response.data.data[0])
                // console.log(response.data.data[0]);
            } catch (error) {
                throw new Error("Failed to fetch post")
            } finally {
                setfetchposts(true)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        // console.log(checking);
        // console.log(same);

        // console.log(user);
        // console.log(user?.username);
        // console.log(post.postedBy);


        if (!loggedIn && checking) {
            setsame(false)
        }
        else if (user?.username == post.postedBy) {
            setsame(true)
            // console.log(same)
        }
        else {
            setsame(false)
            // console.log(same)
        }
        console.log("final: ", same);
    }, [!checking])

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
                        <div className={styles.cp} style={{ margin: "5px", marginTop: "55px" }}>
                            <p style={{padding: '17px'}} className={styles.p1}>{`${post.title}`}</p>
                        </div>
                        <div className={styles.cp} style={{ margin: "5px" }}>
                            <p style={{padding: '17px'}} className={styles.p12}>{`Posted by ${post.postedBy} at ${new Date(post.createdAt).toLocaleString()}`}</p>
                        </div>
                        <div className={styles.cp1} style={{ margin: "5px" }}>
                            <p style={{padding: '17px'}} className={`${styles.p2} ${styles['preserve-format']}`}>{`${post.content}`}</p>
                        </div>
                        <div className={styles.pica1} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "150px", marginTop: "55px", gap: "20px", backgroundColor: "transparent" }}>
                            {post.image?.map(image => (<img src={image} alt="" key={image} className={styles.image} style={{ width: "60%", height: "auto", objectFit: "cover" , paddingBottom: "20px", backgroundColor: "transparent"}} />))}
                        </div>
                        {same ? <button className={`${styles.glowButton} ${styles.delbtn}`} type="checkbox" style={{ paddingBottom: "5px" }} onClick={() => setShowDeleteConfirmation(true)}>Delete Post</button> : null}


                        <div className={styles.suredel}>
                            <div>
                                <p className={styles.p1}>Are you sure you want to delete this post?</p>
                            </div>
                            <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                <button className={`${styles.glowButton} `} style={{ marginBottom: "10px" }} onClick={async () => {
                                    try {
                                        await axios.delete(`http://localhost:2002/api/v1/posts/delpost/${id}`, { withCredentials: true });
                                        router.push("/photo-book");
                                    } catch (error) {
                                        console.error("Failed to delete post:", error);
                                    }
                                }}>Delete</button>
                                <button className={`${styles.glowButton} `} style={{ marginBottom: "10px", paddingRight: "10px" }} onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
    else {
        { <h1>Loading...</h1> }
    }
}