import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/erroPage.css"

// export default function NoAuth() {
//     return (
//         <div className="no-auth">
//             <div className="no-auth-icon-layer">
//                 <span className="material-symbols-outlined">
//                     bolt
//                 </span>
//             </div>
//             <div className="no-auth-content">
//                 <div>
//                     <span className="material-symbols-outlined">
//                         {/* priority_high */}
//                         warning
//                     </span>
//                     <span>device is not loged</span>
//                 </div>
//                 <div>
//                     <p>Please get loged to get full access</p>
//                     <Link to="/login">login</Link>
//                     <Link to="/signup">signup</Link>
//                 </div>
//             </div>
            
//         </div>
//     )
// }

export default function NoAuth() {
    return (
        <div className="no-auth">
        <div className="auth-err-card"> 
  <div className="header"> 
    {/* <div class="image">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </div>  */}
      <div className="content">
         <span className="title">You are not authorized</span> 
         <p className="message">this feature is only allowed for loged in users</p> 
         </div> 
         <div className="actions">
            <Link className="actions-btns" to="/login">login</Link>
            <Link className="actions-btns" to="/signup">signup</Link>
            </div> 
            </div> 
            </div>
            </div>
    )
}
