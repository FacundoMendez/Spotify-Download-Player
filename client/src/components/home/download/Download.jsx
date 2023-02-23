import React, {useState ,useEffect} from 'react'
import Nav from '../../nav/Nav'
import axios from "axios";
import gsap, { Elastic } from "gsap"
import { Power4 } from 'gsap'


const Download = () => {

  /* acces token dinamico url */
  const hash = window.location.hash.substr(1);
  const hashParams = hash.split('&').filter(param => param.startsWith('access_token='));
  const UserAccessToken = hashParams[0].split('=')[1];



  /* recuperar el tipo de archivo a descargar mp3 / wave */

  const [typeSong, setTypeSong] = useState("");  // => typeSong contiene el tipo de archivo

  const handleChange = event => {
    setTypeSong(event.target.value);
  };



  /* funcion que llama a playList.js y envia los parametros (access Token y la playlist que se le envia por input) */

  const handleClick = (e) => {
    e.preventDefault()

    const playlistLink = e.target.inputPlaylist.value;
    //spotifyClient( playlistLink , UserAccessToken);
    
    //downloadPlaylist(playlistLink, UserAccessToken);

    axios.post("http://localhost:3000/playlist",
      { 
        link: playlistLink, 
        token: UserAccessToken
      })
      .then(function (response) {
        //handle 
        console.log(response.data);
      })

  }


  /* download file  */

  function descargarArchivo() {
    // Aquí debe proporcionar la URL del archivo que desea descargar.


    const urlArchivo = "../../../../public/songs/music.zip";  // => url del archivo
    const nameArchivo = "Music-Download" // => nombre del archivo
  
    // Crear una solicitud HTTP para obtener el archivo.
    const solicitud = new XMLHttpRequest();
    solicitud.open('GET', urlArchivo, true);
    solicitud.responseType = 'blob';
  
    // Cuando se carga el archivo, crear una URL de objeto de blob y descargar el archivo.
    solicitud.onload = function() {
      if (solicitud.status === 200) {
        const blob = solicitud.response;
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlBlob;
        // Aquí debe proporcionar el nombre que desea darle al archivo.
        a.download = nameArchivo;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(urlBlob);
      }
    };
    solicitud.send();
  }


    /* validacion de input */

  function validarInput() {
    const input = document.getElementById('playlistId');
    const valorInput = input.value;

    // Verificar si el valor del input es válido
    if (valorInput.trim() === '') {
      alert('Por favor ingrese un valor en el input.');
      return false;
    }

    // Si el valor del input es válido, ejecutar la función descargarArchivo()
    descargarArchivo();
  }

  useEffect(() =>{
      gsap.from([".titleDownload", ".subtitleDownload", ".boxForm" ], 1.3, {
        delay:.3,
        y: 67,
        opacity:0,
        ease:Power4.easeInOut,
        stagger:{amount: .9}
      })

    },[])

  return (
    <>
    <Nav/>
    <div className="boxDownload">
      <div className="boxTitles">
        <h2 className='titleDownload'>Your PlayList <span>/</span>  song from <strong>Spotify</strong> </h2>
      </div>
      <div className="boxSubTitles">
       
        <p className='subtitleDownload'>Paste the URL of your Spotify PlayList / song and start your download</p>
        </div>
      
   
      <div className="boxForm">
      <form className="box_contact_main" onSubmit={(handleClick)}>
          <input id='playlistId' name='inputPlaylist'  type="text" required placeholder='url' />
        
          <select name="typeSong" id="typeSong" value={typeSong} onChange={handleChange}>
            <option className='option' value="mp3">mp3</option>
            <option className='option' value="wave">wave</option>
          </select>

          <button className="sendContact_main" onClick={validarInput} type="submit" > Send</button>
        </form>
    
      </div>
    </div>
    </>

  )
}

export default Download