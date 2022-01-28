import React from 'react'

import './home-screen.css'

export default function HomeScreen(props) {
    return (
        <div className='home-screen'>
             {!props.loggedIn && <a href="http://localhost:8888"> Login</a>}
             {props.loggedIn &&  <div className="home-screen-title">Spotify Playlist Manager<p>Use the spotify playlist manager to easily create new playlist and edit existing playlist on you spoitfy account</p></div>}
        </div>
    )
}