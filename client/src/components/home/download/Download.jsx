import React, {useState} from 'react'
import Nav from '../../nav/Nav'
import axios from "axios";
/* import downloadPlaylist from "../../../../../server/controllers/playList_controller" */

const Download = () => {

  /* acces token dinamico url */
  const hash = window.location.hash.substr(1);
  const hashParams = hash.split('&').filter(param => param.startsWith('access_token='));
  const UserAccessToken = hashParams[0].split('=')[1];



  /* recuperar el tipo de archivo a descargar mp3 / wave */


  const [typeSong, setTypeSong] = useState("");  // => typeSong contiene el tipo de archivo

  const handleChange = event => {
    setTypeSong(event.target.value);
  };



  /* funcion que llama a playList.js y envia los parametros (access Token y la playlist que se le envia por input) */

  const handleClick = (e) => {
    e.preventDefault()

    const playlistLink = e.target.inputPlaylist.value;
    //spotifyClient( playlistLink , UserAccessToken);
    
    //downloadPlaylist(playlistLink, UserAccessToken);

    axios.post("http://localhost:3000/playlist",
      { 
        link: playlistLink, 
        token: UserAccessToken
      })
      .then(function (response) {
        //handle 
        console.log(response.data);
      })


  }

  return (
    <>
    <Nav/>
    <div className="boxDownload">
      <h2>Your PlayList <span>/</span>  song from <strong>Spotify</strong> </h2>
      <p>Paste the URL of your Spotify PlayList / song and start your download</p>
    
      <div className="boxForm">
      <form className="box_contact_main" onSubmit={(handleClick)}>
          <input id='playlistId' name='inputPlaylist'  type="text" required placeholder='url' />
        
          <select name="typeSong" id="typeSong" value={typeSong} onChange={handleChange}>
            <option className='option' value="mp3">mp3</option>
            <option className='option' value="wave">wave</option>
          </select>

          <button className="sendContact_main" type='submit' >
              Send
          </button>
        </form>
    
      </div>
    </div>
    </>

  )
}

export default Download