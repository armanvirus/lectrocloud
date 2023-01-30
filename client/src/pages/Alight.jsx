import React,{useRef,useEffect,useState,useContext} from 'react'
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import moment from "moment"
import amin from "../assets/amin.png"
import {StateContext} from '../context/provider';
import "../styles/alight.css"
import "../styles/posts.css"
import axios from 'axios';
import Comments from "../components/comments"
import Loader from '../components/loader';
import NoAuth from '../components/NoAuth';
import Header from '../components/Header';




export default function Alight() {
    const {id} = useParams();
    let navigateBack = useNavigate();
    let url = useLocation();
    const [light, setLight] = useState('')
    const [loading, setloading] = useState(true);
    const [textAreaHeight, settextAreaHeight] = useState(50);
    const [textAreaContent, settextAreaContent] = useState("");
    const [isRefly, setisRefly] = useState(false);
    const [comments, setcomments] = useState(null)
    const [replyObj, setreplyObj] = useState('')
    const [displayNoAuth,setdisplayNoAuth] = useState(false);
    const textAreaRef = useRef()
    const {        
        postData,
        setPostData
    } = useContext(StateContext);
   
    useEffect(()=>{
        const token =()=>{
            let retrievedToken = localStorage.getItem('lectroToken');
            if(retrievedToken == null){
                return 0
            }else{
                return retrievedToken
            }
        }

        if(postData){
      const filteredLight =  postData.filter((el)=> el._id == id)[0]
        setLight(filteredLight)
        setloading(false)
    }else{
        axios.get('http://localhost:3300/', {headers:{"Authorization":`Bearer ${token()}`}})
      .then((res)=>{
          setPostData(res.data.postData)
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
        // search available comments
        axios.get(`http://localhost:3300/user/comment/${id}`)
        .then((response)=>{
            console.log(response.data.comments)
            setcomments(response.data.comments)
        })
    },[])


    useEffect(()=>{
        if(postData){
        const filteredLight =  postData.filter((el)=> el._id == id)[0]
        setLight(filteredLight)
        setloading(false)}
      },[postData])

    const handleBack = ()=>{
        navigateBack(-1)
        // console.log("back btn clicked")
    }

    const handleComment = ()=>{
        const lectroToken = localStorage.getItem("lectroToken")
        if(!lectroToken){
            setdisplayNoAuth(true)
        }else{
            if(!isRefly){
                axios.post("http://localhost:3300/user/comment",{
                    comment:textAreaContent,
                    lightId:id,
                    user:lectroToken,
                    images:null,
                    files:null
                }).then((response)=>{
                    console.log(response.data)
    
                })
            }else{
                axios.post('http://localhost:3300/user/reply',
                {
                    replyObj,
                    user:localStorage.getItem("lectroToken"),
                    replyNote:textAreaContent
    
                }
            ).then((response)=>{
                console.log(response)
            })
            }
        }
    }

    const handleKeyUp = (event)=>{
        settextAreaContent(event.target.value)
    }
    const focusReply = (username,userid,profile,commentId)=>{
        setreplyObj({
            username,
            userid,
            profile,
            commentId
        })
        console.log(username,userid,profile)
    }

    const textAreaBlur = (event)=>{
        if(!event.target.value){
            setisRefly(false)
            setreplyObj('')
        }
    }

    useEffect(()=>{
        if(isRefly){
            textAreaRef.current.focus()
        }
    },[isRefly])

    const authWarnClose = ()=>{
        setdisplayNoAuth(false)
    }
    return (
        <div>
            {displayNoAuth && (
            <div>
                <button style={{top:"50px",right:"30px"}} onClick={()=> authWarnClose()} className="auth-err-close">
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
                <NoAuth/>
            </div>
        )} 
            { loading ? <Loader/> : <div>
             <Header/>
            <div className="light-user">
                <img src={amin} alt="user" className="profile-img"/>
                <div className="light-pro-detail">
                    <div className="pro-username">{light.user.username}</div>
                    <div className="light-date">{ moment(light.lightOn).startOf('minute').fromNow()}</div>
                </div>
            </div>
            <div className="comment-subject">
                <img src={light.images} alt=""/>
                <div>
                    <div >{light.note}</div>
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
                    <span>{comments ? comments.length : 0}</span>
                </div>
                </div>
            </div>
            {comments ? <> {comments.length > 0 ? <Comments setisRefly={setisRefly} focusReply={focusReply} comments={comments}/> : <p className="no-comment"> No comment for this light</p> } </> : <h4>Loading comments...</h4>}
            <div className="comment-form">
                {isRefly && replyObj && (<div className="reply-tag">{`replying to @${replyObj.username}` }</div>)}
                <textarea className="comment-box" style={{overflow:"hidden"}} 
                ref ={textAreaRef}
                onBlur={(e)=> textAreaBlur(e)}
                value={textAreaContent}
                onChange={(e)=>handleKeyUp(e)} 
                name="comment" ></textarea>
                <div>
                <button onClick={()=> handleComment()}> <span>light</span> <span className="material-symbols-outlined">bolt</span></button>
                </div>
            </div>
            </div>
            }
        </div>
 
)
}
