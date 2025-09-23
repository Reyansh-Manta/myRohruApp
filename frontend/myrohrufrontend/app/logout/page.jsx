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
            {},
            {
                withCredentials: true
            }
        )
        check = true
        router.push("/local-feed")
    } catch (error) {
        console.log("Logout failed:", error);
        // router.push("/local-feed")
        check = false
        router.push("/local-feed")
    }
}
handleLogout()
}, [])

}