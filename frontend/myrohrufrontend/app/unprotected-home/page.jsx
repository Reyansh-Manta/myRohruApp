"use client"

import Navbar from "../components/Navbar/page"
import styles from "./unprotected-home.module.css"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function UnprotectedHome() {

    const router = useRouter()
        const {loggedIn, checking} = useUser()
    
        useEffect(() => {
            console.log(checking);
            
            if (loggedIn && checking) {
                router.push('/')
            }
        }, [!checking])

    return(
        <>
        <Navbar/>
            <div className={styles.main}>

            </div>
        
        </>
    )
}