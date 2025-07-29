"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"
import styles from "./page.module.css"

export default function HomePage() {

    const router = useRouter()

    useEffect(() => {
        async function check() {
            try {
                console.log('fjr');

                await axios.get('http://localhost:2001/api/v1/users/current-user', {
                    withCredentials: true
                })
            }
            catch (error) {
            router.push('/unprotected-home')
        }
            
        }
        
        check()
    }, [router])

    return (
        <>
            <div className={styles.toplogo}>
                <div className={styles.logo}>
                    <img src="/My.png" alt="" />
                </div>
                <div className={styles.navr}>
                    <a href="/dashboard"><h3>Dashboard</h3></a>
                </div>
            </div>
            <div>
                <div className="weatbox">

                </div>
            </div>
        </>
    )
}