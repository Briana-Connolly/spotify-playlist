import React from "react";
import { useState, useEffect } from "react";
import "./add-tracks.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function GetByTopArtist(props) {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  const getTopArtist = () => {
    spotifyApi.getMyTopArtists({ limit: 5 }).then((response) => {
      console.log(response.items);
      setTopArtists(response.items);
    });
  };

  const artistTop = (id) => {
    spotifyApi.getArtistTopTracks(id, "US").then(
      function (data) {
        console.log(data.tracks);
        setTopTracks(data.tracks);
      },
      function (err) {
        console.log("Error", err);
      }
    );
  };

  useEffect(() => {
    getTopArtist();
  }, []);
  return (
    <div className="top-artists">
      <div className="top-artists-map">
        {topArtists.map((artist) => (
          <div className="top-artists-map-item">
            <img src={artist.images[2].url}></img>
            <br></br>
            <button onClick={() => artistTop(artist.id)}>{artist.name}</button>
          </div>
        ))}
      </div>
      <div >
        {topTracks.map((track, index) => {
          return (
       
            <div className='track-map' key={index}>
            <div className='track-map-item'><img src={track.album.images[2].url}></img></div>
            <div className='track-map-item'>{track.name}</div>
            <div className='track-map-item'>{track.album.artists[0].name}</div>
            <div className='track-map-item'><button onClick={() => props.addTrack(track.uri)}>Add</button></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
