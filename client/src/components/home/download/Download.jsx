import axios from "axios";
import gsap, { Power4 } from "gsap";
import React, { useEffect, useState } from 'react';
import Errors from '../../assets/Errors/Errors';
import Load from "../../assets/load/Load";
import Nav from '../../nav/Nav';


const Download = () => {


  //aca se guardan los errores 

  const [getError , setError] = useState("")

  /* loader download*/

  const [loader, setLoader] = useState()


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

    const [downloadActive , setDownloadActive] = useState(false)

  const handleClick = (e) => {
      e.preventDefault()

      const playlistLink = e.target.inputPlaylist.value;
      //spotifyClient( playlistLink , UserAccessToken);
      
      //downloadPlaylist(playlistLink, UserAccessToken);

      setLoader(true)

      axios.post("http://localhost:3000/playlist",{ 
          link: playlistLink, 
          token: UserAccessToken
        })
        .then(function (response) {
          setLoader(false)
          setDownloadActive(true)
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

  const [inputVacio , setInputVacio] = useState(true)

  function validarInput() {
    const input = document.getElementById('playlistId');
    const valorInput = input.value;

      // Verificar si el valor del input es válido
      if (valorInput.trim() === '') {
        setError("Por favor ingrese un valor en el input.")

        setTimeout(() => {
          setError("")
        }, 4300);

        setInputVacio(true)

        return false;
      }else{
        setInputVacio(false)
      }

      // Si el valor del input es válido, ejecutar la función descargarArchivo()
      descargarArchivo();
  }


  useEffect(() =>{

    gsap.from([".titleDownload", ".subtitleDownload", ".boxForm" ], 1.3, {
      delay:.3,
      y: 87,
      opacity:0,
      ease:Power4.easeInOut,
      stagger:{amount: .9}
    })

  },[setLoader])

  return (
    <>
      <Nav/>
      <Errors getError={getError} />

      <div className="boxDownload">
        <div className="boxTitles">
          <h2 className='titleDownload'>Your PlayList <span>/</span>  song from <strong>Spotify</strong> </h2>
        </div>
        <div className="boxSubTitles">
          <p className='subtitleDownload'>Paste the URL of your <strong>Spotify</strong>  PlayList <span>/</span> song and start your download</p>
        </div>
        
    
        <div className="boxForm">
          <form className="box_contact_main" onSubmit={(handleClick)}>
              <input id='playlistId' name='inputPlaylist'  type="text"  placeholder='url' />
            
              <select name="typeSong" id="typeSong" value={typeSong} onChange={handleChange}>
                <option className='option' value="mp3">.mp3</option>
                <option className='option' value="wave">.wave</option>
              </select>

              {
                loader && !inputVacio ? 
                  <div className=" sendContact_main-loader" > <Load/> </div>
                :
                downloadActive ? 

                  <button className="sendContact_main"  > 
                    <svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>download</title> <path d="M18.313 13.625h-4.031v-6.594c0-0.563-0.469-1.031-1.031-1.031h-4.031c-0.594 0-1.063 0.469-1.063 1.031v6.594h-4.031c-0.531 0-0.719 0.344-0.313 0.75l6.688 6.656c0.188 0.188 0.438 0.281 0.719 0.281s0.563-0.094 0.75-0.281l6.656-6.656c0.375-0.406 0.25-0.75-0.313-0.75zM0 18.344v7.125c0 0.313 0.156 0.5 0.5 0.5h21.375c0.344 0 0.531-0.188 0.531-0.5v-7.125c0-0.313-0.25-0.531-0.531-0.531h-2.031c-0.281 0-0.531 0.25-0.531 0.531v4.531h-16.25v-4.531c0-0.313-0.219-0.531-0.5-0.531h-2.063c-0.281 0-0.5 0.25-0.5 0.531z"></path> </g></svg>
                  </button>
                :
                  <button className="sendContact_main" onClick={validarInput} type="submit" > Send</button>
              }
   
          </form>
        </div>
      </div>
    </>

  )
}

export default Download