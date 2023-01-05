import React,{useState} from 'react'
import Credentials from "./signup/Credentials";
import Academic from "./signup/Academic"
import Contact from "./signup/Contact"
import "../styles/login.css"

export default function SignUp() {
    const [page,setPage] = useState(2)
    const currentPage = ()=>{
        if(page == 0) return <Credentials setPage={setPage}/>
        else if(page == 1) return <Academic setPage={setPage}/>
        else return <Contact setPage={setPage}/>
    }
    return (
        <div>
            {currentPage()}
        </div>
    )
}
