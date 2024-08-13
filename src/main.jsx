import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NavBar from './NavBar.jsx'
import Map from './Map.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>

    
    <NavBar/>
    <Map></Map>
  </StrictMode>,
)
