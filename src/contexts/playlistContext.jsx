import { createContext, useEffect, useRef, useState } from "react"

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({children}) =>{
    
    const refPreviewNotAvailableAppJS = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);
    const [buyOpen, setBuyOpen] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const [playerHidden, setPlayerHidden] = useState(false);

    const [login, setLogin] = useState(null);

    useEffect(() => {
        const getUserFromLocalStorage = JSON.parse(localStorage.getItem("userSoulLife"));
        if(getUserFromLocalStorage){
          setLogin(getUserFromLocalStorage);
        }else{
          setLogin(false);
        }
    }, []);


    useEffect(() => {
        if(login){
            localStorage.setItem("userSoulLife", JSON.stringify(login))
        }else{
            localStorage.removeItem("userSoulLife");
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
        setCartModal,
        playerHidden,
        setPlayerHidden,
        refPreviewNotAvailableAppJS
    } 

    return <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
}


