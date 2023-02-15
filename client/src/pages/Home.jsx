import React,{useEffect,useState,useContext} from 'react'
import axios from "axios"
import Posts from "../components/Posts"
import {StateContext} from '../context/provider';
import amin from "../assets/amin.png"
import Loader from '../components/loader';
import {token, fetchData} from "../utils/Auths"



export default function Home() {
    //pulling data from context
    const {        
        loading,
        postData,
        setLoading,
        setPostData,
        pageNum, 
        setPageNum,
        hasMore, 
        setHasMore
    } = useContext(StateContext);


    useEffect(()=>{
        fetchData({
            token,
            loading,
            postData,
            setLoading,
            setPostData,
            pageNum, 
            setPageNum,
            hasMore, 
            setHasMore});
    },[])

    // fetch lights when 3/4 of the page is scrolled
    useEffect(()=>{
        if(pageNum == 0) return ;
        fetchData({
            token,
            loading,
            postData,
            setLoading,
            setPostData,
            pageNum, 
            setPageNum,
            hasMore, 
            setHasMore}); 
    },[pageNum])

    return (
        <div>
        { loading ? <Loader/> :
           <Posts postData={postData}/>
        } 
        </div>
    )
}
