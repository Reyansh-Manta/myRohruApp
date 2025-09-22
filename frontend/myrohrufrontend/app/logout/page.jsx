"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";
import axios from "axios";

export default function LogoutPage() {
    const router = useRouter();
    let check;

    useEffect(() => {
    async function handleLogout() {
    try {
        const response = await axios.post(`http://localhost:2002/api/v1/users/logout`,
            
            {
                withCredentials: true
            }
        )
        check = true
    } catch (error) {
        console.error("Logout failed:", error);
        // router.push("/local-feed")
        check = false
    }
}
handleLogout()
}, [])
if (check) {
    router.push("/local-feed")
} else {
    // router.push("/local-feed")
}
}