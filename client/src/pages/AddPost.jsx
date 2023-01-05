import React from 'react'
import amin from "../assets/amin.png"
import "../styles/addpost.css"

export default function AddPost() {
    return (
        <div>
            <div className="light-container">
            <div className="active-user">
                <img src={amin} alt="user-image"/>
                
            </div>
            <textarea placeholder="Is there something new?" name="notes"></textarea>
            <div className="files">
                <div>
                    <label htmlFor="image">
                    <input type="file" name="image" id="image"/>
                    <spna className="material-symbols-outlined">landscape</spna>
                    </label>
               </div>
               <div>
                    <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <spna className="material-symbols-outlined">picture_as_pdf</spna>
                    </label>
               </div>
            </div>
            <div className="send-btn">
            <button> <span> light </span> <span className="material-symbols-outlined">bolt</span> </button>
            </div>
            </div>
        </div>
    )
}
