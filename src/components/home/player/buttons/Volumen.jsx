import React , {useState} from 'react'

const Volumen = () => {
    const [volume, setVolume] = useState(1);
    const audio = document.getElementById("audio");
  

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        audio.volume = event.target.value;
      };
    

  return (
    <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        className = "volumenPlayer"
        value={volume}
        onChange={handleVolumeChange}
    />
  )
}

export default Volumen