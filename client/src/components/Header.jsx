import React from 'react'
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import "../styles/alight.css"

export default function Header() {
    let navigateBack = useNavigate();
    let url = useLocation();
    console.log(url)
    const handleBack = ()=>{
        navigateBack(-1)
        // console.log("back btn clicked")
    }
    return (
        <>
            <div className="top-commet-sec">
                <button onClick={()=> handleBack()} className="back-btn">
                    <span className="material-symbols-outlined">keyboard_backspace</span>
                    <span>Back</span>
                </button>
                {url.pathname == "/main/profile" &&(
                    <button className="back-btn">
                    <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                )}
            </div>
            <div className="top-commet-sec-psedo"></div>   
        </>
    )
}
