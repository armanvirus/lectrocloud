import React, {useState,useContext, useEffect} from 'react'
import axios from 'axios'
import "../styles/posts.css"
import amin from "../assets/amin.png"
import {StateContext} from '../context/provider';
import {Link} from "react-router-dom";
import moment from "moment"
import NoAuth from './NoAuth';
import Searching from './Searching';

export default function Posts(props) {
    const {postData} = props;
    const [displayNoAuth,setdisplayNoAuth] = useState(false)
    // const [reactedLight, setreactedLight] = useState('')
    //console.log(postData)
    const { isSearching, 
        setisSearching,
        searchResult, 
        setsearchResult} = useContext(StateContext);
    const handleReact = (e,reactedLight)=>{
        const user = localStorage.getItem('lectrocloud');
        if(!user){
            setdisplayNoAuth(true)
        }else{
            axios.post("http://localhost:3300/user/reaction",{
            user:localStorage.getItem("lectroToken"),
            reactedLight
        }).then((response)=>{
            console.log(response)
        })
        }
    }

    const authWarnClose = ()=>{
        setdisplayNoAuth(false)
    }
    useEffect(()=>{console.log(searchResult)},[searchResult])
    return (
        <>
        {displayNoAuth && (
            <div>
                <button onClick={()=> authWarnClose()} className="auth-err-close">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
                <NoAuth/>
            </div>
        )}
        { isSearching ? <Searching/> : postData.map((el,elIndex)=>{
            return(
                <div className="post">
            <div className="avatar">
                <img src={amin} alt="Error"/>
            </div>
            <div className="post-content">
                <p className="posted-user">{el.user.username}</p>
                <p className="posted-on">{moment(el.lightOn).startOf('minute').fromNow()}</p>
                <div>
                    <div className="notes">
                        <p>
                            {el.note} 
                        </p>
                    </div>
                    <div className={el.images && (el.images.length > 1 ? 
                    "post-imgs post-imgs-many" : 
                    "post-imgs post-imgs-single")}>
                        {el.images.map((imgEl,imgIndex)=>{
                            return(
                                <img src={imgEl} alt="" />
                            )
                        })}
                    </div>
                </div>
                <div className="reactions-sec">
                <div className="like-btn">
                    <span onClick={(e)=> handleReact(e, el._id)} className="material-symbols-outlined">
                        favorite
                    </span>
                    <span>10</span>
                </div>
                <div className="comment-btn">
                    <Link to={`/helpers/alight/${el._id}`}>
                    <span className="material-symbols-outlined">
                        chat_bubble
                    </span>
                    </Link>
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
