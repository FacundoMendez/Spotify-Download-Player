
const axios = require('axios') 
const ytdl = require('ytdl-core');
const fs = require('fs');



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
    for (const track of tracks) {
        songNames.push(`${track.track.name} - ${track.track.artists[0].name}`);
    }

    const songsText = songNames.join("\n");
    
    return songNames;

}

async function downloadFromYT(videoURL){
    
    // ytdl(videoURL)
    //     .pipe(fs.createWriteStream('video.mp4'));
    const stream = ytdl(videoURL, { format: 'bestaudio[ext=wav]' });
    const file = fs.createWriteStream('cancionGucciFaka.wav');
    stream.pipe(file);        
  
    
}

    
module.exports = {
    playlistToTxt, downloadFromYT
};



