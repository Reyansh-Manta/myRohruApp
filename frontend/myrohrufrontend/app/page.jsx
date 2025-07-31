"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect } from "react"
import styles from "./page.module.css"
import { useUser } from "./context/UserContext"

export default function HomePage() {

    const router = useRouter()
    const {loggedIn, checking} = useUser()

    useEffect(() => {
        console.log(checking);
        
        if (!loggedIn && checking) {
            router.push('/unprotected-home')
        }
    }, [])
    
    return (
        <>
            
        </>
    )
}