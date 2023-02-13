import React, { useState } from 'react'
import Nav from '../../nav/Nav'
import "./player.css"

import Prev from './buttons/Prev'
import Next from './buttons/Next'
import StartPause from './buttons/StartPause'
import NavMusic from './buttons/navMusic/NavMusicIcon'
import Volumen from './buttons/Volumen'
import ProgressBar from './buttons/ProgressBar'


const Player = () => {   
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);


  const handleFiles = (event) => {
    const files = event.target.files;
    const songsArray = [];
    for (let i = 0; i < files.length; i++) {
      songsArray.push({ name: files[i].name, file: files[i] });
    }
    setSongs(songsArray);
  };



  return (
    <>
    <Nav/>

    <div id="content">
      <canvas className='canvas_banner' id="canvas_banner"></canvas>

      <label htmlFor="thefile" className="file" id="file">
        Choose an audio file
        <input
          type="file"
          id="thefile"
          accept="audio/*"
          multiple
          onChange={handleFiles}
        />
      </label>
      <audio  preload="auto" id="audio" />


      <div className="reproductor">
        
        <div className="boxControls">
          <Prev songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex}/>
          <StartPause songs={songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
          <Next songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex} />
          <Volumen/>
          <NavMusic songs = {songs} setCurrentSongIndex = {setCurrentSongIndex}/> 
          <ProgressBar />

        </div>
   
      </div>
    </div>
    </>
  )
}

export default Player