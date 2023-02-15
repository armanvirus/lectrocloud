import { useState } from 'react'
import ContextProvider from "./context/provider"
import Routing from './utils/Routing';
import "./App.css"


function App() {

  return (
    <div className="App">
    <ContextProvider>
      <Routing/>
      </ContextProvider>
    </div>
  )
}

export default App
