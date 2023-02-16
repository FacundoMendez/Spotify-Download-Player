import React, {useState} from 'react'

const NavMusicViewport = ({songs , setCurrentSongIndex, setPlayAudio}) => {

  const audio = document.getElementById("audio")

    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
        setPlayAudio(true);
    };
    
      return (
        <div className="boxNavMusic">
          <ul>
            {
              songs.map((song, index) => {
                return (
                  <li key={index} className="songsList" onClick={() => handleSongClick(index)}>
                    {song.name}
                   <p className='durationSong'>{song.duration}</p>
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    };

export default NavMusicViewport