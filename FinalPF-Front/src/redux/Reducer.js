import {
  GET_USERS,
  GET_USERS_ID,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
  GET_SONGS,
  GET_SONGS_ID,
  POST_SONGS,
  PUT_SONGS,
  DELETE_SONGS,
  GET_REVIEWS,
  GET_REVIEWS_ID,
  POST_REVIEWS,
  PUT_REVIEWS,
  DELETE_REVIEWS,
  GET_PLAYLISTS,
  GET_PLAYLISTS_ID,
  POST_PLAYLISTS,
  PUT_PLAYLISTS,
  DELETE_PLAYLISTS,
  GET_ALBUMS,
  GET_ALBUMS_ID,
  POST_ALBUMS,
  PUT_ALBUMS,
  DELETE_ALBUMS,
  GET_MEMBERSHIPS,
  GET_MEMBERSHIPS_ID,
  POST_MEMBERSHIPS,
  PUT_MEMBERSHIPS,
  DELETE_MEMBERSHIPS,
  GET_GENRES,
  GET_GENRES_ID,
  POST_GENRES,
  DELETE_GENRES,
  FILTER_SONGS,
  RESET_MESSAGES,
  CREATE_USER,
  LOGIN_USER,
  REMOVE_FAV,
  ADD_FAV,
  FAVS_USER,
  RESET_USERSID_USERFAVS,
  REMOVE_CART,
  ADD_CART,
  CART_USER,
  CREATE_ORDER,
  GET_ORDER,
  GOOGLE_AUTH,
  MAKE_MEMBER,
  FORGOT_PASSWORD,
  CREATE_USER_PLAYLIST,
  DELETE_USER_PLAYLIST,
  EDIT_P_SONGS,
  UPDATE_USER_PLAYLIST,
  TOGGLE_PLAYLIST,
  RESET_EDITPSONGS,
  FILTER_SONGS_ARTIST,
  FILTER_SONGS_POPULARITY,
  FILTER_SONGS_EXPLICIT,
  FILTER_SONGS_ALPHABET,
  GET_ALL_SONGS,
  GET_ALL_ALBUMS,
} from "./Action-types";

