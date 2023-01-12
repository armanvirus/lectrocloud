import React,{useRef,useEffect,useState,useContext} from 'react'
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import amin from "../assets/amin.png"
import {StateContext} from '../context/provider';
import "../styles/alight.css"
import BottomBar from "../components/BottomBar"
import "../styles/posts.css"
import axios from 'axios';
import Comments from "../components/comments"




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
    const textAreaRef = useRef()
    const {        
        postData,
        setPostData
    } = useContext(StateContext);
   
    useEffect(()=>{
      const filteredLight =  postData.filter((el)=> el._id == id)[0]
        setLight(filteredLight)
        setloading(false)
        // search vailable comments
        axios.get(`http://localhost:3300/user/comment/${id}`)
        .then((response)=>{
            setcomments(response.data.comments)
        })
    },[])


    // useEffect(()=>{
    //     console.log(comments)
    //   },[comments])



    const handleComment = ()=>{
        const lectroToken = localStorage.getItem("lectroToken")
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
        }
    }

    const handleKeyUp = (event)=>{
        settextAreaContent(event.target.value)
    }
    return (
        <div> 
            { loading ? <h1>Loading...</h1> : <div>
            <div className="top-commet-sec">
                <button className="back-btn">
                    <span className="material-symbols-outlined">keyboard_backspace</span>
                    <span>Back</span>
                </button>
            </div>
            <div className="top-commet-sec-psedo"></div>
            <div className="light-user">
                <img src={amin} alt="user" className="profile-img"/>
                <div className="light-pro-detail">
                    <div className="pro-username">{light.user.username}</div>
                    <div className="light-date">{light.lightOn}</div>
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
                    <span>34</span>
                </div>
                </div>
            </div>
            {comments ? <Comments comments={comments}/> : <h3>Loading comments...</h3>}
            <div className="comment-form">
                <textarea style={{overflow:"hidden"}} 
                ref ={textAreaRef}
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
