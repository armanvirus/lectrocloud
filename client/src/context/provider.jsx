import React,{useState} from 'react';
export const StateContext = React.createContext();

const ContextProvider = ({children})=>{
    const [postData,setPostData] = useState('')
    const [loading,setLoading] = useState(true)
    const [isSearching, setisSearching] = useState(false)
    const [searchResult, setsearchResult] = useState('')
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    
   
    return(
        <StateContext.Provider value={{
            // intended contents here
            loading,
            setLoading,
            postData,
            setPostData,
            isSearching, 
            setisSearching,
            searchResult, 
            setsearchResult,
            pageNum, 
            setPageNum,
            hasMore, 
            setHasMore
            }}>
            {children} 
        </StateContext.Provider>
    )
}

export default ContextProvider;