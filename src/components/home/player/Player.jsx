import React, { useEffect , useState} from 'react'
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

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setSongs([...songs, e.target.result]);
      setCurrentSongIndex(songs.length);
      document.getElementById("audio").src = e.target.result;
    };
    fileReader.readAsDataURL(selectedFile);
  };

  return (
    <>
    <Nav/>

    <div id="content">
      <canvas className='canvas_banner' id="canvas_banner"></canvas>

      <label htmlFor="thefile" className="file" id="file">
        Choose an audio file
        <input type="file" id="thefile" accept="audio/*" multiple onChange={handleFileChange} />
      </label>


      <audio id="audio" controls></audio>
    </div>
    </>
  )
}

export default Player