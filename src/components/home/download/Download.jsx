import React, { useEffect , useRef} from 'react'
import playlistToTxt from '../../api/playlist'
import Nav from '../../nav/Nav'


const Download = () => {
  
  const handleClick = (e) => {
    e.preventDefault()

    const playlistLink = e.target.inputPlaylist.value;

    playlistToTxt( playlistLink );

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
    </div>
    </>

  )
}

export default Download