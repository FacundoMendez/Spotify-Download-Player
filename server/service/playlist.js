
const fs = require('fs');
const axios = require('axios') 
const ytdl = require('ytdl-core');
const ytsr = require('yt-search')

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
    const playlistId = playlist[playlist.length - 1];


    const tracks = await getAllPlaylistTracksSP(accessToken, playlistId);

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
            const fileStream = fs.createWriteStream( `./downloads/${title}.mp3`);
            stream.pipe(fileStream);    

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



