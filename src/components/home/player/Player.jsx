import React, { useEffect , useState} from 'react'
import Nav from '../../nav/Nav'
import play from './canvasColor/play'
import "./player.css"


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


  const [playAudio , setPlayAudio] = useState(false)

  const handlePlayAudio = () => {
    setPlayAudio(!playAudio)
  }


  const audioControler = () => {
    const audio = document.getElementById("audio")

    if(playAudio){
      audio.play()
    }else{
      audio.pause()
    }
  }


  useEffect(() => {
    audioControler()

  },[playAudio])

  return (
    <>
    <Nav/>

    <div id="content">
      <canvas className='canvas_banner' id="canvas_banner"></canvas>
      <label htmlFor="thefile" className="file" id="file">
        Choose an audio file
        <input type="file" id="thefile" accept="audio/*" multiple onChange={handleFileChange} />
      </label>
      <audio preload="auto" id="audio" />



      <div className="reproductor">

        <div className="boxControls">
          <div className="ant-control control">
            <svg viewBox="0 0 32 32" enableBackground="new 0 0 32 32" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="play"></g> <g id="stop"></g> <g id="pause"></g> <g id="replay"></g> <g id="next"></g> <g id="Layer_8"> <g> <g> <path d="M27.136,3.736C27.508,3.332,28,3.45,28,4v24c0,0.55-0.492,0.668-0.864,0.264L16.449,16.736 c-0.372-0.405-0.325-1.068,0.047-1.473L27.136,3.736z"></path> <path d="M27.602,29.504c-0.441,0-0.868-0.2-1.202-0.563L15.715,17.416c-0.718-0.781-0.697-2.022,0.044-2.829L26.401,3.058 c0.333-0.362,0.76-0.562,1.201-0.562C28.399,2.496,29,3.143,29,4v24C29,28.857,28.399,29.504,27.602,29.504z M27,5.358 l-9.77,10.584c-0.036,0.04-0.044,0.109-0.036,0.132L27,26.646V5.358z"></path> </g> <g> <path d="M14.297,3.736C14.669,3.332,15,3.45,15,4v24c0,0.55-0.331,0.668-0.703,0.264L3.69,16.736 c-0.372-0.405-0.365-1.068,0.007-1.473L14.297,3.736z"></path> <path d="M14.706,29.504c-0.286,0-0.717-0.098-1.146-0.563L2.954,17.414c-0.727-0.791-0.724-2.032,0.006-2.827l10.6-11.527 c0.428-0.466,0.859-0.563,1.146-0.563C15.329,2.496,16,2.967,16,4v24C16,29.033,15.329,29.504,14.706,29.504z M14,5.538 L4.433,15.94c-0.025,0.027-0.023,0.102-0.006,0.119L14,26.463V5.538z"></path> </g> </g> </g> <g id="search"></g> <g id="list"></g> <g id="love"></g> <g id="menu"></g> <g id="add"></g> <g id="headset"></g> <g id="random"></g> <g id="music"></g> <g id="setting"></g> <g id="Layer_17"></g> <g id="Layer_18"></g> <g id="Layer_19"></g> <g id="Layer_20"></g> <g id="Layer_21"></g> <g id="Layer_22"></g> <g id="Layer_23"></g> <g id="Layer_24"></g> <g id="Layer_25"></g> <g id="Layer_26"></g> </g></svg>
          </div>

          <div className="pause-control control" onClick={handlePlayAudio}>
            {playAudio ?
              
              <svg  viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause</title> <path d="M0 6.563v18.875c0 0.531 0.438 0.969 0.969 0.969h6.625c0.5 0 0.906-0.438 0.906-0.969v-18.875c0-0.531-0.406-0.969-0.906-0.969h-6.625c-0.531 0-0.969 0.438-0.969 0.969zM12.281 6.563v18.875c0 0.531 0.438 0.969 0.938 0.969h6.625c0.531 0 0.969-0.438 0.969-0.969v-18.875c0-0.531-0.438-0.969-0.969-0.969h-6.625c-0.5 0-0.938 0.438-0.938 0.969z"></path> </g></svg>

              :

              <svg  xmlns="http://www.w3.org/2000/svg" className="bi bi-play-fill"   viewBox="2 0 32 16"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" fill="white"></path> </svg>
          
          }
          </div>

          <div className="sig-control control">
            <svg  viewBox="0 0 32 32" enableBackground="new 0 0 32 32" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="play"></g> <g id="stop"></g> <g id="pause"></g> <g id="replay"></g> <g id="next"> <g> <g> <path d="M4.561,3.728C4.184,3.328,4,3.45,4,4v24c0,0.55,0.184,0.672,0.561,0.272l10.816-11.544 c0.377-0.4,0.408-1.056,0.031-1.456L4.561,3.728z"></path> <path d="M4.202,29.507L4.202,29.507C4.079,29.507,3,29.465,3,28V4c0-1.465,1.079-1.507,1.202-1.507 c0.568,0,0.958,0.414,1.087,0.55l10.848,11.545c0.725,0.77,0.711,2.038-0.031,2.826L5.29,28.956 C5.16,29.094,4.771,29.507,4.202,29.507z M5.004,5.66L5,26.337l9.674-10.389L5.004,5.66z"></path> </g> <g> <path d="M17.561,3.728C17.184,3.328,17,3.45,17,4v24c0,0.55,0.184,0.672,0.561,0.272l10.816-11.544 c0.377-0.4,0.408-1.056,0.031-1.456L17.561,3.728z"></path> <path d="M17.202,29.507L17.202,29.507C17.079,29.507,16,29.465,16,28V4c0-1.465,1.079-1.507,1.202-1.507 c0.568,0,0.958,0.414,1.087,0.55l10.848,11.545c0.725,0.77,0.711,2.038-0.031,2.826L18.29,28.956 C18.16,29.094,17.771,29.507,17.202,29.507z M18.004,5.66L18,26.337l9.674-10.389L18.004,5.66z"></path> </g> </g> </g> <g id="Layer_8"></g> <g id="search"></g> <g id="list"></g> <g id="love"></g> <g id="menu"></g> <g id="add"></g> <g id="headset"></g> <g id="random"></g> <g id="music"></g> <g id="setting"></g> <g id="Layer_17"></g> <g id="Layer_18"></g> <g id="Layer_19"></g> <g id="Layer_20"></g> <g id="Layer_21"></g> <g id="Layer_22"></g> <g id="Layer_23"></g> <g id="Layer_24"></g> <g id="Layer_25"></g> <g id="Layer_26"></g> </g></svg>
          </div>
        </div>


        <div className="navMusic">
          <svg  viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></g></svg>
        </div>


      </div>


    </div>
    </>
  )
}

export default Player