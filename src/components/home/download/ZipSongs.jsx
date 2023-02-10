/* import React, { useState, useEffect } from 'react';
import ytdl from 'ytdl-core';
import fs from 'fs-extra';


const ZipSongs = () => {
    const [songs, setSongs] = useState([]);
    const [zipFile, setZipFile] = useState(null);
  
    const downloadMusic = async (url, filename) => {
      const stream = ytdl(url, { filter: 'audioonly' });
      const output = fs.createWriteStream(filename);
      stream.pipe(output);
    };
  
    const downloadSongs = async () => {
      for (const song of songs) {
        await downloadMusic(song.url, song.title + '.mp3');
      }
    };
  
    const handleDownload = async () => {
      if (songs.length === 1) {
        await downloadMusic(songs[0].url, songs[0].title + '.mp3');
      } else {
        // ... aquí puedes agregar la lógica para crear y descargar un archivo ZIP con todas las canciones
      }
    };
  
    return (
      <div>
        <button onClick={handleDownload}>Descargar</button>
      </div>
    );
  };
export default ZipSongs */