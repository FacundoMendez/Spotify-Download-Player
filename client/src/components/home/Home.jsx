import React, { useEffect } from 'react'
import Download from './download/Download.jsx'
import "./home.css"
import gsap from "gsap"
import { Power4 } from 'gsap'

const Home = () => {

    useEffect(() =>{
      gsap.from(".home", 0.7, {
        delay:.3,
        opacity:0,
        ease:Power4.easeInOut,
        stagger:{amount: .9}
      })

    },[])

  return (
    <div className='home'>
        <Download/>
        <div className="flare"></div>
    </div>
  )
}

export default Home