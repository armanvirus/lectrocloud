import React,{useState} from 'react'
import amin from "../assets/amin.png"
import "../styles/alight.css"
import moment from 'moment';

export default function Comments(props) {
    const [loading, setloading] = useState(true)

    const doFocus = (el)=>{
        props.setisRefly(true)
        props.focusReply(el.user.name,el.user.id,el.user.profile)
    }
    return (
        <div className="comments">
            {props.comments.map((el,index)=>{
                return(
                    <div className="comment">
                    <div className="commentor-det">
                        <img src={el.user.profile} alt="user"/>
                        <div>@{el.user.name}</div>
                        <div>{moment(el.commentedOn).startOf('minute').fromNow()}</div>
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
                    <span onClick={()=> doFocus(el)} className="material-symbols-outlined">
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
