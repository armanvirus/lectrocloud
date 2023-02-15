import React,{useEffect,useState,useContext} from 'react'
import {StateContext} from '../context/provider';
import {serverUrl}  from "./Datum"
import axios from "axios";



export const getUser = (setisUserloged)=>{
 return setisUserloged(localStorage.getItem('lectroToken'))
}
export const token =()=>{
    let retrievedToken = localStorage.getItem('lectroToken');
    if(retrievedToken == null){
        return 0
    }else{
        return retrievedToken
    }
}


export const fetchData = (fetchObj)=>{
  const  {
    setLoading,
    setPostData,
    pageNum, 
    setPageNum,
    hasMore, 
    setHasMore, 
    token} = fetchObj
    axios.defaults.withCredentials = true;
    /* when there is no token in the local storage the value 
    is null but when it sent to server it shows that the null value is string  0f length
    4, there i created this logic if the servre receives 0 then it means there is no
    token the user is not logged" */
    setHasMore(false)
    axios.get(`${serverUrl}/`, {
      params: {
        pageNum,
        pageSize:10,
      },
      headers:{"Authorization":`Bearer ${token()}`}})
  .then((res)=>{
      // setPostData(res.data.postData)
      setPostData(prevData => [...prevData, ...res.data.postData]);
      setLoading(false)
      setHasMore(res.data.postData.length === 10);
    console.log(res)
    return;
  })
  .catch((err)=>{
    console.log(err)
  })
}

// async function fetchData() {
//   try {
//     const response = await axios.get('/api/data', {
//       params: {
//         page,
//         pageSize,
//       },
//     });
//     setData(prevData => [...prevData, ...response.data]);
//     setHasMore(response.data.length === pageSize);
//   } catch (error) {
//     console.error(error);
//   }
// }