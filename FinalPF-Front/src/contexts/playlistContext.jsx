import { createContext, useEffect, useRef, useState } from "react"
import { getUsersById } from "../redux/Actions/UsersActions";
import { useDispatch } from "react-redux";
import { resetUserStates } from "../redux/Actions/StateActions";

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({children}) =>{
    const dispatch = useDispatch();
    const refPrivacyPolicy = useRef();
    const refRefundPolicy = useRef();
    const refShippingPolicy = useRef();
    const refTermsCond = useRef();
    const refFAQS = useRef();
    const refFAQS1 = useRef();
    const refFAQS2 = useRef();
    const refFAQS3 = useRef();
    const refFAQS4 = useRef();
    const refFAQS5 = useRef();
    const refPreviewNotAvailableAppJS = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);
    const [buyOpen, setBuyOpen] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const [playerHidden, setPlayerHidden] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [login, setLogin] = useState(null);
    const [totalGetter, setTotalGetter] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const [alphabet, setAlphabet] = useState(null);
    const [letter, setLetter] = useState(null);
    const [artists, setArtists] = useState(null);
    const [popularity, setPopularity] = useState(null);
    const [explicit, setExplicit] = useState(null);
    const [openAddToPlaylist, setOpenAddToPlaylist] = useState(false);


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
        refPreviewNotAvailableAppJS,
        loginOpen,
        setLoginOpen,
        totalGetter,
        setTotalGetter,
        filteredResults,
        setFilteredResults,
        alphabet,
        setAlphabet,
        letter,
        setLetter,
        artists,
        setArtists,
        popularity,
        setPopularity,
        explicit,
        setExplicit,
        openAddToPlaylist,
        setOpenAddToPlaylist,
        refFAQS,
        refPrivacyPolicy,
        refRefundPolicy,
        refShippingPolicy,
        refTermsCond,
        refFAQS1,
        refFAQS2,
        refFAQS3,
        refFAQS4,
        refFAQS5
    } 

    return <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
}


