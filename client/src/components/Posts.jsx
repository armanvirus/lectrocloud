import React from 'react'
import "../styles/posts.css"
import amin from "../assets/amin.png"

export default function Posts(props) {
    const {postData} = props;
    return (
        <>
        { postData.map((el,elIndex)=>{
            return(
                <div className="post">
            <div className="avatar">
                <img src={amin} alt="Error"/>
            </div>
            <div className="post-content">
                <p className="posted-user">{el.user.username}</p>
                <p className="posted-on">{el.lightOn}</p>
                <div>
                    <div className="notes">
                        <p>
                            {el.note} 
                        </p>
                    </div>
                    <div className={el.images.length > 1 ? 
                    "post-imgs post-imgs-many" : 
                    "post-imgs post-imgs-single"}>
                        {el.images.map((imgEl,imgIndex)=>{
                            return(
                                <img src={imgEl} alt="" />
                            )
                        })}
                    </div>
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
                        chat_bubble
                    </span>
                    <span>34</span>
                </div>
                </div>
            </div>
        </div>
            )
        })
         }
        </>
    )
}