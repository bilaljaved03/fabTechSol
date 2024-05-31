import Recat, {createContext,useState,useContext,useEffect}  from 'react'
const CurrentNodeContext = createContext();
export const CurrentNodeProvider = ({children}) =>{

const  [name,setName ] = useState("Bilal");
const [CURRENT_OVER_NODE ,SET_CURRENT_OVER_NODE] = useState(null)
return(
    <CurrentNodeContext.Provider value={{name,setName,CURRENT_OVER_NODE,SET_CURRENT_OVER_NODE}} >
        {children}
    </CurrentNodeContext.Provider>
)
}
export const useCurrentNode = () => useContext(CurrentNodeContext)