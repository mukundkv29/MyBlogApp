import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () =>{
    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
      </header>
    );
}

export default Header;