import React from 'react'
import spotifyClient from '../../api/playlist';
import Nav from '../../nav/Nav'
import axios from "axios";


const Download = () => {

  /* acces token dinamico url */
  const hash = window.location.hash.substr(1);
  const hashParams = hash.split('&').filter(param => param.startsWith('access_token='));
  const UserAccessToken = hashParams[0].split('=')[1];
  

  /* funcion que llama a playList.js y envia los parametros (access Token y la playlist que se le envia por input) */
  const handleClick = (e) => {
    e.preventDefault()

    const playlistLink = e.target.inputPlaylist.value;
    //spotifyClient( playlistLink , UserAccessToken);
    
    ;

    axios.post("http://localhost:3001/playlist",
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
    
      <form className="box_contact_main" onSubmit={(handleClick)}>
        <input id='playlistId' name='inputPlaylist'  type="text" required placeholder='url' />
      
        <button className="sendContact_main" type='submit' >
            Send
        </button>
      </form>

    {/*   <ZipSongs/> */}
    </div>
    </>

  )
}

export default Download