import React from 'react'
import {Link} from "react-router-dom"
import Icons from "./Icons"

export default function BottomBar() {
    return (
        <div>
            <div className="bBar"> 
            <Link to="/main/home"><Icons icon="home"/></Link>
            <Link to="/main/materials"><Icons icon="school"/></Link>
            <Link to="/main/profile"><Icons icon="profile"/></Link>
            </div>
        </div>
    )
}
