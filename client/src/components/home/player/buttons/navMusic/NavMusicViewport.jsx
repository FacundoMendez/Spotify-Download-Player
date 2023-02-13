import React from 'react'

const NavMusicViewport = ({songs , setCurrentSongIndex}) => {


    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
      };
    
      return (
        <div className="boxNavMusic">
          <ul>
            {
              songs.map((song, index) => {
                return (
                  <li
                    key={index}
                    className="songsList"
                    onClick={() => handleSongClick(index)}
                  >
                    {song.name}
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    };

export default NavMusicViewport