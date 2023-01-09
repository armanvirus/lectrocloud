import React,{useState} from 'react';
export const StateContext = React.createContext();

const ContextProvider = ({children})=>{
    const [postData,setPostData] = useState('')
    const [loading,setLoading] = useState(true)
    
   
    return(
        <StateContext.Provider value={{
            // intended contents here
            loading,
            setLoading,
            postData,
            setPostData,
            }}>
            {children} 
        </StateContext.Provider>
    )
}

export default ContextProvider;