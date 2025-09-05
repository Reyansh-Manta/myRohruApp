"use client"

import axios from "axios"
import Navbar from "../components/Navbar/page"
import styles from "./create-post.module.css"
import { useUser } from "../context/UserContext"
import { useState , useEffect } from "react"

export default function CreatePost() {

    const categories = []
    const [localFeed, setLocalFeed] = useState(0)
    const [generalAnnouncements, setGeneralAnnouncements] = useState(0)
    const [events, setEvents] = useState(0)
    const [weatherAndRoads, setWeatherAndRoads] = useState(0)
    const [orchards, setOrchards] = useState(0)
    const [tipsForTourists, setTipsForTourists] = useState(0)
    const [mustVisitLocations, setMustVisitLocations] = useState(0)
    const [accommodationAndLocalFacilities, setAccommodationAndLocalFacilities] = useState(0)
    const [C1, setC1] = useState(0)
    const [C2, setC2] = useState(0)
    const [C3, setC3] = useState(0)
    const [C4, setC4] = useState(0)
    const [C5, setC5] = useState(0)
    const [C6, setC6] = useState(0)
    const [C7, setC7] = useState(0)
    const [C8, setC8] = useState(0)
    const [message, setmessage] = useState("")
    const [mess, setmess] = useState("")
    const [checked, setchecked] = useState("false")

    const { loggedIn, checking } = useUser()

    function dbcall() {
        const submitdata = async () => {
            try {
                const response = await axios.post(`http://localhost:2002/api/v1/posts/createPost`,
                    { withCredentials: true }
                )
                setPosts(response.data.data)
            } catch (error) {
                throw new Error("Failed to create posts")
            } finally {
                setchecked(true)
            }
        }
    }

    function sub(event) {
        event.preventDefault();
        if (!loggedIn) {
            alert("you need to be loggedin to create a post")
        }
        else if (C1 == 0 && C2 == 0 && C3 == 0 && C4 == 0 && C5 == 0 && C6 == 0 && C7 == 0 && C8 == 0) {
            setmessage("You need to select atleast 1 category")
        }
        else {
            const call = dbcall()
            while (!checked) {
                if (call) {
                    setmessage("")
                    setmess("Post created successfully")
                    event.target.submit()
                }
            }
        }
    }

    useEffect(() => {
        console.log(checking);

        if (!loggedIn && checking) {
            router.push('/unprotected-home')
        }
    }, [!checking])

    return (
        <>
            <Navbar />
            <form onSubmit="sub(event)">
                <div>
                    <label className={`${styles.labelTitle} ${styles.label}`} htmlFor="title">Title</label>
                    <input className={`${styles.inputTitle} ${styles.input}`} type="text" id="title" placeholder="Enter the title" />

                    <label className={`${styles.labelContent} ${styles.label}`} htmlFor="content">Content</label>
                    <textarea className={`${styles.inputContent} ${styles.input}`} id="content" placeholder="Enter the content"></textarea>

                    <label className={`${styles.labelCategory} ${styles.label}`} htmlFor="category">Category</label>
                    <div>
                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC1(0)
                                }
                                else {
                                    setC1("local-feed")
                                }
                            }}>local-feed</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC2(0)
                                }
                                else {
                                    setC2("general-announcements")
                                }
                            }}>general-announcements</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC3(0)
                                }
                                else {
                                    setC3("events")
                                }
                            }}>events</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC4(0)
                                }
                                else {
                                    setC4("weather-and-roads")
                                }
                            }}>weather-and-roads</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC5(0)
                                }
                                else {
                                    setC5("orchards")
                                }
                            }}>orchards</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC6(0)
                                }
                                else {
                                    setC6("tips-for-tourists")
                                }
                            }}>tips-for-tourists</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC7(0)
                                }
                                else {
                                    setC7("must-visit-locations")
                                }
                            }}>must-visit-locations</button>

                        <button className={styles.catbtn}
                            onClick={() => {
                                let count = 0
                                count++
                                if (Number.isInteger(count / 2)) {
                                    setC8(0)
                                }
                                else {
                                    setC8("accomodation-and-local-facilities")
                                }
                            }}>accomodation-and-local-facilities</button>
                        <p style={{ color: "red" }}>{message}</p>
                    </div>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
            <p style={{ color: "red" }}>{mess}</p>
        </>
    )

}