import React from "react";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../dux/reducers/userDux";

function Header(props) {
  return (
    <div className="header">
      <h1 className="title">expenses</h1>
      <nav>
        
        {window.location.hash !== "#/login" &&
        window.location.hash !== "#/signup" ? (
          <>
          <a
            onClick={() =>
              props.logout().then(res => props.history.push("/login"))
            }
            >
            Sign Out
          </a>
          <Link to='/expenses'>All Expense</Link>
            </>
        ) : window.location.hash === "#/login" ? (
          <Link to="/signup">Register</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}

function mapStateToProps(state){
  return {user: state.user}
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Header)
);
