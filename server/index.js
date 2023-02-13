/* 
const express = require("express");
const { obtainPlaylist, ytDownload } = require("./controllers/playList_controller")
let cors = require("cors");


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.post('/playlist', obtainPlaylist);

app.post('/ytdown', ytDownload);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

 */


const express = require("express");
const app = express();
const path = require("path")

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.listen(3000)
