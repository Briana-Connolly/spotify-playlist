import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./header.css";

import UserPlaylists from "./UserPlaylists";

export default function Header(props) {
  return (
    <div>
      {!props.loggedIn && <div className="first-header">Login to Spotify to continue</div>}

      {props.loggedIn && (
        <div className="header">
          <div className="header-title">
            Welcome, {props.userInfo.display_name}
          </div>
          <div className="current-playlist">
            Current playlist: {props.currentPlaylist.name}
          </div>
          <div className="header-container">
            <div className="playlists-container">
              {" "}
              <br></br>
              <UserPlaylists
                userId={props.userInfo.id}
                setCurrentPlaylist={props.setCurrentPlaylist}
              />
            </div>
            <nav className="header-nav">
              <NavLink to="/" className="header-nav-link">
                Home
              </NavLink>{" "}
              <NavLink to="/newplaylist" className="header-nav-link">
                Create New Playlist
              </NavLink>{" "}
              <NavLink to="/editplaylist" className="header-nav-link">
                Edit Current Playlist
              </NavLink>{" "}
              <NavLink to="/addTracks" className="header-nav-link">
                Add Tracks
              </NavLink>{" "}
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
