import React from "react";
import { useState} from "react";
import "./create-new-playlist.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export default function CreateNewPlaylist(props) {
  const [newPlaylist, setNewPlaylist] = useState("");
  const [name, setName] = useState("no name");
  const [description, setDescription] = useState("no description");

  const makePlaylist = () => {
    spotifyApi
      .createPlaylist(props.userId, {
        name: name,
        description: description,
        public: true,
      })
      .then(
        function (data) {
          console.log("Playlist Created!");
          console.log(data);
          setNewPlaylist("Playlist created!");
          props.setCurrentPlaylist({ name: data.name, id: data.id });
        },
        function (err) {
          console.log("Error", err);
        }
      );
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const makeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="create-new-playlist">
      <div className="create-new-playlist-item"><input type="text" placeholder="Enter Name" onChange={handleChange} /></div>
      <div className="create-new-playlist-item"><input
        type="text"
        placeholder="Enter Description"
        onChange={makeDescription}
      /></div>
      <div className="create-new-playlist-item"><button onClick={() => makePlaylist()}>Create Playlist</button></div>
      <div className="create-new-playlist-item">{newPlaylist}</div>
    </div>
  );
}
