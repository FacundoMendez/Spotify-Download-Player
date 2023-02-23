import React, { useEffect } from 'react'
import gsap from "gsap"
import { Power4 } from 'gsap'

const TransitionPages = () => {

    useEffect(() =>{

        gsap.to(".colorPalet", 1.7, {
          delay:.3,
          top:"100%",
          ease:Power4.easeInOut,
          /* stagger:{amount: .9} */
        })
  
        gsap.to(".colorPalet2", 1.7, {
          delay:.5,
          top:"100%",
          ease:Power4.easeInOut,
          /* stagger:{amount: .9} */
        })
  
    
  
    },[])

  return (
    <>
        <div className="colorPalet"></div>
        <div className="colorPalet2"></div>
    </>
  )
}

export default TransitionPages