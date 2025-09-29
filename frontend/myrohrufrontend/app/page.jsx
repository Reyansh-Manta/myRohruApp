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
    }, [])

    useEffect(() => {
        console.log(checking);

        if (!loggedIn && checking) {
            router.push('/unprotected-home')
        }
    }, [!checking])

    return (
<>
<img src="lb.jpg" alt="" style={{width: '100%', overflow: 'hidden', height: '100vh', objectFit: 'cover', position: 'fixed'}} />
            <div className={styles.bggg} style={{ overflow: 'hidden' , zIndex:'1'}}>
                <div className={styles.main}>
                    <Navbar/>
                    <div className={styles.mainins}>
                        <div style={{backgroundColor: "transparent", color: "white"}} className={styles.mainleft}>From Rohru? {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}Explore these
                        </div>
                        <div style={{backgroundColor: "transparent", color: "white"}} className={styles.mainlefts}>From Rohru? Explore these
                        </div>
                        <div style={{backgroundColor: "transparent"}} className={styles.mainright}>

                            <div className={styles.box1}>
                                <a href="/local-feed" className={styles.linka}>
                                    <img src="/saru.webp" alt="" className={styles.b1bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                    <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                        <p className={styles.b1s1} style={{ color: 'black' }}>Local News</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.box2}>
                                <a href="/announcements" className={styles.linka}>
                                    <img src="/b2.jpg" alt="" className={styles.b2bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' , opacity: '0.9'}} />
                                    <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent', opacity: '1' }}>
                                        <p className={styles.b2s1} style={{opacity: '1'}}>General</p>
                                        <p className={styles.b2s2} style={{}}>Announcements</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.box3}>
                                <a href="/orchards" className={styles.linka}>
                                    <img src="/apple.jpg" alt="" className={styles.b3bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                    <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                        <p className={styles.b3s1} style={{}}>Orchards</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.box4}>
                                <a href="/businesses" className={styles.linka}>
                                    <img src="/b4.jpg" alt="" className={styles.b4bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                    <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                        <p className={styles.b4s1} style={{}}>Local Businesses</p>
                                    </div>
                                </a>
                            </div>
                            <div className={styles.box5}>
                                <a href="/events" className={styles.linka}>
                                    <img src="/b5.jpg" alt="" className={styles.b5bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                    <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                        <p className={styles.b5s1} style={{}}>Events</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ zIndex: '100', position: 'relative' }} className={styles.partition}></div>
                <div style={{backgroundColor: "transparent"}} className={styles.maininsd}>
                    <div style={{backgroundColor: "transparent"}} className={styles.maindownleft}>
                        <div className={styles.boxd1}>
                            <a href="/wiki" className={styles.linka}>
                                <img src="/1.webp" alt="" className={styles.bd1bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                    <p className={styles.bd1s1} style={{}}>Rohru Wiki</p>
                                </div>
                            </a>
                        </div>
                        <div className={styles.boxd2}>
                            <a href="/locations" className={styles.linka}>
                                <img src="/4.webp" alt="" className={styles.bd2bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                    <p className={styles.bd2s1} style={{}}>Must Visit</p>
                                    <p className={styles.bd2s2} style={{}}>Locations</p>
                                </div>
                            </a>
                        </div>
                        <div className={styles.boxd3}>
                            <a href="/facilities" className={styles.linka}>
                                <img src="/2.jpg" alt="" className={styles.bd3bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                    <p className={styles.bd3s1} style={{}}>Local Facilities</p>
                                </div>
                            </a>
                        </div>
                        <div className={styles.boxd4}>
                            <a href="/photo-book" className={styles.linka}>
                                <img src="/3.jpeg" alt="" className={styles.bd4bg} style={{ zIndex: '0', position: 'absolute', objectFit: 'cover' }} />
                                <div style={{ zIndex: '1', position: 'relative', backgroundColor: 'transparent' }}>
                                    <p className={styles.bd4s1} style={{}}>Photobook</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div style={{backgroundColor: "transparent", color: 'white'}} className={styles.maindownright}>A Tourist? {"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}{"\u00A0"}Explore these</div>
                </div>
            </div>
        </>
    )
}