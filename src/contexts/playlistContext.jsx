import { createContext, useEffect, useRef, useState } from "react"
import { getUsersById } from "../redux/Actions/UsersActions";
import { useDispatch } from "react-redux";
import { resetUserStates } from "../redux/Actions/StateActions";

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({children}) =>{
    const dispatch = useDispatch();
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
            dispatch(getUsersById(login.id));
        }else{
            localStorage.removeItem("userSoulLife");
            dispatch(resetUserStates());
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


