import React,{useState, useEffect, useContext} from 'react'
import axios from "axios";
import amin from "../assets/amin.png"
import "../styles/addpost.css"
import NoAuth from '../components/NoAuth';
import Loader from '../components/loader';
import Sending from '../components/Sending';
import {StateContext} from "../context/provider"
import {serverUrl} from "../utils/Datum"
import Icons from "../components/Icons"

// console.log(jsPDF)

export default function AddPost() {
    const [selectedFile, setselectedFile] = useState("");
    const [previewUrl, setpreviewUrl] = useState('');
    const [notes, setnotes] = useState('');
    const [isLoading, setisLoading] = useState(true)
    const [typeErr, settypeErr] = useState("");
    const [isLighting,setisLighting] = useState(false);
    const [isLoged,setLoged] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem('lectroToken');
        if(user){
            setLoged(true)
        }else{
            setLoged(false)
        }
        setisLoading(false)
    }, [])
    
    const inputChange = (e)=>{
        const file = e.target.files[0]
        setpreviewUrl('')
        // console.log(file.type)
        if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type ==="image/gif"){
            if(file.size > 10485760){
                settypeErr("maximum image size is 10mb")
            }else{
                previewFile(file)
            }
        }else{
            settypeErr("The selected file is not supported")
        }
    }

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            // console.log(reader.result)
            setpreviewUrl(reader.result)
        }
    }

    const handleLight = ()=>{
        if(previewUrl || notes){
            setisLighting(true)
            axios.post(`${serverUrl}/user/light`,{
                image:previewUrl,
                notes,
            },{headers:{"Authorization": `Bearer ${localStorage.getItem('lectroToken')}`}})
            .then((response)=>{
                console.log(response)
                setisLighting(false)
                setpreviewUrl("")
                setnotes("");
            }).catch((error)=>{
                setisLighting(false)
                console.log(error);
            })
        }else{

            // console.log("none of the is present")
        }

    }
    return (
        <>
        {isLoading ? <Loader/> : <>
        {isLighting && <Sending/>}
        {
          !isLoged ? <div style={{transform:"translateY(-70px)",}}> <NoAuth/> </div> :      
        <div>
            <div className="light-container">
            <div className="active-user">
                <img src={amin} alt="user-image"/>
                
            </div>
            <textarea value={notes} onChange={(e)=>{
               setnotes(e.target.value)
            }} placeholder="Is there something new?" name="notes"></textarea>
            <div className="files">
                <div>
                    <label htmlFor="image">
                    <input onChange={(e)=> inputChange(e) } type="file" name="image" id="image"/>
                    <span ><Icons icon="image"/></span>
                    </label>
               </div>
               <div>
                    <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <span ><Icons icon="file"/></span>
                    </label>
               </div>
            </div>
            {
                previewUrl && (
                    <img className="preview-image" src={previewUrl} alt={typeErr}/>
                )
            }
            {
                typeErr  && !previewUrl && (<div>{typeErr}</div>)
            }
            <div className="send-btn">
            <button onClick={()=>{handleLight()}} > <span> light </span> <span ><Icons icon="light"/></span> </button>
            </div>
            </div>
        </div>
         }</>
         }
        </>
    )
}
