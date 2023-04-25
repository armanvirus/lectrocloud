import { Link } from "react-router-dom";

const Entry = ()=>{
    return(
        <div className="entry-page">
            <div className="entry-page-main">
                <div>
                    <p className="app-name">
                        lectrocloud
                    </p>
                    <div className="app-phrase">
                        <p>Stay connected and engaged with your campus community</p>
                    </div>
                    <div className="entry-page-btn">
                        <Link to="/main/home">continue with no account</Link>
                    </div>
                    <div className="entry-btn-opt">
                        <Link to="/login">Login</Link> 
                        <span>Or</span>
                        <Link to="/signup">Signup</Link> 

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entry;