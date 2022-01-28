import React from 'react'
import { useState, useEffect } from "react";

import './search-playlist.css'
import '../App.css'

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function SearchPlaylists(props) {
  const [category, setCategory] = useState("cate")
  const [playlists, setPlaylists] = useState([]);
  const [songList, setSongList] = useState([]);

    const setPlaylistCategory = (e) => {
        setCategory(e.target.value)
      };

      const getListsOfPlaylist = () =>{
        spotifyApi.getCategoryPlaylists (category, {
          country: 'US',
          limit : 10,
          offset : 0
        })
      .then(function(data) {
        console.log(data.playlists.items);
        setPlaylists(data.playlists.items);
      }, function(err) {
        console.log("Something went wrong!", err);
      });
      };

      const getPlaylist = (id) =>{
        spotifyApi.getPlaylist(id)
      .then(function(data) {
        console.log('Some information about this playlist', data.tracks.items);
        setSongList(data.tracks.items);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
      } 
    return (
        <div className='search-playlist'>
              <input
        type="text"
        placeholder="Enter Playlist Category"
        onChange={setPlaylistCategory}
      />
      <button className="search-playlist-button"onClick={() => getListsOfPlaylist()}> Get Playlist</button>

<div className='search-playlist-map'>
  {playlists.map((track, index) => {
        return (
          <div key={index}>
            
            <button onClick={() => getPlaylist(track.id)}>{track.name}</button>
          </div>
        );
      })}
    </div>

       {songList.map((data, index) => {
        return (
          <div className='track-map' key={index}>
          <div className='track-map-item'><img src={data.track.album.images[2].url}></img></div>
          <div className='track-map-item'>{data.track.name}</div>
          <div className='track-map-item'>{data.track.album.artists[0].name}</div>
          <div className='track-map-item'><button onClick={() => props.addTrack(data.track.uri)}>Add</button></div>
        </div>
        );
      })}
        </div>
    )
}
