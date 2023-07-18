import { createContext, useEffect, useState } from "react"

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({children}) =>{
    
    const [modalOpen, setModalOpen] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);
    const [buyOpen, setBuyOpen] = useState(false);
    const [cartModal, setCartModal] = useState(false);


    const [login, setLogin] = useState(null);
    useEffect(() => {
        const getUserFromLocalStorage = localStorage.getItem("soul");
        if(getUserFromLocalStorage){
          setLogin(getUserFromLocalStorage);
        }else{
          setLogin(null);
        }
    }, []);
    useEffect(() => {
        if(login){
            localStorage.setItem("soul", true)
        }else{
            localStorage.removeItem("soul");
        }
    }, [login]);

    const data = {
        modalOpen,
        setModalOpen,
        playerOpen,
        setPlayerOpen,
        login,
        setLogin,
        buyOpen,
        setBuyOpen,
        cartModal,
        setCartModal
    } 

    return <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
}


