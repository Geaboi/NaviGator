import { useState, createContext } from 'react'
import NavBar from './NavBar.jsx'
import Map from './Map.jsx'

import './App.css'

// Create a new context and export
export const DataContext = createContext();
 
// Create a Context Provider
const DataContextProvider = ({ children }) => {
    const [data, setData] = useState();
 
    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

function App() {

  return (
    <>
    <DataContextProvider>
      <NavBar/>
          <Map></Map>
          <NavBar></NavBar>
    </DataContextProvider>
    </>
  )
}

export default App
