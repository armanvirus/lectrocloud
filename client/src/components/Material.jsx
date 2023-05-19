import {bgs} from "../utils/randomBgs"
import moment from "moment"
export default function Material(props) {
    const genRndBg = ()=>{
        return Math.floor(Math.random() * bgs.length)
    }
    console.log(bgs[genRndBg()])
    return (
        <>
        {props.data.map((el,index)=>{
            return(<div className="single-material">
            {/* author of the material and date added */}
              <div className="material-author">
                  <div className="author-img">
                      <img src="" alt=""/>
                  </div>
                  <div className="author-name-date">
                  <span>{el.user.name}</span>
                  <span>{moment(el.user.lightOn).startOf('minute').fromNow()}</span>
                  </div>
              </div>
              {/* the material identifier */}
              <div className="material-identifier">
                  <div className="material-avatar">
                      <div> <span> PDF </span></div>
                  </div>
                  <div className="title-and-size">
                      <div>{el.material.title}</div>
                      <span>{el.material.size}</span>
                  </div>
              </div>
              {/* a divider line */}
              {/* <div className="material-divider-line"></div> */}
              {/* the reactions buttons */}
              <div className="material-reactions">
              <div><span className="material-symbols-outlined">favorite</span></div>
              <div><span className="material-symbols-outlined">mode_comment</span></div>
              <div><span className="material-symbols-outlined">share</span></div>
              <div><span className="material-symbols-outlined">download</span></div>
              </div>
              
            </div>)
        })}
      </>
    );
  }