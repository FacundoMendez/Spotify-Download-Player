import React , {useState, useEffect} from 'react'

const ProgressBar = () => {

    const audio = document.getElementById("audio");

    const [progress, setProgress] = useState(0);

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleClick = (event) => {
        const clickX = event.pageX;
        const progressBar = event.currentTarget;
        const progressBarRect = progressBar.getBoundingClientRect();
        const progress =((clickX - progressBarRect.left) / progressBarRect.width) * 100;
        audio.currentTime = (audio.duration * progress) / 100;
    };


    useEffect(() => {
   
        if(audio){
            audio.addEventListener("timeupdate", handleTimeUpdate);
        }


        return () => {
            if(audio){
                audio.removeEventListener("timeupdate", handleTimeUpdate);

            }
        };

    }, [audio]);

  return (
    <div className="progress-bar" onClick={handleClick}>
        <div className="progress-bar-fill" style={{ width: `${progress}%`  }} />
    </div>
  )
}

export default ProgressBar