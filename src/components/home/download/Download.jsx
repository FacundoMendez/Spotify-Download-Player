import React from 'react'
import Nav from '../../nav/Nav'

const Download = () => {
  return (
    <>
    <Nav/>
    <div className="boxDownload">
      <h2>Your PlayList <span>/</span>  song from <strong>Spotify</strong> </h2>
      <p>Paste the URL of your Spotify PlayList / song and start your download</p>
    
      <form className="box_contact_main">
        <input type="text" required placeholder='url' />
      
        <button className="sendContact_main" type='submit'>
            Send
        </button>
      </form>
    </div>
    </>

  )
}

export default Download