const initialState = {
  message: "",
  users: [],
  userOrders:[],
  userCart: [],
  userFavs:[],
  usersId: [],
  songs: [],
  filteredSongs: [],
  songsId: {},
  allSongs: {},
  reviews: [],
  reviewsId: {},
  playlists: [],
  playlistsId: {},
  editPlaylistSongs: [],
  albums: [],
  allAlbums: {},
  albumsId: {},
  memberships: [],
  membershipsId: {},
  genres: [],
  genresId: {},
  filteredSongsArtist: [],
  filteredSongsPopularity: [],
  filteredSongsExplicit: [],
  filteredSongsAlphabet:[],
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // USERS ----------------------------------------------------------------------------------
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_USERS_ID:
      return {
        ...state,
        userCart: payload.data.cart ? payload.data.cart : [],
        userFavs: payload.data.favorites ? payload.data.favorites : [],
        usersId: payload.data,
      };

    case POST_USERS:
      return {
        ...state,
        message: payload,
      };

    case CREATE_USER:
      return {
        ...state,
        message: payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        message: payload
      };

    case PUT_USERS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_USERS:
      return {
        ...state,
        message: payload,
      };

    case REMOVE_FAV:
      return {
        ...state,
        userFavs: state.userFavs.filter(el => el !== payload),
        message: "Added to favs",
      };

    case ADD_FAV:
      return {
        ...state,
        userFavs: [...state.userFavs, payload],
        message: "Removed from favs",
      };

    case REMOVE_CART:
      return {
        ...state,
        userCart: state.userCart.filter(el => el.name !== payload),
        message: "Removing from cart",
      };

    case ADD_CART:
      return {
        ...state,
        userCart: [...state.userCart, payload],
        message: payload,
      };

    case FAVS_USER:
      return {
        ...state,
        message: payload,
      };

    case CART_USER:
      return {
        ...state,
        message: payload,
      };

    case CREATE_ORDER:
      return {
        ...state,
        userCart: [],
        userOrders: [...state.userOrders, payload],
        message: "Order created",
      };

    case GET_ORDER:
      return {
        ...state,
        userOrders: payload !== "Orders empty" ? payload : [],
        message: "Order created",
      };

    case GOOGLE_AUTH:
      return {
        ...state,
        message: payload,
      };

    case MAKE_MEMBER:
      return {
        ...state,
        message: payload,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        message: payload,
      };

    case CREATE_USER_PLAYLIST:
      return {
        ...state,
        playlists: payload.msg === "User playlist created" ? payload.data : state.playlists,
        message: payload.msg,
      };


    case DELETE_USER_PLAYLIST:
      console.log(payload);
      return {
        ...state,
        playlists: payload.msg === "User playlist deleted" ? state.playlists.filter(el => el.playlistId !== payload.id) : state.playlists,
        message: payload.msg,
      };


    case UPDATE_USER_PLAYLIST:
      return {
        ...state,
        message: payload,
      };


    case TOGGLE_PLAYLIST:
      return {
        ...state,
        message: payload,
      };

    // SONGS ----------------------------------------------------------------------------------
    case GET_SONGS:
      return {
        ...state,
        songs: payload.data,
      }

    case GET_ALL_SONGS:
      return {
        ...state,
        allSongs: payload,
    }

    case FILTER_SONGS:
      return {
        ...state,
        filteredSongs: payload,
      }

    case GET_SONGS_ID:
      return {
        ...state,
        songsId: payload,
      };

    case POST_SONGS:
      return {
        ...state,
        message: payload,
      };

    case PUT_SONGS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_SONGS:
      return {
        ...state,
        message: payload,
      };

      case FILTER_SONGS_ARTIST:
      return {
        ...state,
        filteredSongsArtist: payload,
      };
    case FILTER_SONGS_POPULARITY:
      return {
        ...state,
        filteredSongsPopularity: payload,
      };
    case FILTER_SONGS_EXPLICIT:
      return {
        ...state,
        filteredSongsExplicit: payload,
      };
    case FILTER_SONGS_ALPHABET:
      return {
        ...state,
        filteredSongsAlphabet: payload,
      };
    // REVIEWS --------------------------------------------------------------------------------
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
      };

    case GET_REVIEWS_ID:
      return {
        ...state,
        reviewsId: payload,
      };

    case POST_REVIEWS:
      console.log(payload);
      return {
        ...state,
        message: payload.msg,
        reviews: [...state.reviews, payload.data]
      };

    case PUT_REVIEWS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_REVIEWS:
      return {
        ...state,
        message: payload,
      };

    // PLAYLISTS ------------------------------------------------------------------------------
    case GET_PLAYLISTS:
      return {
        ...state,
        playlists: payload,
      };

    case GET_PLAYLISTS_ID:
      return {
        ...state,
        usersId: payload,
      };

    case POST_PLAYLISTS:
      return {
        ...state,
        message: payload,
      };

    case PUT_PLAYLISTS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_PLAYLISTS:
      return {
        ...state,
        message: payload,
      };

    case EDIT_P_SONGS:
      console.log(payload);
      return {
        ...state,
        editPlaylistSongs: payload,
      }

    //ALBUMS ----------------------------------------------------------------------------------
    case GET_ALBUMS:
      return {
        ...state,
        albums: payload.data,
      };

    case GET_ALL_ALBUMS:
      return {
      ...state,
      allAlbums: payload,  
    };

    case GET_ALBUMS_ID:
      return {
        ...state,
        albumsId: payload,
      };

    case POST_ALBUMS:
      return {
        ...state,
        message: payload,
      };

    case PUT_ALBUMS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_ALBUMS:
      return {
        ...state,
        message: payload,
      };

    //MEMBERSHIPS -----------------------------------------------------------------------------
    case GET_MEMBERSHIPS:
      return {
        ...state,
        memberships: payload.data,
      };

    case GET_MEMBERSHIPS_ID:
      return {
        ...state,
        membershipsId: payload,
      };

    case POST_MEMBERSHIPS:
      return {
        ...state,
        message: payload,
      };

    case PUT_MEMBERSHIPS:
      return {
        ...state,
        message: payload,
      };
    case DELETE_MEMBERSHIPS:
      return {
        ...state,
        message: payload,
      };

    // GENRES ---------------------------------------------------------------------------------
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };

    case GET_GENRES_ID:
      return {
        ...state,
        genresId: payload,
      };

    case POST_GENRES:
      return {
        ...state,
        message: payload,
      };

    case DELETE_GENRES:
      return {
        ...state,
        message: payload,
      };

    // STATES
    case RESET_MESSAGES:
    return {
      ...state,
      message: "",
      editPlaylistSongs: []
    };


    case RESET_EDITPSONGS:
    return {
      ...state,
      editPlaylistSongs: [],
    };

    case RESET_USERSID_USERFAVS:
    return {
      ...state,
      userCart: [],
      usersId: [],
      userFavs: [],
      message: "",
    };

    default:
      return { ...state };
      
  }
};

export default Reducer;
