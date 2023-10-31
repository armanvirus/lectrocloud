import React, {useState,useContext, useEffect} from 'react'
import axios from 'axios'
import "../styles/posts.css"
import amin from "../assets/amin.png"
import {StateContext} from '../context/provider';
import {Link} from "react-router-dom";
import moment from "moment"
import NoAuth from './NoAuth';
import Searching from './Searching';
import {serverUrl} from "../utils/Datum"
import Icons from './Icons'

export default function Posts(props) {
    const {postData, page} = props;
    const [displayNoAuth,setdisplayNoAuth] = useState(false)
    // const [reactedLight, setreactedLight] = useState('')
    //console.log(postData)
    const { isSearching, 
        searchResult, 
        setPostData, 
        setPageNum,
        hasMore, 
        } = useContext(StateContext);
    // const handleReact = (e,reactedLight,targetRef)=>{
    //     const user = localStorage.getItem('lectroToken');
    //     if(!user){
    //         setdisplayNoAuth(true)
    //     }else{
    //         axios.post(`${serverUrl}/user/reaction`,{
    //         user:localStorage.getItem("lectroToken"),
    //         reactedLight
    //     }).then((response)=>{
    //         let likedLight = postData[targetRef]
    //         if(response.data.added){
    //             likedLight.likes.push(reactedLight);
    //             setPostData(...postData, likedLight)
    //         }else{
    //             likedLight.likes = likedLight.likes.filter(el =>{
    //                 el !== reactedLight
    //             });
    //             setPostData(...postData, likedLight)
    //             console.log("it is removed")
    //         }
    //     })
    //     }
    // }

    const handleReact = (e,reactedLight,targetRef)=>{
        const user = localStorage.getItem('lectroToken');
        if(!user){
            setdisplayNoAuth(true)
        }else{
            axios.post(`${serverUrl}/user/reaction`,{
            user:localStorage.getItem("lectroToken"),
            reactedLight
        }).then((response)=>{
            let likedLight = postData[targetRef]
            if(response.data.added){
                likedLight.likes.push(reactedLight);
            }else{
                likedLight.likes = likedLight.likes.filter(el =>{
                    el !== reactedLight
                });
            }
            setPostData((prevPostData) => {
                const newPostData = [...prevPostData];
                newPostData[targetRef] = likedLight;
                return newPostData;
            });
        })
        }
    }
    

    const authWarnClose = ()=>{
        setdisplayNoAuth(false)
    }
    // useEffect(()=>{
    //     console.log(searchResult)}
    //     ,[searchResult]);

        function handleScroll() {
            const lenRemain = Math.floor(document.documentElement.offsetHeight / 4);
            const fetchATLen = document.documentElement.offsetHeight - lenRemain;
            const scrollLen = window.innerHeight + document.documentElement.scrollTop;
            // console.log(fetchATLen)
            console.log(scrollLen >= fetchATLen)
            if(!hasMore || !(scrollLen >= fetchATLen)) return;
            // console.log("has more and fetching destination reached")
            setPageNum(pageNum => pageNum + 1);
          }

          useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
          }, [hasMore]);
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
                <div className="post" key={elIndex}>
            {page !== "profile" && (
            <div className="avatar">
                <img src={amin} alt="Error"/>
            </div>)}
            <div className="post-content">
                {page !== "profile" && (<p className="posted-user">{el.user.username}</p>)}
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
                                <img key={imgIndex} src={imgEl} alt="" />
                            )
                        })}
                    </div>
                </div>
                <div className="reactions-sec">
                <div className="like-btn">
                    <span onClick={(e)=> handleReact(e, el._id, elIndex)}>
                        <Icons icon="like"/>
                    </span>
                    <span>{el.likes.length}</span>
                </div>
                <div className="comment-btn">
                    <Link to={`/helpers/alight/${el._id}/${elIndex}`}>
                    <span>
                        <Icons icon="comment"/>
                    </span>
                    </Link>
                    <span>{el.comments}</span>
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
