import React,{useState, useEffect, useContext} from 'react'
import axios from "axios";
import DocViewer from "react-doc-viewer";
import amin from "../assets/amin.png"
import "../styles/addpost.css"
import NoAuth from '../components/NoAuth';
import Loader from '../components/loader';
import Sending from '../components/Sending';
import {StateContext} from "../context/provider"
import {serverUrl} from "../utils/Datum"

// console.log(jsPDF)

export default function AddResources() {
    const [previewUrl, setpreviewUrl] = useState('');
    const [title, setTitle] = useState('');
    const [isLoading, setisLoading] = useState(true)
    const [typeErr, settypeErr] = useState("");
    const [isLighting,setisLighting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
    const {isUserloged} = useContext(StateContext);
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.doc', '.docx', '.xlsx','.xls','.txt','.tiff', '.pptx', '.ppt', '.pdf'];

    useEffect(() => {
        setisLoading(false)
    }, [])
    
    function handleFileChange(event) {
        const files = event.target.files;
        const fileArray = Array.from(files);
        const filteredFiles = fileArray.filter(file => {
          const fileExtension = '.' + file.name.split('.').pop();
          const fileSize = file.size;
          const isExtensionAllowed = allowedExtensions.includes(fileExtension);
          const isFileSizeValid = fileSize <= maxFileSize;
          return isExtensionAllowed && isFileSizeValid;
        });
        const unsupportedFiles = fileArray.filter(file => !filteredFiles.includes(file));
        setSelectedFiles(filteredFiles);
        setUnsupportedFiles(unsupportedFiles);
      }

    const handleLight = ()=>{
        if(selectedFiles && title){
            setisLighting(true)
            axios.post(`${serverUrl}/user/resources`,{
            file:selectedFiles,
                title,
            },{
                headers:{
                   "Authorization":`Bearer ${localStorage.getItem('lectroToken')}`,
                   'Content-Type': 'multipart/form-data' 
                }
            }).then((response)=>{
                console.log(response)
                setisLighting(false)
                setTitle("");
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
            <textarea value={title} onChange={(e)=>{
               setTitle(e.target.value)
            }} placeholder="enter title?" name="title"></textarea>
            <div className="files">
                <div>
                    <label htmlFor="image">
                    <input onChange={(e)=> handleFileChange(e) } type="file" multiple name="file" id="image"/>
                    <span className="material-symbols-outlined">picture_as_pdfe</span>
                    </label>
               </div>
            </div>
            {unsupportedFiles.length > 0 && (
                <p>Unsupported files: {unsupportedFiles.map(file => file.name).join(', ')}</p>
            )}
            {/* selectedFiles */}
            {selectedFiles.length > 0 ? (
               <ul>
                 {selectedFiles.map(file => (
                   <li key={file.name}>{file.name}</li>
                 ))}
               </ul>
             ) : (
               <p>No files selected.</p>
             )}
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
