"use client"

import axios from "axios"
import { use, useState } from "react"
import { useRouter } from "next/navigation";
import styles from "./register.module.css"

export default function RegisterPage() {
    const router = useRouter()
    const [email, setemail] = useState("")
    const [phoneNumber, setnum] = useState("")
    const [password, setpassword] = useState("")
    const [fullName, setfullName] = useState("")
    const [username, setusername] = useState("")
    const [village, setvillage] = useState("")
    const [postoffice, setpostoffice] = useState("")
    const [message, setmessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const ddata = {
                email,
                phoneNumber,
                password,
                fullName,
                username,
                village,
                postoffice
            }
            console.log(ddata);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/v1/users/register`,
                ddata
            ,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            )

            const data = await response.data

            if (response.status === 200) {
                setmessage("registered successfully")

                setTimeout(() => {
                    router.push('/login')
                }, 1000);
            }
            else {
                console.log(data)
                setmessage("response not generated properly in registerPage")
            }

        } catch (error) {
            console.error("error sending post request in register page", error)
            setmessage("error sending post request in register page")
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
            <img src="/lb.jpg" alt="" style={{width: "100vw", height: "100vh", objectFit: "cover", position: "fixed"}}/>
            <div className={styles.loginBox} style={{zIndex: "100", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <div className={styles.loginHeader} style={{ margin: "20px", marginBottom: '-15px', textAlign: "center", backgroundColor: "transparent" }}>
                    <h2 className={styles.fontlogin} style={{backgroundColor: "transparent", color: "white", width: "auto", padding: "10px", paddingBottom: "5px",borderRadius: "8px"}}>Register</h2>
                </div>
                <div className={styles.loginContainer} style={{ padding: "50px", backgroundColor: "transparent", borderRadius: "8px" }}>
                    <form onSubmit={handleSubmit} style={{backgroundColor: "transparent"}}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className={styles.inputField}
                            required
                            value={fullName}
                            onChange={(e) => setfullName(e.target.value)}
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
                            type="text"
                            placeholder="username"
                            className={styles.inputField}
                            required
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
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
                        <input
                            type="text"
                            placeholder="Your Village/Town/City"
                            className={styles.inputField}
                            required
                            value={village}
                            onChange={(e) => setvillage(e.target.value)}
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
                            type="text"
                            placeholder="Your PostOffice"
                            className={styles.inputField}
                            required
                            value={postoffice}
                            onChange={(e) => setpostoffice(e.target.value)}
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
                    {message}
                </div>
                <div className={styles.loginFooter} style={{ margin: "5px", marginTop: "0px", textAlign: "center", backgroundColor: "transparent", color: "white" }}>
                    <p style={{backgroundColor: "transparent", fontSize: "17px"}}>Have an account? <a href="/login" style={{backgroundColor: "transparent", fontSize: "17px", color: "#fff"}}>Login here</a></p>
                </div>
            </div>
        </div>
    )

}