import React from 'react'
import {NavLink } from "react-router-dom";
import "./add-tracks.css"


export default function AddTracks(props) {

    return (
        <div className='add-tracks'>
            <nav>
                <NavLink className='add-tracks-item' to="/addTracks+topArtists">Add By Top Artist</NavLink>{" "}
                <NavLink className='add-tracks-item' to="/addTracks+SearchPlaylists">Search Other Playlists</NavLink>{" "}
            </nav>

            <div className='add-tracks-description'>
                Add songs from you favorite artist or browse through other playlists
            </div>
        </div>
    )
}