"use client"

import React from "react"
import Navbar from "./Navbar/page"
import Footer from "./Footer"

export default function Layout({children}){
    return(
        <div>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}