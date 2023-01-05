import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import BottomBar from "../components/BottomBar"
import TopBar from "../components/TopBar"
import "../styles/mainH.css"

export default function MainHome() {
    return (
        <div>
            <TopBar/>
            <div style={{height:"120px", width:"100%"}}></div>
           <Outlet/>
           <div style={{height:"60px", width:"100%"}}></div>
           <BottomBar/>
        </div>
    )
}
