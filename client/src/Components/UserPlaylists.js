import React, { Component } from 'react'
import { useState, useEffect } from "react";
import "./header.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function UserPlaylists(props) {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const getListOfPlaylists = () =>{
        spotifyApi.getUserPlaylists(props.userId)
      .then(function(data) {
        setUserPlaylists(data.items)
      },function(err) {
        console.log('Something went wrong!', err);
      });
      }
      const changePlaylist= (name, id) =>{
          props.setCurrentPlaylist({name: name, id:id});
      }
  useEffect(() => {
    getListOfPlaylists();
  }, [userPlaylists]);
  
    return (
        <div className='user-playlists'>
            <div className='playlist-title'>Your Playlists</div> <br></br>
            {userPlaylists.map((data, index) => {
        return (
          <div key={index}>
              <button onClick={() => changePlaylist(data.name, data.id)}>
              {data.name}
              </button>
          </div>
        );
      })}
        </div>
    )
}