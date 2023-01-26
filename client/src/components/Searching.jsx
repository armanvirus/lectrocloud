import React,{useContext} from 'react'
import {Link} from "react-router-dom"
import {StateContext} from "../context/provider"
import "../styles/searching.css"
import moment from "moment"

export default function Searching() {
    const { isSearching, 
            searchResult } = useContext(StateContext);
    return (
        <div className="search-contents">
            {searchResult && ( searchResult.length > 0 ? searchResult.map((el,i)=>{
                return(
                    <div>
                        <Link to={`/helpers/alight/${el._id}`}>
                        <p><span>by</span> @{el.user.username}</p>
                        <p className="search-main">{el.note}</p>
                        <p className="search-cont-date">{moment(el.lightOn).startOf('minute').fromNow()}</p>
                        </Link>
                    </div>     
                )
            }) : <p className="no-search"> <span>No search result found</span></p>) }
        </div>
    )
}
