import React,{useRef,useEffect,useState} from 'react'

export default function TopBar() {
    const topbarRef = useRef()
    const [scrollUp,setScrollUp] = useState(true)
    const [beforeScroll, setbeforeScroll] = useState(0)

   
	window.addEventListener('scroll', function(e){
		const scrolled = window.scrollY;
		if(beforeScroll > scrolled){
            setScrollUp(true)
            setbeforeScroll(scrolled);
		}
		else{
            setbeforeScroll(scrolled)
			setScrollUp(false)
		}
	})
    

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
            <div 
            style={
                scrollUp ?{display:"flex"}  : {display:"none"}}
            className="top-bar-toggle">
                <div>
                    <button className="toggle-btn-active">Academia</button> 
                    <button>General</button>
                </div>
            </div>
        </div>
    )
}
