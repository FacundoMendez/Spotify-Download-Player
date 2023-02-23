import React, {useEffect} from 'react'
import "./error.css"
import gsap from 'gsap'
import { Power4 } from 'gsap'

const Errors = ({getError}) => {

  const shutError = () => {
    if(getError !== ""){
      const tl  = gsap.timeline()
      tl.to(".boxError",{
        opacity :1 ,
        visibility: "visible",
        duration: .5,
        ease: Power4.easeInOut
      })
      tl.to(".boxError",{
        delay: 3,
        opacity :0 ,
        visibility: "hidden",
        duration: .5,
        ease: Power4.easeInOut

      })
    }
  }

  useEffect(() => {
    shutError()
  },[getError])

  return (
    <div className="boxError">
        {getError}
    </div>
  )
}

export default Errors