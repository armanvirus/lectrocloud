import React from 'react'
import {Link} from "react-router-dom"

export default function BottomBar() {
    return (
        <div>
            <div className="bBar"> 
            <Link to="/main/home"><span className="material-symbols-outlined">home</span></Link>
            <Link to="/main/materials"><span className="material-symbols-outlined">school</span></Link>
            <Link to="/main/profile"><span className="material-symbols-outlined">person</span></Link>
            </div>
        </div>
    )
}
