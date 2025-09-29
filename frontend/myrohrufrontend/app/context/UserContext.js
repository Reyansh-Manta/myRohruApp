"use client"

import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const UserContext = createContext()

export function UserProvider({children}){

    let userr;

    const [loggedIn, setloggedIn] = useState(false)
    const [checking, setchecking] = useState(false)
    const [user, setuser] = useState(null)

    useEffect(() => {
      const checklogin = async()=>{
        try {
            const response = await axios.get('http://localhost:2002/api/v1/users/current-user', {
                withCredentials: true
            })
            userr = response.data.data;
            setuser(userr)
            setloggedIn(true)
        } catch (error) {
            setloggedIn(false);
        } finally {
            setchecking(true)
        }
      }
      checklogin()
    }, [])
    console.log(user);

    return(
        <UserContext.Provider value={{loggedIn, setloggedIn, checking, user}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}