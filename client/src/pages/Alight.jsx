import React,{useRef,useEffect,useState,useContext} from 'react'
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import amin from "../assets/amin.png"
import {StateContext} from '../context/provider';
import "../styles/alight.css"
import BottomBar from "../components/BottomBar"
import "../styles/posts.css"



export default function Alight() {
    const {id} = useParams();
    let navigateBack = useNavigate();
    let url = useLocation();
    const [light, setLight] = useState('')
    const [loading, setloading] = useState(true)
    const {        
        postData,
        setPostData
    } = useContext(StateContext);
   
    useEffect(()=>{
      const filteredLight =  postData.filter((el)=> el._id == id)[0]
        setLight(filteredLight)
        setloading(false)
    },[])
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
            <div className="comments">
                <div className="comment">
                    <div className="commentor-det">
                        <img src={amin} alt="user"/>
                        <div>@armanviruse</div>
                        <div>2hrs</div>
                    </div>
                    <div className="comment-note">
                        Lorem ipsum dolor sit amet, 
                        consectetur  sed necessitatibus pariatur
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
            </div>
            <div className="comment-form">
                <textarea name="comment" ></textarea>
                <div>
                <button> <span>light</span> <span className="material-symbols-outlined">bolt</span></button>
                </div>
            </div>
            </div>
            }
        </div>
 
)
}
