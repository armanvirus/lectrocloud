import React from 'react'
import notfound from "../assets/notfound.png"
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="error-404">
            <div>
            <img src={notfound} alt="404"/>
            <div className="error-404-back">
            <Link to="/main/home">Back to home</Link>
            </div>
            </div>
        </div>
    )
}
