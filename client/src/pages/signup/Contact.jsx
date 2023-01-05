import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function Contact(props) {
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("")
    const [errors,seterrors] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('form3'));
        if(storedData !== null){
            setemail(storedData.email)
            setphone(storedData.phone)
        }
    },[''])

    const handleSubmit = ()=>{
        if(!phone.length || !email.length){
        seterrors("fill out all fields")
        }else{
            localStorage.setItem('form3',JSON.stringify({
                email,
                phone
            }))
            const form1 = JSON.parse(localStorage.getItem('form1'));
            const form2 = JSON.parse(localStorage.getItem('form2'));
            const form3 = JSON.parse(localStorage.getItem('form3'));
                if(!form1 || !form2 || !form3){
                    seterrors("complete previouse stages")
                }else{
                    seterrors('')
                    let {password,username, idNum} = form1
                    let {level , academicSession} = form2
                    let {email, phone} = form3
                    
                    axios.post("http://localhost:3300/sign",{
                        password,
                        email,
                        phone,
                        level,
                        username,
                        idNum,
                        academicSession

                    })
                    .then(function (response) {
                        if(response.data.token.length > 0){
                            localStorage.removeItem('form1')
                            localStorage.removeItem('form2')
                            localStorage.removeItem('form3')
                            localStorage.setItem("lectroToken", response.data.token)
                            navigate('/main/home')
                        }
                      }
                    )
                }
            
        }
    }

    
    return (
        <div>
            <div>
            <div>
            <div className="login-container">
            <div className="sign-form">
                <div className="log-sec-a">
                    <p>Lectrocloud</p>
                    <p>Your Contacts </p>
                    <div className="errors">
                    {errors}
                    </div>
                    <div className="log-fields">
                        <div className="fields">
                            <input value={email} onChange={(e)=>(setemail(e.target.value))} id='email' type="email" name="email" placeholder="Enter your Email"/>
                        </div>
                        <div className="fields">
                            <input value={phone} onChange={(e)=>(setphone(e.target.value))} id="text"  type="text" name="phone" placeholder="Enter your Phone"/>
                        </div>
                        
                    </div>
                </div>
                <div className="log-sec-b-c">
                    <button onClick={()=> props.setPage(1)} >Previous</button>
                    <button onClick={()=>handleSubmit()}>SignUp</button>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}
