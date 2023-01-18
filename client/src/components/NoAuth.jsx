import React from 'react'
import { Link } from 'react-router-dom';

export default function NoAuth() {
    return (
        <div className="no-auth">
            <div className="no-auth-icon-layer">
                <span className="material-symbols-outlined">
                    bolt
                </span>
            </div>
            <div className="no-auth-content">
                <div>
                    <span className="material-symbols-outlined">
                        {/* priority_high */}
                        warning
                    </span>
                    <span>device is not loged</span>
                </div>
                <div>
                    <p>Please get loged to get full access</p>
                    <Link to="/login">login</Link>
                    <Link to="/signup">signup</Link>
                </div>
            </div>
            
        </div>
    )
}
