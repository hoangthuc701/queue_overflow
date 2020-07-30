import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Header = ()=>(
    <>
        <div>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
        </div>
    </>
)
export default Header;