import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ContextProvider from "./context/provider"
import Login from "./pages/login"
import SignUp from "./pages/SignUp"
import MainHome from "./pages/MainHome"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import AddPost from "./pages/AddPost"
import Alight from "./pages/Alight"
import "./App.css"
import NotFound from './pages/NotFound';

function App() {

  return (
    <div className="App">
    <ContextProvider>
      <Router>
      <Routes>
        {/* <Route path="/" element={<SignUp/>}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='main'  element={<MainHome/>}>
          <Route path='home'  index element={<Home/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='light' element={<AddPost/>}/> 
        </Route>
          <Route path='/helpers/alight/:id' element={<Alight/>}/>   
        
        <Route path="/*" element={<NotFound/> } />
      </Routes>
      </Router>
      {/* <Login/> */}
      </ContextProvider>
    </div>
  )
}

export default App
