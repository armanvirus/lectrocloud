import React,{useState} from 'react';
export const StateContext = React.createContext();

const ContextProvider = ({children})=>{
    const [postData,setPostData] = useState('')
    const [loading,setLoading] = useState(true)
    const [isSearching, setisSearching] = useState(false)
    const [searchResult, setsearchResult] = useState('')
    
   
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
            setsearchResult
            }}>
            {children} 
        </StateContext.Provider>
    )
}

export default ContextProvider;