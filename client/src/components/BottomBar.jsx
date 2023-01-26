import React from 'react'
import {Link} from "react-router-dom"

export default function BottomBar() {
    return (
        <div>
            <div className="bBar"> 
            <Link to="/main/home"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/main/light"><span className="material-symbols-outlined">add_circle</span></Link>
            <Link to="/main/profile"><span className="material-symbols-outlined">person</span></Link>
            </div>
        </div>
    )
}
