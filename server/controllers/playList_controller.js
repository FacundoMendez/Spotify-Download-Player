
const { response, request } = require('express');
const { playlistToTxt, downloadSongFromYT, getVideoURL } = require('../service/playlist');


const downloadPlaylist = async (req, res = response) => {
    
    const playlistSongs = await playlistToTxt(req.body.link, req.body.token);
    
    // for( const song of playlistSongs ){
    //     let url = await getVideoURL(song);        
    //     await downloadSongFromYT(url);
    // } 

    res.json({
        msg: 'Playlist Obtenida',
        playlistSongs
    })
}



const ytDownload = async (req, res = response) => {
    
    await downloadSongFromYT(req.body.link);
    
    res.json({
        msg: 'descargado',
        
    })
}

const ytSearch = async (req, res = response) => {
    
    const info = await getVideoURL(req.body.link);
    
    res.json({
        msg: 'descargado',        
        info
    })
}


module.exports = {
    downloadPlaylist, ytDownload, ytSearch
};