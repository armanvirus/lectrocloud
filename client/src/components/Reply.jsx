import React,{useState} from 'react'
import amin from "../assets/amin.png"
import "../styles/alight.css"
import moment from 'moment';

export default function Reply(props) {
    const doFocus = (el)=>{
        props.setisRefly(true)
        props.focusReply(el.replyTo.username,el.replyTo.userid,el.replyTo.profile,el.replyTo.commentId)
    }
    return (
        <>
            {props.replies.map((el,index)=>{
                
                return(
                    <div className="reply">
                    <div className="commentor-det">
                        <div className="reply-chain">
                            <div>  
                                <img src={el.replyFrom.profile} alt="user"/>
                                <div>@{el.replyFrom.username}</div> 
                            </div>
                            <div>replying to</div>
                            <div>
                                <img src={el.replyTo.profile} alt="user"/>
                                <div>@{el.replyTo.username}</div>
                            </div>
                        </div>
                        {/* <div>{moment(el.commentedOn).startOf('minute').fromNow()}</div> */}
                    </div>
                    <div className="comment-note">
                        {el.replyNote}
                    </div>
                    <div className="reactions-sec">
                <div className="like-btn">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <span>10</span>
                </div>
                <div className="comment-btn">
                    <span 
                    onClick={()=> doFocus(el)} 
                    className="material-symbols-outlined">
                        quick_phrases
                    </span>
                    <span>reply</span>
                </div>
                </div>
                </div>
                )
            })}
                
            </>
    )
}
