import React,{useState, useEffect} from 'react'
// import { Document, Page } from 'react-pdf';
// import { jsPDF } from "jspdf";
import axios from "axios";
import amin from "../assets/amin.png"
import "../styles/addpost.css"
import NoAuth from '../components/NoAuth';
import Loader from '../components/loader';
import Sending from '../components/Sending';

// console.log(jsPDF)

export default function AddPost() {
    const [selectedFile, setselectedFile] = useState("");
    const [previewUrl, setpreviewUrl] = useState('');
    const [notes, setnotes] = useState('');
    const [isUserloged, setisUserloged] = useState('');
    const [isLoading, setisLoading] = useState(true)
    const [typeErr, settypeErr] = useState("");
    const [isLighting,setisLighting] = useState(false);

    useEffect(() => {
        setisUserloged(localStorage.getItem('lectroToken'))
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
            axios.post('http://localhost:3300/user/light',{
                image:previewUrl,
                notes,
                user:localStorage.getItem('lectroToken')
            }).then((response)=>{
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
          !isUserloged ? <NoAuth/> :      
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
                    <span className="material-symbols-outlined">landscape</span>
                    </label>
               </div>
               <div>
                    <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <span className="material-symbols-outlined">picture_as_pdf</span>
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
            <button onClick={()=>{handleLight()}} > <span> light </span> <span className="material-symbols-outlined">bolt</span> </button>
            </div>
            </div>
        </div>
         }</>
         }
        </>
    )
}
