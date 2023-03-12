import React,{useEffect, useState, useContext} from 'react'
import amin from "../assets/amin.png"
import "../styles/profile.css"
import Header from '../components/Header';
import axios from "axios"
import {token} from "../utils/Auths"
import Posts from '../components/Posts';
import Loader from '../components/loader';
import {serverUrl} from "../utils/Datum"
import {StateContext} from "../context/provider"
import NoAuth from '../components/NoAuth';


export default function Profile() {
    const [isLoading,setisLoading] = useState(true);
    const [user, setUser] = useState("")
    const {isUserloged} = useContext(StateContext);

    useEffect(()=>{
        axios.defaults.withCredentials = true;
        axios.get(`${serverUrl}/user/profile`,{headers:{"Authorization":`Bearer ${token()}`}})
        .then((response)=>{
            console.log(response)
            setUser(response.data)
            setisLoading(false)
        }
    ).catch((err)=>console.log(err))
    },[''])
    return (
        <>
        {isLoading ? <Loader/>  : <>
        {!isUserloged ? <NoAuth/> : 
        
        <div className="main-profile">
            <Header/>
            <div className="top-most-profile">
            <div className="profile-img">
                <img src={amin} alt=""/>
                <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <span className="material-symbols-outlined">edit</span>
                </label>
            </div>
            <div className="profile-id-details">
        
            <div className="profile-username">
            <div className="edit-btn">
                <span className="material-symbols-outlined">edit</span>
            </div>
                <span>{user.student.name}</span>
                <span  className="profile-subs">{user.student.idNum}</span>
            </div>
            <div className="profile-level">
                <span>{user.student.level}</span>
                <span className="profile-subs">Level</span>
            </div>
            <div className="profile-session">
                <span>
                <span>2020</span>
                <span>/</span>
                <span>2021</span>
                </span>
                <span className="profile-subs">Session</span>
            </div>
            </div>
            </div>

            <div className="profile-middle-part">
                <div>Lights</div>
            </div>
            <Posts page="profile" postData={user.lights}/>

        </div>
    }
        </>
    }
    </>
    )
}
