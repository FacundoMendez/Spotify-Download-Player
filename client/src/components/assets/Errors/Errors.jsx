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
        right: "1%",
        ease: Power4.easeIn
      })
      tl.to(".boxError",{
        delay: 3,
        opacity :0 ,
        right: "-12%",
        duration: .2,
        ease: Power4.easeOut
      })
      tl.to(".boxError",{
        visibility: "hidden",
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