import React from 'react'
import { NavLink } from 'react-router-dom'
import "./nav.css"

const Nav = () => {
  return (
    <>
      <header>
        <div className= "nav">
            <ul className="list_nav_mobile">
              <NavLink to="/login"> <li className='list_mobile' > Download  </li></NavLink>
              <NavLink to="/home:player"> <li className='list_mobile' > Player    </li></NavLink>
            </ul>
        </div>
        
      </header>
   </>
  )
}

export default Nav