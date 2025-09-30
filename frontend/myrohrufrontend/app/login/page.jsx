"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";
import styles from "./login.module.css"

export default function LoginPage() {
    const router = useRouter()
    const [email, setemail] = useState("")
    const [phoneNumber, setnum] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post(`${process.env.BACKEND}/api/v1/users/loginUser`, {
                email,
                phoneNumber,
                password
            },
                {
                    withCredentials: true
                }
            )

            const data = await response.data.message
            
            console.log(data);

            if (response.status === 200) {
                setmessage(data)

                setTimeout(() => {
                    router.push('/')
                }, 1000);
            }
            else {
                // setmessage("response not generated properly in loginPage")
                setmessage(data)
            }

        } catch (error) {
            // console.error("error sending post request in login page", error)
            setmessage("Please enter correct credentials or try again later")
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
            <img src="/lb.jpg" alt="" style={{width: "100vw", height: "100vh", objectFit: "cover", position: "fixed"}}/>
            <div className={styles.loginBox} style={{zIndex: "100", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <div className={styles.loginHeader} style={{ margin: "20px", marginBottom: '-15px', textAlign: "center", backgroundColor: "transparent" }}>
                    <h2 className={styles.fontlogin} style={{backgroundColor: "transparent", color: "white", width: "auto", padding: "10px", borderRadius: "8px"}}>Login</h2>
                </div>
                <div className={styles.loginContainer} style={{ padding: "50px", backgroundColor: "transparent", borderRadius: "8px" }}>
                    <form onSubmit={handleSubmit} style={{backgroundColor: "transparent"}}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={styles.inputField}
                            required
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px",
                                // width: "300px",
                                borderRadius: "8px",
                                padding: "6px",
                                border: "1.5px solid #ccc",
                                backgroundColor: "rgba(4, 68, 86, 0.839)",
                                color: "white"
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Phone number"
                            className={styles.inputField}
                            required
                            value={phoneNumber}
                            onChange={(e) => setnum(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px",
                                // width: "300px",
                                borderRadius: "8px",
                                padding: "6px",
                                border: "1.5px solid #ccc",
                                backgroundColor: "rgba(4, 68, 86, 0.839)",
                                color: "white"
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.inputField}
                            required
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            style={{
                                display: "block",
                                marginBottom: "10px",
                                // width: "300px",
                                borderRadius: "8px",
                                padding: "6px",
                                border: "1.5px solid #ccc",
                                backgroundColor: "rgba(4, 68, 86, 0.839)",
                                color: "white"
                            }}
                        />
                        <button className={styles.submitButton} type="submit">SUBMIT</button>

                    </form>
                    <p style={{ color: "wheat", width: "150px", backgroundColor:"rgba(4, 68, 86, 0)", paddingTop: '10px' }}>{message}</p>
                </div>
                <div className={styles.loginFooter} style={{ margin: "5px", marginTop: "0px", textAlign: "center", backgroundColor: "transparent", color: "white" }}>
                    <p style={{backgroundColor: "transparent", fontSize: "17px"}}>Don't have an account? <a href="/register" style={{backgroundColor: "transparent", fontSize: "17px", color: "#fff"}}>Register here</a></p>
                    <p style={{backgroundColor: "transparent", fontSize: "17px"}}>Forgot your password? <a href="/reset-password" style={{backgroundColor: "transparent", fontSize: "17px", color: "#fff"}}>Reset it here</a></p>
                </div>
            </div>
        </div>
    )

}