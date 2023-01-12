import React,{useState} from 'react'
import amin from "../assets/amin.png"
import "../styles/alight.css"

export default function Comments(props) {
    const [loading, setloading] = useState(true)
    return (
        <div className="comments">
            {props.comments.map((el,index)=>{
                return(
                    <div className="comment">
                    <div className="commentor-det">
                        <img src={el.user.profile} alt="user"/>
                        <div>@{el.user.name}</div>
                        <div>2hrs</div>
                    </div>
                    <div className="comment-note">
                        {el.comment}
                    </div>
                    <div className="reactions-sec">
                <div className="like-btn">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <span>10</span>
                </div>
                <div className="comment-btn">
                    <span className="material-symbols-outlined">
                        quick_phrases
                    </span>
                    <span>34</span>
                </div>
                </div>
                </div>
                )
            })}
                
            </div>
    )
}
