const { downloadPlaylist, ytDownload, ytSearch, comprimir, eliminarSongs } = require("./controllers/playList_controller")
let cors = require("cors");

const express = require("express");
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});



app.use(express.json());
app.use(cors());

app.post('/playlist', downloadPlaylist);

app.post('/ytdown', ytDownload);

app.post('/ytsearch', ytSearch);

app.post('/comprimirCarpeta', comprimir);

app.post('/eliminarSongs', eliminarSongs);





app.listen(3000)
