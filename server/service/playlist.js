
const fs = require('fs');
const axios = require('axios')
const ytdl = require('ytdl-core');
const ytsr = require('yt-search')
const archiver = require('archiver');

async function getAllPlaylistTracksSP(accessToken, playlistId) {
  let allTracks = [];
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  while (nextUrl) {
    const response = await axios.get(nextUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = response.data;


    allTracks = [...allTracks, ...data.items];
    nextUrl = data.next;
  }

  return allTracks;
}

async function playlistToTxt(playlistLink, accessToken) {

  const playlist = playlistLink.split("/");
  let playlistSinParams = playlist[playlist.length - 1].split("?");
  const playlistId = playlistSinParams[0];

  const tracks = await getAllPlaylistTracksSP(accessToken, playlistId);

  let songNames = [];
  for (let track of tracks) {
    songNames.push(`${track.track.name} - ${track.track.artists[0].name}`);
  }

  // const songsText = songNames.join("\n");

  return songNames;

}

async function downloadSongFromYT(videoURL) {

  ytdl.getBasicInfo(videoURL)
    .then(info => {
      // console.log(videoURL);
      const options = { filter: "audioonly", quality: "highestaudio" }
      const stream = ytdl(videoURL, options);
      const title = info.videoDetails.title.replace(/[&/#,+()$~%.'":*?<>{}|]/g, ' - ');
      // console.log(title.replace(/[&/#,+()$~%.'":*?<>{}|]/g, '-'));
      const fileStream = fs.createWriteStream(`../client/public/songs/${title}.mp3`); // => guardar en una carpeta zip 
      stream.pipe(fileStream);
    })
    .catch(err => {
      console.error('Error getting video info:', err);
      return 'ytdl Error';
    });


}

async function getVideoURL(songName) {
  try {
    const info = await ytsr(songName);
    const url = info.all[0].url;
    return url;
  } catch (err) {
    return 'ytsr Error'
  }

  // ytsr(songName)
  //   .then( info => {
  //     const url = info.all[0].url;
  //     return url;
  //   })
  //   .catch( err => {
  //     return 'ytsr Error'
  //   });
}


function comprimirCarpeta(nombreArchivoComprimido, rutaCarpeta = '../client/public') {
  console.log('service before');

  // Crea un nuevo objeto Archiver
  const archive = archiver('zip', { zlib: { level: 9 } });  
  // Crea el archivo comprimido
  const output = fs.createWriteStream(rutaCarpeta + '/' + nombreArchivoComprimido);
  archive.pipe(output);

  // Agrega la carpeta a comprimir
  archive.directory(rutaCarpeta+'/songs', false);

  // Evento de error en caso de que ocurra algún problema
  archive.on('error', function (err) {
    throw err;
  });

  // Finaliza la creación del archivo comprimido
  archive.finalize();  
  console.log('service after');
}

function eliminarContenidoSongs(){
  
  folderPath = '../client/public/songs';
  
  // Obtener lista de archivos dentro de la carpeta
  const files = fs.readdirSync(folderPath);

  // Eliminar cada archivo de forma sincrónica
  files.forEach((file) => {
    const filePath = `${folderPath}/${file}`;
    fs.unlinkSync(filePath);
  });
  

}




module.exports = {
  playlistToTxt, downloadSongFromYT, getVideoURL, comprimirCarpeta, eliminarContenidoSongs
};



