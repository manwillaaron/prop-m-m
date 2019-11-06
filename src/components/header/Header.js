import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="header">
      <h1 className="title">Rexpenses</h1>
      <nav>
        {window.location.hash !== "#/login" && window.location.hash !== "#/signup" ? (
          <Link to='/login'>Sign Out</Link>
        ) : window.location.hash === "#/login" ? (
          <Link to="/signup">Register</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}
