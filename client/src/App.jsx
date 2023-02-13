import './App.css'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import SpotifyLogin from './components/api/SpotifyLogin'
import Home from './components/home/Home';
import HomeLogin from './components/login/Login';
import Player from './components/home/player/Player';


function App(){    

  return(
   <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SpotifyLogin/>} />  
        <Route exact path="/home:player" element={<Player/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/"  element={<HomeLogin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
