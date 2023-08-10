import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, About } from "./views";
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login/Login";
import ResetP from "./views/ResetP/ResetP";
import ForgotP from "./views/ForgotP/ForgotP";
import SeeAll from "./components/Cards/seeAll";
import Favorites from "./views/Favorites/Favorites";
import Store from "./views/Store/Store";
import Playlist from "./views/Playlist/Playlist";
import SingleAlbum from "./views/SingleAlbum/Album";
import MembershipOffer from "./views/Membership/Membership";
import Account from "./views/Account/Account";
import MyPlaylist from "./components/Cards/myPlaylist";
import SignUp from "./views/SignUp/SignUp";
import LandingPage from "./components/LandingPage";
import Checkout from "./views/Checkout/Checkout";
import BeMember from "./views/Membership/beMember";
import SuccessPurchase from "./views/SuccessPurchase/SuccessPurchase";
import ErrorPurchase from "./views/errorPurchase/errorPurchase";
import Create from "./views/CreatePlaylist/Create";
import EditPlaylit from "./views/EditPlaylist/EditPlaylist";
import PrivateRoute from "./components/PrivateRoutes";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import InfoUsers from './components/Admin Dashboard/Info Users/InfoUsers'
import InfoAlbums from './components/Admin Dashboard/Info Albums/InfoAlbums'
import InfoSongs from './components/Admin Dashboard/Info Songs/InfoSongs'
import UserDetail from './components/Admin Dashboard/UserDetail/UserDetail'
import Formsongs from './components/Admin Dashboard/FormSongs/FormSongs'
import SongDetail from './components/Admin Dashboard/SongDetail/SongDetail'
import AlbumDetail from './components/Admin Dashboard/AlbumsDetail/AlbumDetail'
import Content from './components/Admin Dashboard/Content/Content'
import PrivacyPolicy from "./views/Policies/PrivacyPolicy";
import RefundPolicy from "./views/Policies/RefundPolicy";
import ShipppingPolicy from "./views/Policies/ShippingPolicy";


const Router = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="memberships" element={<MembershipOffer />} />
          <Route path="store" element={<Store />} />
          <Route path="seeAll/:name" element={<SeeAll />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="create" element={<Create />} />
          <Route path="album/:id" element={<SingleAlbum />} />
          <Route path="myPlaylist" element={<PrivateRoute><MyPlaylist/></PrivateRoute>} />
          <Route path="memberships/beMember" element={<PrivateRoute><BeMember/></PrivateRoute>} />
          <Route path="favorites" element={<PrivateRoute><Favorites/></PrivateRoute>} />
          <Route path="information/:section" element={<PrivacyPolicy />} />
        </Route>

        {/* OUTSIDE LAYOUT */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="reset-password/:token" element={<ResetP />} />
        <Route path="account" element={<PrivateRoute><Account/></PrivateRoute>}/>
        <Route path="forgot-password" element={<ForgotP />} />
        <Route path="checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="success" element={<PrivateRoute><SuccessPurchase /></PrivateRoute>} />
        <Route path="error" element={<PrivateRoute><ErrorPurchase /></PrivateRoute>} />
        <Route path="editPlaylist/:id" element={<PrivateRoute><EditPlaylit /></PrivateRoute>} />

        {/* ADMIN */}
        <Route path="admin" element={<AdminPrivateRoute><Content /></AdminPrivateRoute>}>
          <Route path="*" element={<AdminPrivateRoute><InfoUsers /></AdminPrivateRoute>} />
          <Route path="users" element={<AdminPrivateRoute><InfoUsers /></AdminPrivateRoute>} />
          <Route path="users/:id" element={<AdminPrivateRoute><UserDetail /></AdminPrivateRoute>} />
          <Route path="albums" element={<AdminPrivateRoute><InfoAlbums /></AdminPrivateRoute>} />
          <Route path="albums/:id" element={<AdminPrivateRoute><AlbumDetail /></AdminPrivateRoute>} />
          <Route path="songs" element={<AdminPrivateRoute><InfoSongs /></AdminPrivateRoute>} />
          <Route path="songs/:id" element={<AdminPrivateRoute><SongDetail /></AdminPrivateRoute>} />
          <Route path="songs/create" element={<AdminPrivateRoute><Formsongs /></AdminPrivateRoute>} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
