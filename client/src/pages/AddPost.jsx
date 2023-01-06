import React,{useState} from 'react'
import amin from "../assets/amin.png"
import "../styles/addpost.css"

export default function AddPost() {
    const [selectedFile, setselectedFile] = useState("");
    const [previewUrl, setpreviewUrl] = useState('');

    const inputChange = (e)=>{
        const file = e.target.files[0]
        console.log(file)
        previewFile(file);
    }

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            console.log(reader.result)
            setpreviewUrl(reader.result)
        }
    }
    return (
        <div>
            <div className="light-container">
            <div className="active-user">
                <img src={amin} alt="user-image"/>
                
            </div>
            <textarea placeholder="Is there something new?" name="notes"></textarea>
            <div className="files">
                <div>
                    <label htmlFor="image">
                    <input onChange={(e)=> inputChange(e) } type="file" name="image" id="image"/>
                    <spna className="material-symbols-outlined">landscape</spna>
                    </label>
               </div>
               <div>
                    <label htmlFor="file">
                    <input type="file" name="docs" id="file"/>
                    <spna className="material-symbols-outlined">picture_as_pdf</spna>
                    </label>
               </div>
            </div>
            {
                previewUrl && (
                    <img className="preview-image" src={previewUrl} alt="something is wrong"/>
                )
            }
            <div className="send-btn">
            <button> <span> light </span> <span className="material-symbols-outlined">bolt</span> </button>
            </div>
            </div>
        </div>
    )
}
