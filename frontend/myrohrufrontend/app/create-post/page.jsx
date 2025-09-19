"use client"

import axios from "axios"
import Navbar from "../components/Navbar/page"
import styles from "./create-post.module.css"
import { useUser } from "../context/UserContext"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


export default function CreatePost() {

    const router = useRouter()

    const categories = []
    const [localFeed, setLocalFeed] = useState(0)
    const [localFacilities, setLocalFacilities] = useState(0)
    const [events, setEvents] = useState(0)
    const [localBusiness, setLocalBusiness] = useState(0)
    const [orchards, setOrchards] = useState(0)
    const [mustVisitLocations, setMustVisitLocations] = useState(0)
    const [photobook, setphotobook] = useState(0)
    const [C1, setC1] = useState(0)
    const [C2, setC2] = useState(0)
    const [C3, setC3] = useState(0)
    const [C4, setC4] = useState(0)
    const [C5, setC5] = useState(0)
    const [C7, setC7] = useState(0)
    const [C8, setC8] = useState(0)
    const [message, setmessage] = useState("")
    const [mess, setmess] = useState("")
    const [checked, setchecked] = useState(false)
    const [posts, setPosts] = useState([])

    const { loggedIn, checking } = useUser()

    async function submitdata(event) {
        try {
            const formData = new FormData(event.currentTarget)
            const datas = Object.fromEntries(formData.entries())
            if (C1 != 0) { categories.push(C1) }
            if (C2 != 0) { categories.push(C2) }
            if (C3 != 0) { categories.push(C3) }
            if (C4 != 0) { categories.push(C4) }
            if (C5 != 0) { categories.push(C5) }
            if (C7 != 0) { categories.push(C7) }
            if (C8 != 0) { categories.push(C8) }
            datas.category = categories
            console.log(datas);
            const response = await axios.post(`http://localhost:2002/api/v1/posts/createPost`,
                datas,
                { withCredentials: true }
            )
            setPosts(response.data.data)
            return true
        } catch (error) {
            throw new Error("Failed to post")
        } finally {
            setchecked(true)
        }
    }



    async function sub(event) {
        event.preventDefault();
        if (C1 == 0 && C2 == 0 && C3 == 0 && C4 == 0 && C5 == 0 && C7 == 0 && C8 == 0) {
            setmessage("You need to select atleast 1 category")
            alert("you need to select atleast 1 category")
            return
        }

        try {
            const call = await submitdata(event)
            if (call) {
                setmessage("")
                setmess("Post created successfully")
            }
        } catch (error) {
            setmessage("Failed to create post")
        }

    }

    useEffect(() => {
        console.log(checking);

        if (!loggedIn && checking) {
            // router.push('/login')
        }
    }, [loggedIn, checking])

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


                    <form onSubmit={sub}>
                        <div>
                            <label className={`${styles.labelTitle} ${styles.label}`} htmlFor="title">Title</label>
                            <input className={`${styles.inputTitle} ${styles.input}`} type="text" name="title" id="title" placeholder="Enter the title" />

                            <label className={`${styles.labelContent} ${styles.label}`} htmlFor="content">Content</label>
                            <textarea className={`${styles.inputContent} ${styles.input}`} name="content" id="content" placeholder="Enter the content"></textarea>

                            <label className={`${styles.labelCategory} ${styles.label}`} htmlFor="category">Category</label>
                            <div>
                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC1(prev => prev === 0 ? "local-feed" : 0)
                                    }}>local-feed</button>
                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC2(prev => prev === 0 ? "local-facilities" : 0)
                                    }}>local-facilities</button>

                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC3(prev => prev === 0 ? "events" : 0)
                                    }}>events</button>

                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC4(prev => prev === 0 ? "local-business" : 0)
                                    }}>local-business</button>

                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC5(prev => prev === 0 ? "orchards" : 0)
                                    }}>orchards</button>

                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC7(prev => prev === 0 ? "must-visit-locations" : 0)
                                    }}>must-visit-locations</button>

                                <button type="button" className={styles.catbtn}
                                    onClick={() => {
                                        setC8(prev => prev === 0 ? "photobook" : 0)
                                    }}>photobook</button>

                                <p style={{ color: "red" }}>{message}</p>
                            </div>
                            <button className={styles.submit} type="submit">Submit</button>
                        </div>
                    </form>
                    <p style={{ color: "green" }}>{mess}</p>
                </div>

            </div>
        </>
    )

}