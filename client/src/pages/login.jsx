import React,{useState,useContext,useEffect} from 'react'
import {useNavigate, Link} from "react-router-dom"
import axios from 'axios'
import "../styles/login.css"
import Sending from "../components/Sending";
import {serverUrl} from "../utils/Datum"
import {StateContext} from "../context/provider"
import Loader from '../components/loader';


export default function login() {
    const [showPassword, setShowPassword] = useState(false);
    const [idNum,setidNum] = useState('')
    const [password, setPassword] = useState('')
    const [isLighting,setisLighting] = useState(false);
    const [iserr, setiserr] = useState(false)
    const navigate = useNavigate()
    const {isUserloged} = useContext(StateContext);

    let err = [];

    const handleSubmit= () => {
        setisLighting(true)
        axios.defaults.withCredentials = true;
        axios.post(`${serverUrl}/login`, {
          idNum,
          password
        }) 
        .then(function (res) {
            if(res.data.token.length > 0){
                localStorage.setItem("lectroToken", res.data.token)
                setisLighting(false)
                console.log(res);
                
                navigate('/main/home')
            }
          }
        ).catch(err =>{ 
            setisLighting(false)
            err.push("fail to create account");
        })}

        const submition = (e)=>{
            e.preventDefault()
            handleSubmit()
        }

    return (
    
        <div>
            {isLighting && <Sending/>}
            <div className="login-container">
            <form onSubmit={ submition}>
                <div className="log-sec-a">
                    <p>Lectrocloud</p>
                    <p>Login for better Experience</p>
                    <div className="log-fields">
                        <div className="fields">
                            <input id='idNum' onChange={(e)=> setidNum(e.target.value)} type="text" name="idNum" placeholder="Enter your Id"/>
                        </div>
                        <div className="fields">
                            <input id="password" onChange={(e)=> setPassword(e.target.value)} type={showPassword ? "text": "password"} name="password" placeholder="Enter your Password"/>
                            <div className="visibility" onClick={()=> setShowPassword(!showPassword)}>
                             {showPassword ? <span class="material-icons-outlined">visibility_off</span> : 
                             <span className="material-icons-outlined">visibility</span>
                             }
                            </div>
                        </div>
                        <div className="log-check">
                        <input type="checkbox" name="keep" id="check"/> Keep me Loged</div>
                    </div>
                </div>
                
                <div className="log-sec-b">
                    <button>Login</button>
                    {/* <p>don't hyave an account?</p> */}
                    <Link to="/signup">create account</Link>
                    <p>can't remember your password?</p>
                    <Link to="#">Forgot password</Link>
                </div>
            </form>
            </div>
        </div>
    )
}
