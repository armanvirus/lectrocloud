import React from 'react'
import rocket from "../assets/rocket.gif"

export default function Sending() {
    return (
        <div style={{
            background:"white",
            position:"fixed",
            display:"flex",
            flexDirection:"column",
            zIndex:10,
            alignItems:"center",
            justifyContent:"center",
            height:"60vh", 
            width:"100vw"}}>
            <img style={{
                height:"80px",
                width:"80px"}} src={rocket} alt=""/>
                <p>please wait...</p>
        </div>
    )
}
