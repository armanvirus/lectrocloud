import React,{useState, useEffect} from 'react'
// import { Document, Page } from 'react-pdf';
// import { jsPDF } from "jspdf";
import axios from "axios";
import amin from "../assets/amin.png"
import "../styles/addpost.css"
import NoAuth from '../components/NoAuth';

// console.log(jsPDF)

export default function AddPost() {
    const [selectedFile, setselectedFile] = useState("");
    const [previewUrl, setpreviewUrl] = useState('');
    const [notes, setnotes] = useState('');
    const [isUserloged, setisUserloged] = useState('');

    useEffect(() => {
        setisUserloged(localStorage.getItem('lectroToken'))
    }, [])
    
    const inputChange = (e)=>{
        const file = e.target.files[0]
        previewFile(file);
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
            axios.post('http://localhost:3300/user/light',{
                image:previewUrl,
                notes,
                user:localStorage.getItem('lectroToken')
            }).then((response)=>{
                console.log(response)
            })
        }else{

            console.log("none of the is present")
        }

    }
    return (
        <>
        {
            !isUserloged ? <NoAuth/> : 
       
        <div>
            <div className="light-container">
            <div className="active-user">
                <img src={amin} alt="user-image"/>
                
            </div>
            <textarea onChange={(e)=>{
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
                    <img className="preview-image" src={previewUrl} alt="something is wrong"/>
                )
            }
            <div className="send-btn">
            <button onClick={()=>{handleLight()}}> <span> light </span> <span className="material-symbols-outlined">bolt</span> </button>
            </div>
            </div>
        </div>
         }
        </>
    )
}
