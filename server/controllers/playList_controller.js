
const { response, request } = require('express');
const { 
    playlistToTxt, 
    downloadSongFromYT, 
    getVideoURL, 
    comprimirCarpeta, 
    eliminarContenidoSongs } = require('../service/playlist');


const downloadPlaylist = async (req, res = response) => {
    
    const playlistSongs = await playlistToTxt(req.body.link, req.body.token);
    const errors = [];

    for( const song of playlistSongs ){
        try{
            let url = await getVideoURL(song);        
            await downloadSongFromYT(url);
        } catch ( err ){
            errors.push(err, song);
        }
    } 

    //comprimirCarpeta('songs', '../client/public/songs');

    res.json({
        msg: 'Playlist Obtenida',
        playlistSongs,
        songsErrors : errors
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

const comprimir = async (req, res = response) => {
    console.log('controler before');
    comprimirCarpeta('songs.zip');    
    console.log('controler after');
    
    res.json({
        msg: 'comprimido',        
    })
}


const eliminarSongs = async (req, res = response) => {
    eliminarContenidoSongs();
    res.json({
        msg: 'elimandooo',        
    })
}


module.exports = {
    downloadPlaylist, ytDownload, ytSearch, comprimir, eliminarSongs
};