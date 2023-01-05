import React,{useEffect,useState} from 'react'
import axios from "axios"
import Posts from "../components/Posts"
import amin from "../assets/amin.png"


export default function Home() {
    // const [postData,setPostData] = useState('')
    const [postData,setPostData] = useState('')
    const [loading,setLoading] = useState(true)

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
      
    // const post = [
    //     {
    //         user:{
    //             userName:"@armangrema",
    //             profile: amin
    //         },
    //         postedOn:"19/12/2020 11:00 pm",
    //         imgs:[amin],
    //         postText:`
    //         Lorem ipsum dolor sit amet consectetur 
    //         adipisicing elit. In repellat et mollitia 
    //         perferendis temporibus dolore 
    //         voluptatem eaque cum nemo ab 
    //         blanditiis quibusdam, doloribus 
    //         nihil iste 
    //         provident atque hic cumque optio.
    //         `

    //     },
    //     {
    //         user:{
    //             userName:"@armangrema",
    //             profile: amin
    //         },
    //         postedOn:"19/12/2020 11:00 pm",
    //         imgs:[amin,amin],
    //         postText:`
    //         Lorem ipsum dolor sit amet consectetur 
    //         adipisicing elit. In repellat et mollitia 
    //         perferendis temporibus dolore 
    //         voluptatem eaque cum nemo ab 
    //         blanditiis quibusdam, doloribus 
    //         nihil iste 
    //         provident atque hic cumque optio.
    //         `

    //     },
    //     {
    //         user:{
    //             userName:"@armangrema",
    //             profile: amin
    //         },
    //         postedOn:"19/12/2020 11:00 pm",
    //         imgs:[amin,amin,amin,amin],
    //         postText:`
    //         Lorem ipsum dolor sit amet consectetur 
    //         adipisicing elit. In repellat et mollitia 
    //         perferendis temporibus dolore 
    //         voluptatem eaque cum nemo ab 
    //         blanditiis quibusdam, doloribus 
    //         nihil iste 
    //         provident atque hic cumque optio.
    //         `

    //     },
        
    // ]
    return (
        <div>{ loading ? <h1>loading...</h1> :
           <Posts postData={postData}/>
        } 
        </div>
    )
}
