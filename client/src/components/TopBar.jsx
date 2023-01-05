import React,{useRef,useEffect} from 'react'

export default function TopBar() {
    const topbarRef = useRef()
    

    useEffect(()=>{
        console.log(topbarRef.current.style.width, 'hi dear')
    },[''])
    return (
        <div ref={topbarRef} className="topbar">
            <div className="top-bar-search">
                <input type="text" placeholder="looking for something..."/>
                <div className="top-search-icon">
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
            <div className="top-bar-toggle">
                <div>
                    <button className="toggle-btn-active">Academia</button> 
                    <button>General</button>
                </div>
            </div>
        </div>
    )
}
