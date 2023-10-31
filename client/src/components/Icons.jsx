import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

const Icons = ({icon}) => {
  const style = {
    fontSize:"30px",
    marginRight:"5px"
  }
  switch(icon){
    case "back":
    return(<KeyboardBackspaceIcon style={style}/>)
    break;
    case "comment":
    return(<ChatBubbleOutlineIcon style={style}/>)
    break;
    case "like":
    return (<FavoriteBorderOutlinedIcon style={style}/>)
    break;
    case "home":
    return (<HomeOutlinedIcon style={style}/>)
    break;
    case 'school':
    return(<SchoolOutlinedIcon style={style}/>)
    break;
    case 'profile':
    return (<PermIdentityOutlinedIcon style={style}/>)
    break;
    case 'image':
    return(<LandscapeOutlinedIcon />)
    break;
    case 'file':
    return(<PictureAsPdfOutlinedIcon />)
    break;
    case 'light':
    return(<BoltOutlinedIcon />)
    break;
  }
}

export default Icons
