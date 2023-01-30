import React from 'react'
import amin from "../assets/amin.png"
import "../styles/profile.css"

export default function Profile() {
    return (
        <div className="main-profile">
            <div className="top-most-profile">
            <div className="profile-img">
                <img src={amin} alt=""/>
                <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <span className="material-symbols-outlined">edit</span>
                </label>
            </div>
            <div className="profile-id-details">
        
            <div className="profile-username">
            <div className="edit-btn">
                <span className="material-symbols-outlined">edit</span>
            </div>
                <span>Armanviruse</span>
                <span  className="profile-subs">20/05/05/012</span>
            </div>
            <div className="profile-level">
                <span>200</span>
                <span className="profile-subs">Level</span>
            </div>
            <div className="profile-session">
                <span>
                <span>2020</span>
                <span>/</span>
                <span>2021</span>
                </span>
                <span className="profile-subs">Session</span>
            </div>
            </div>
            </div>

            <div className="profile-middle-part">
            
            </div>

        </div>
    )
}
