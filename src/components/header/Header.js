import React from "react";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../dux/reducers/userDux";

function Header(props) {
  function userCheck() {
    if (!props.user || !props.user.id) {
      props.history.push("/login");
    }
  }
  return (
    <div className="header">
      <button
        className="link"
        onClick={() => userCheck()}
        style={{ position: "absolute", top: "5px", fontSize: "11px" }}
      >{`<<< previous page`}</button>
      <h1 className="title">expenses</h1>
      <nav>
        {window.location.hash !== "#/login" &&
        window.location.hash !== "#/signup" ? (
          <>
            <button
              className="link"
              onClick={() =>
                props.logout().then(res => props.history.push("/login"))
              }
            >
              Sign Out
            </button>
            <Link to="/expenses">All Expense</Link>
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Header)
);
