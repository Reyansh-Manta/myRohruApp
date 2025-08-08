"use client"

import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext()

export function UserProvider({children}){

    const [loggedIn, setloggedIn] = useState(false)
    const [checking, setchecking] = useState(false)

    useEffect(() => {
      const checklogin = async()=>{
        try {
            await axios.get('http://localhost:2002/api/v1/users/current-user', {
                withCredentials: true
            })
            setloggedIn(true)
        } catch (error) {
            setloggedIn(false);
        } finally {
            setchecking(true)
        }
      }
      checklogin()
    }, [])

    return(
        <UserContext.Provider value={{loggedIn, setloggedIn, checking}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}