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
     /* control de start/pause */
  const [playAudio , setPlayAudio] = useState(false)

  

  const createSongObject = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.addEventListener("loadedmetadata", () => {
        let totalMinutes = Math.floor(audio.duration / 60);
        let totalSeconds = Math.floor(audio.duration % 60);
        let formattedDuration = audio.duration ? `${totalMinutes}:${totalSeconds < 10 ? "0" + totalSeconds : totalSeconds}` : "0:00";
        resolve({ name: file.name, file: file, duration: formattedDuration });
      });
    });
  };
  
  const handleFiles = async (event) => {
    const files = event.target.files;
    const songsArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const song = await createSongObject(files[i]);
      songsArray.push(song);
    }
  
    setSongs(songsArray);
  };


  return (
    <>
    <Nav/>

    <div id="content">
      <canvas className='canvas_banner' id="canvas_banner"></canvas>
      <audio  preload="auto" id="audio" />


      <div className="reproductor">

        <div className="fileBox">
            <label htmlFor="thefile" className={songs.length > 1 ? "file_elem" : "file"} id="file">
                {songs.length > 1 ? 
                  "+" 
                  : 
                  "Choose an audio file"
                }
                
                <input
                  type="file"
                  id="thefile"
                  accept="audio/*"
                  multiple
                  onChange={handleFiles}
                />

            </label>

            {songs.length > 1 && 
            <div className="boxNameSong">
              <p className='nombre'>{songs[currentSongIndex].name.substring(0, 30)} </p>
            </div>
            } 

        </div>
        


        <div className="boxControls">
          <Prev songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex}/>
          <StartPause songs={songs} currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} playAudio={playAudio} setPlayAudio = {setPlayAudio}/>
          <Next songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex} />
          <Volumen />
           
          {songs.length > 1 && <NavMusic songs = {songs} setCurrentSongIndex = {setCurrentSongIndex} setPlayAudio = {setPlayAudio}/> }
               
          <ProgressBar />
        </div>
   
      </div>
    </div>
    </>
  )
}

export default Player