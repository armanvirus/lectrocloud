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
                <img src={el.user.profile} alt="Error"/>
            </div>
            <div className="post-content">
                <p className="posted-user">{el.user.userName}</p>
                <p className="posted-on">{el.postedOn}</p>
                <div>
                    <div className="notes">
                        <p>
                            {el.postText} 
                        </p>
                    </div>
                    <div className={el.imgs.length > 1 ? 
                    "post-imgs post-imgs-many" : 
                    "post-imgs post-imgs-single"}>
                        {el.imgs.map((imgEl,imgIndex)=>{
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
