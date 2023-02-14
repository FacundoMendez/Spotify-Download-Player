
const { response, request } = require('express');
const { playlistToTxt, downloadFromYT } = require('../service/playlist');


const obtainPlaylist = async (req, res = response) => {
    
    const info = await playlistToTxt(req.body.link, req.body.token);

    console.log(info);

    res.json({
        msg: 'Playlist Obtenida',
        info
    })
}



const ytDownload = async (req, res = response) => {
    
    const info = await downloadFromYT(req.body.link);
    
    res.json({
        msg: 'descargado',
        info
    })
}


module.exports = {
    obtainPlaylist, ytDownload
};