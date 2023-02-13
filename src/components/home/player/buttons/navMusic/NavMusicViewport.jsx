import React from 'react'

const NavMusicViewport = ({songs}) => {

 return (
    <div className="boxNavMusic">
        <ul>

        {
            songs.map((index, key) => {
                return <li key={key} className="songsList"> {index.name} </li>


            })
        }

        </ul>


    </div>
  )
}

export default NavMusicViewport