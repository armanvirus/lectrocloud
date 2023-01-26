import React,{useEffect,useState,useContext} from 'react'
import axios from "axios"
import Posts from "../components/Posts"
import {StateContext} from '../context/provider';
import amin from "../assets/amin.png"
import Loader from '../components/loader';



export default function Home() {
    // const [postData,setPostData] = useState('')
    // const [postData,setPostData] = useState('')
    //pulling data from context
    const {        
        loading,
        setLoading,
        postData,
        setPostData
    } = useContext(StateContext);


    useEffect(()=>{
        
        axios.defaults.withCredentials = true;
        /* when there is no token in the local storage the value 
        is null but when it sent to server it shows that the null value is string  0f length
        4, there i created this logic if the servre receives 0 then it means there is no
        token the user is not logged" */
        const token =()=>{
            console.log(localStorage.getItem("form1"), "storage")
            let retrievedToken = localStorage.getItem('lectroToken');
            if(retrievedToken == null){
                return 0
            }else{
                return retrievedToken
            }
        }
        axios.get('http://localhost:3300/', {headers:{"Authorization":`Bearer ${token()}`}})
      .then((res)=>{
          setPostData(res.data.postData)
          setLoading(false)
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])
    
    return (
        <div>
        { loading ? <Loader/> :
           <Posts postData={postData}/>
        } 
        </div>
    )
}
