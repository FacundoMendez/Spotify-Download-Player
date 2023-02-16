
const fs = require('fs');
const axios = require('axios') 
const ytdl = require('ytdl-core');
const ytsr = require('yt-search')



async function getPlaylistTracksSP(accessToken, playlistId) {
    const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return response.data.tracks.items;
}

async function playlistToTxt(playlistLink, accessToken) {

    const playlist = playlistLink.split("/");
    const playlistId = playlist[playlist.length - 1];


    const tracks = await getPlaylistTracksSP(accessToken, playlistId);

    let songNames = [];
    for (let track of tracks) {
        songNames.push(`${track.track.name} - ${track.track.artists[0].name}`);
    }

    // const songsText = songNames.join("\n");
    
    return songNames;

}

async function downloadSongFromYT(videoURL){       
    
    ytdl.getBasicInfo(videoURL)
        .then(info => {
            // console.log(videoURL);
            const options = {filter: "audioonly", quality: "highestaudio"}
            const stream = ytdl(videoURL, options);
            const title = info.videoDetails.title.replace(/[&/#,+()$~%.'":*?<>{}|]/g, ' - ');
            // console.log(title.replace(/[&/#,+()$~%.'":*?<>{}|]/g, '-'));
            const fileStream = fs.createWriteStream( `../client/public/songs/${title}.mp3`); // => guardar en una carpeta zip 
            stream.pipe(fileStream);    
            termino === true
        })
        .catch(err => {
          console.error('Error getting video info:', err);
        });
  
      
}

async function getVideoURL( songName ){

    const info = await ytsr( songName );
    const url = info.all[0].url;
    return url;
    
}

    
module.exports = {
    playlistToTxt, downloadSongFromYT, getVideoURL
};



