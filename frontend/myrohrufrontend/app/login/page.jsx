"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()
    const [email, setemail] = useState("")
    const [phoneNumber, setnum] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post('http://localhost:2002/api/v1/users/loginUser', {
                email,
                phoneNumber,
                password
            },
                {
                    withCredentials: true
                }
            )

            const data = await response.data

            if (response.status === 200) {
                setmessage("logged in successfully")

                setTimeout(() => {
                    router.push('/')
                }, 1000);
            }
            else {
                setmessage("response not generated properly in loginPage")
            }

        } catch (error) {
            console.error("error sending post request in login page", error)
            setmessage("error sending post request in login page")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        padding: "6px",
                    }}
                />
                <input
                    type="number"
                    placeholder="Phone number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setnum(e.target.value)}
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        padding: "6px",
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    style={{
                        display: "block",
                        marginBottom: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        padding: "6px",
                    }}
                />
                <button type="submit">SUBMIT</button>

            </form>
            {message}
        </div>
    )

}