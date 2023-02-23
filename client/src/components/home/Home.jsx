import React  from 'react'
import TransitionPages from '../assets/transitions/TransitionPages.jsx'
import Download from './download/Download.jsx'
import "./home.css"

const Home = () => {


  return (
    <div className='home'>
        <TransitionPages/>
        <Download/>
        <div className="flare"></div>
    </div>
  )
}

export default Home