import React, { useEffect , useState, useRef } from 'react'
import Nav from '../../nav/Nav'
import play from './play'


const Player = () => {   
  

  useEffect(() => {
    window.ga = window.ga || function() {
      (ga.q = ga.q || []).push(arguments)
    };
    ga.l = +new Date;
    ga('create', 'UA-105392568-1', 'auto');
    ga('send', 'pageview');
    play()
  },[])

  return (
    <>
    <Nav/>

    <div id="content">
      <canvas className='canvas_banner' id="canvas_banner"></canvas>

      <label htmlFor="thefile" className="file"> Choose an audio file
        <input type="file" id="thefile" accept="audio/*" />
      </label>

      <audio id="audio" controls></audio>
    </div>
    </>
  )
}

export default Player