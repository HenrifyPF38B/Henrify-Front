import { createContext, useState } from "react"

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({children}) =>{
    
    const [modalOpen, setModalOpen] = useState(false);

    const data = {
        modalOpen,
        setModalOpen
    } 

    return <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
}


