import React from 'react'
import { NavLink } from 'react-router-dom'
import TransitionPages from '../assets/transitions/TransitionPages'
import "./loginStyle.css"

const HomeLogin = () => {
  return (
    <>
      <TransitionPages/>
      <div className='homeLogin'>
        <div className="containerTextlogin">
          <div className="titleHomeLogin"> Download your music from <strong>Spotify</strong>  free</div>

          <NavLink to="/login">
            <div className="buttonStarted"> <strong>Get Started</strong> </div>
          </NavLink>
        </div>
  
        <div className="flare"></div>
      </div>
    </>

  )
}

export default HomeLogin