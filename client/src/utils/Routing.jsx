import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import React,{useContext} from 'react';
import Login from "../pages/login"
import SignUp from "../pages/SignUp"
import MainHome from "../pages/MainHome"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import AddPost from "../pages/AddPost"
import Alight from "../pages/Alight"
import Materials from "../pages/Materials"
import NotFound from '../pages/NotFound';
import "../App.css"
import {StateContext} from "../context/provider"
import {getUser} from "./Auths"
import AddResources from "../pages/AddResource"
import Entry from "../pages/Entry";

export default function Routing() {
    const {        
        setisUserloged
    } = useContext(StateContext);

    getUser(setisUserloged);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={ <Entry/> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='main'  element={<MainHome/>}>
          <Route path='home'  index element={<Home/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='light' element={<AddPost/>}/>
          <Route path='addresource' element={<AddResources/>}/>
          <Route path="materials" element={<Materials/>}/> 
        </Route>
          <Route path='/helpers/alight/:id/:lindex' element={<Alight/>}/>   
        
        <Route path="/*" element={<NotFound/> } />
      </Routes>
      </Router>
    </>
  );
}
