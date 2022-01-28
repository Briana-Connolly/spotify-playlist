import React from "react";
import { useState, useEffect, useRef } from "react";
import "./edit-playlist.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function EditPlaylist(props) {
  const [playlists, setPlaylists] = useState([]);

  const displayList = () => {
    spotifyApi.getPlaylist(props.playlistId).then(
      function (data) {
        setPlaylists(data.tracks.items);
      },
      function (err) {
        console.log("Error", err);
      }
    );
  };

  const removeTrack = (id) => {
    const arr = [id];
    spotifyApi.removeTracksFromPlaylist(props.playlistId, arr).then(
      function (data) {
        console.log("removed from playlist");
        const arr2 = playlists;
        arr2.pop(id);
        setPlaylists(arr2);
      },
      function (err) {
        console.log("Error", err);
      }
    );
  };

  useEffect(() => {
    displayList();
  }, [props.playlistId, playlists]);
  return (
    <div>
      {playlists.map((data, index) => {
        return (
          <div className="track-map" key={index}>
            <div className="track-map-item">
              <img src={data.track.album.images[2].url}></img>
            </div>
            <div className="track-map-item">{data.track.name}</div>
            <div className="track-map-item">
              {data.track.album.artists[0].name}
            </div>
            <div>
              <button
                onClick={() => removeTrack(data.track.uri)}
                className="remove-button"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
