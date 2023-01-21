import React from 'react'
import { Outlet, Link,useLocation } from 'react-router-dom'
import BottomBar from "../components/BottomBar"
import TopBar from "../components/TopBar"
import "../styles/mainH.css"

export default function MainHome() {
    let url = useLocation();
    return (
        <div>
            <TopBar/>
            <div style={url.pathname == "/main/profile" ? 
                 {display:"none"} : 
                 {display:"block",height:"120px", width:"100%"}}>
            </div>
           <Outlet/>
           <div style={{height:"60px", width:"100%"}}></div>
           <BottomBar/>
        </div>
    )
}
