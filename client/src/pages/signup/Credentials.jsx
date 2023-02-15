import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {serverUrl} from "../../utils/Datum"

export default function Credentials(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [idNum, setidNum] = useState('');
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState([])
    const [isLighting,setisLighting] = useState(false);

    const form1 = {
        idNum:idNum,
        username:username,
        password:password
    }

    
    const handleclick = ()=>{
        let err =[]

        if(idNum == "" || username == "" || password == ""){
            err.push("please fill all fields")
            seterrors(err)
        }else{
            if(password.length < 4){
                err.push("password must be atleat 4")
                seterrors(err)
            }else{
                setisLighting(true)
                axios.post(`${serverUrl}/user/check`,{idNum}).then((response)=>{
                    setisLighting(false)
                    if(response.data.user){
                        err.push("user already exist");
                        seterrors(err)
                    }else{
                        console.log("no error")
                        localStorage.setItem("form1", JSON.stringify(form1));
                        props.setPage(1)
                        seterrors('')
                    }
                }).catch(err =>{ 
                    setisLighting(false)
                    err.push("fail to create account");
                })
            }
        }
        

        
    }
    
    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('form1'));
        if(storedData !== null){
            setpassword(storedData.password)
            setusername(storedData.username)
            setidNum(storedData.idNum)
        } 
    },[])
    return (
        <div>
            
            <div>
            <div className="login-container">
            <div className="sign-form">
                <div className="log-sec-a">
                    <p>Lectrocloud</p>
                    <p>Join the collegues</p>
                    <div className="errors">
                    {errors[0]}
                    </div>
                    <div className="log-fields">
                        <div className="fields">
                            <input onChange ={(e)=>(setidNum(e.target.value))} id='idNum' type="text" value={idNum} name="idNum" placeholder="Enter your Id"/>
                        </div>
                        <div className="fields">
                            <input id='idNum' onChange ={(e)=>(setusername(e.target.value))} type="text" name="name" value={username} placeholder="Enter username"/>
                        </div>
                        <div className="fields">
                            <input id="password" onChange ={(e)=>(setpassword(e.target.value))} value={password}  type={showPassword ? "text": "password"} name="password" placeholder="Enter your Password"/>
                            <div className="visibility" onClick={()=> setShowPassword(!showPassword)}>
                             {showPassword ? <span class="material-icons-outlined">visibility_off</span> : 
                             <span className="material-icons-outlined">visibility</span>
                             }
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="log-sec-b">
                    <button onClick={()=>{
                        handleclick()
                        // props.setPage(1)
                        }}>Next</button>
                    <p>already have an account?</p>
                    <a href="#">signin here</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
