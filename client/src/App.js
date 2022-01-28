import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

import GetByTopArtist from "./Components/GetByTopArtist";
import SearchPlaylists from "./Components/SearchPlaylists";
import CreateNewPlaylist from "./Components/CreateNewPlaylist";
import EditPlaylist from "./Components/EditPlaylist";
import AddTracks from "./Components/AddTracks";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Header from './Components/Header';
import HomeScreen from "./Components/HomeScreen";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function App() {
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  const params = getHashParams();
  const token = params.access_token;
  if (token) {
    spotifyApi.setAccessToken(token);
  }

  const [loggedIn, setLoggedIn] = useState(token ? true : false);
  const [userInfo, setUserInfo] = useState({
    display_name: "",
    product: "",
    email: "",
  });
  const [currentPlaylist, setCurrentPlaylist] = useState({
    name: "",
    id: "",
  });

  const addTrack = (id) => {
    const arr = [id];
    spotifyApi.addTracksToPlaylist(currentPlaylist.id, arr).then(
      function (data) {
        console.log("Added to playlist");
      },
      function (err) {
        console.log("Error", err);
      }
    );
  };

  const displayUserInfo = () => {
    spotifyApi.getMe().then((data) => {
      console.log(data);
      setUserInfo({
        display_name: data.display_name,
        product: data.product,
        email: data.email,
        id:data.id
      });
    });
  };

  useEffect(() => {
    displayUserInfo();
    }, []);

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Header userInfo={userInfo} loggedIn={loggedIn} currentPlaylist={currentPlaylist}  setCurrentPlaylist={setCurrentPlaylist}/>}>
          <Route index element={<HomeScreen loggedIn={loggedIn}/>} />
          <Route path="/newplaylist" element={<CreateNewPlaylist userId={userInfo.id} setCurrentPlaylist={setCurrentPlaylist}/>}/>
          <Route path="/editPlaylist" element={<EditPlaylist userId={userInfo.id} setCurrentPlaylist={setCurrentPlaylist} playlistId={currentPlaylist.id}/>}/>
          <Route path="/addTracks" element={<AddTracks userId={userInfo.id} setCurrentPlaylist={setCurrentPlaylist} playlistId={currentPlaylist.id}/>}/>
          <Route path="/addTracks+topArtists" element={<GetByTopArtist addTrack={addTrack}/>}/>
          <Route path="/addTracks+SearchPlaylists" element={<SearchPlaylists addTrack={addTrack}/>}/>
          </Route>
        </Routes>
      </Router>
  );
}
