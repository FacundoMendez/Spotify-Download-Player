import React, { useEffect , useState} from 'react'
import Nav from '../../nav/Nav'
import CanvasColor from './canvasColor/CanvasColor'
import "./player.css"

import Prev from './buttons/Prev'
import Next from './buttons/Next'
import StartPause from './buttons/StartPause'
import NavMusic from './buttons/NavMusic'


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

  console.log(songs)
  



  useEffect(() => {





  },[])




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
      <audio preload="auto" id="audio" />


      <div className="reproductor">
        
        <div className="boxControls">
          <Prev songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex}/>
          <StartPause songs={songs} currentSongIndex={currentSongIndex} />
          <Next songs={songs} currentSongIndex={currentSongIndex}  setCurrentSongIndex = {setCurrentSongIndex} />
        </div>

        <NavMusic/>
      </div>
    </div>
    </>
  )
}

export default Player