"use client"

import axios from "axios"
import { useState } from "react"

export default function LoginPage() {
    const [email, setemail] = useState(null)
    const [phoneNumber , setnum] = useState(null)
    const [password , setpassword] = useState(null)
    const [message, setmessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault() 
        
        try {

            const response = await axios({
                method: 'post',
                url: `http://localhost:${process.env.PORT}/api/v1/users/loginUser`
            })
            
        } catch (error) {
            console.error("error sending post request in login page",error)
        }
    }
    
}