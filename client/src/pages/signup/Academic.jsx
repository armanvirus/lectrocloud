import React,{useState, useEffect} from 'react'

export default function Academic(props) {
    const [level, setlevel] = useState('')
    const [errors, seterrors] = useState('')
    const [academicSession, setacademicSession] = useState('')
    
    const checkFields = ()=>{
        if(!level.length  || !academicSession.length ){
            seterrors("field out all fields")
        }else{
            localStorage.setItem("form2", JSON.stringify({
                level,
                academicSession
            }))
            props.setPage(2)
            seterrors('')
        }
    }

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('form2'));
        if(storedData !== null){
            setlevel(storedData.level)
            setacademicSession(storedData.academicSession)
        }
    },[''])
    console.log(localStorage.getItem("form1"))
    return (
        <div>
            <div>
            <div>
            <div className="login-container">
            <div className="sign-form">
                <div className="log-sec-a">
                    <p>Lectrocloud</p>
                    <p>Your Academics </p>
                    <div className="errors">
                    {errors}
                    </div>
                    <div className="log-fields">
                        <div className="fields">
                            <input onChange={(e)=> setlevel(e.target.value)} value={level} id='acdemicSession' type="text" name="level" placeholder="Enter your level"/>
                        </div>
                        <div className="fields">
                            <input onChange={(e)=> setacademicSession(e.target.value)} value={academicSession}  type="text" name="academicSession" placeholder="Current Academic Session"/>
                        </div>
                        
                    </div>
                </div>
                <div className="log-sec-b-c">
                    <button onClick={()=>props.setPage(0)}>Previous</button>
                    <button onClick={()=>(checkFields())}>Next</button>
                </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}
