import {useEffect,useState} from 'react';
import axios from 'axios'
import {bgs} from "../utils/randomBgs"
import moment from "moment"
import {serverUrl} from "../utils/Datum"
import Loader from './loader';
export default function Material(props) {

    const [materials,setMaterials] = useState('')
    const [fetcherr,setfetcherr] = useState('')
    const [isLoading,setisLoading] = useState(true)
    const genRndBg = ()=>{
        return Math.floor(Math.random() * bgs.length)
    }
    const convertBytes = (bytes)=>{
        let convertedBytes = Math.ceil(bytes / (1048576));
        if (convertedBytes < 1024){
            return `${convertedBytes} mb`
        }else{
            return `${convertedBytes / 1024} gb`
        }
    }

    const makeDownloadable = (url)=>{
        let downloadableUrl = url.replace("/upload/", "/upload/fl_attachment/");
       return downloadableUrl;
    }

    useEffect(()=>{
        axios.get(`${serverUrl}/resource/get`)
        .then((response)=>{
            console.log(response.data.data)
            setMaterials(response.data.data)
            setisLoading(false)
        }).catch(err=>{
            setfetcherr('error occured while fetching materials')
            setisLoading(false)
        })
    },[""]);
    // liking a material being posted
    const handleReact = (e,reactedMaterial,targetRef)=>{
        const user = localStorage.getItem('lectroToken');
        if(!user){
            // setdisplayNoAuth(true)
        }else{
            axios.post(`${serverUrl}/resource/reaction`,{
            reactedMaterial
        },{
            headers:{
               "Authorization":`Bearer ${localStorage.getItem('lectroToken')}`
            }
        }).then((response)=>{
            let likedLight = materials[targetRef]
            if(response.data.added){
                likedLight.material.likes.push(reactedMaterial);
                console.log('added',likedLight.material.likes)
            }else{
                likedLight.material.likes = likedLight.material.likes.filter(el =>{
                    el !== reactedMaterial
                });
                console.log('remved',likedLight.material.likes)
            }
            setMaterials((prevPostData) => {
                const newPostData = [...prevPostData];
                newPostData[targetRef] = likedLight;
                return newPostData;
            });
        })
        }
    }
    // function that handles sharing of materialsPromise
    const handleShare = (title,url,size) => {
        if (navigator.share) {
          navigator.share({
            title:title,
            text: `${title} material of size ${size} from libolt`,
            url:url
          })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
          console.log('Web Share API not supported');
        }
      };
    return (
        <>{ isLoading ? <Loader/> : <>
        {materials.map((el,elIndex)=>{
            return(
            <div className="single-material">
            {/* author of the material and date added */}
              <div className="material-author">
                  <div className="author-img">
                      <img src="" alt=""/>
                  </div>
                  <div className="author-name-date">
                  <span>{el.user.name}</span>
                  <span>{moment(el.user.lightOn).startOf('minute').fromNow()}</span>
                  </div>
              </div>
              {/* the material identifier */}
              <div className="material-identifier">
                  <div className="material-avatar">
                      <div> <span> PDF </span></div>
                  </div>
                  <div className="title-and-size">
                      <div>{el.material.title}</div>
                      <span>{convertBytes(el.material.size)}</span>
                  </div>
              </div>
              {/* a divider line */}
              {/* <div className="material-divider-line"></div> */}
              {/* the reactions buttons */}
              <div className="material-reactions">
              <div>
                  <span 
              onClick={(e)=> handleReact(e, el.material._id, elIndex)} 
              className="material-symbols-outlined">favorite
              </span> 
              <span>{el.material.likes.length}</span>
              </div>
              <div><span className="material-symbols-outlined">mode_comment</span></div>
              <div><span onClick={()=>handleShare(el.material.title,el.material.file, el.material.size)} className="material-symbols-outlined">share</span></div>
              <div><a href={makeDownloadable(el.material.file)} download><span className="material-symbols-outlined">download</span></a></div>
              </div>
              
            </div>)
        })}</>}
      </>
    );
  }