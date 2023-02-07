
import axios from "axios";

const spotifyClient = (playlistLink , UserAccessToken) => {

    const clientId = "f6054b65cf3d47c5b29c0fa87e7873be";
    const clientSecret = "edadfce757b7424483186c4aa08aedd3";
    const redirectUri = "http://localhost:5173/home";
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
        const playlistId = playlist[playlist.length -1];
        

        const tracks = await getPlaylistTracks(accessToken, playlistId);

        let songNames = [];
        for (const track of tracks) {
            songNames.push(`${track.track.name} - ${track.track.artists[0].name}`);
        }

        const songsText = songNames.join("\n");

        console.log(songsText);
        
    }

    playlistToTxt()

}


export default spotifyClient;