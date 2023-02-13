
import axios from "axios";
// import youtubeDL from 'youtube-dl-exec';
// import AdmZip from 'adm-zip';
// import fs from 'fs-extra';


const spotifyClient = (playlistLink, UserAccessToken) => {

    // const clientId = "f6054b65cf3d47c5b29c0fa87e7873be";
    // const clientSecret = "edadfce757b7424483186c4aa08aedd3";
    // const redirectUri = "http://localhost:5173/home";
    const accessToken = UserAccessToken;


    async function getPlaylistTracks(accessToken, playlistId) {
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

    async function playlistToTxt() {

        const playlist = playlistLink.split("/");
        const playlistId = playlist[playlist.length - 1];


        const tracks = await getPlaylistTracks(accessToken, playlistId);

        let songNames = [];
        for (const track of tracks) {
            songNames.push(`${track.track.name} - ${track.track.artists[0].name}`);
        }

        const songsText = songNames.join("\n");

        console.log(songsText);

        downloadPlaylistZip( songNames );

    }

    const downloadMusic = async (url, filename) => {
        const args = ['-x', '--audio-format', 'mp3', '-o', filename, url];
        await youtubeDL(args);
      };



    const downloadPlaylistZip = (playlist) => {
        if (playlist.length === 1) {
            downloadMusic(playlist[0].url, `${playlist[0].title}.mp3`);
        } else {
            const zip = new AdmZip();
            playlist.forEach((song) => {
                const tempFile = `temp-${song.title}.mp3`;
                downloadMusic(song.url, tempFile);
                zip.addLocalFile(tempFile);
            });
            zip.writeZip(`playlist.zip`);
        }
    };

    playlistToTxt();

}





export default spotifyClient;