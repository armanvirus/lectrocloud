import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login"
import SignUp from "./pages/SignUp"
import MainHome from "./pages/MainHome"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import AddPost from "./pages/AddPost"
import "./App.css"

function App() {

  return (
    <div className="App">
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
        
        {/* <Route path="/*" element={<ErrorNotFound />} /> */}
      </Routes>
      </Router>
      {/* <Login/> */}
    </div>
  )
}

export default App
