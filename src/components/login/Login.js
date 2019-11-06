import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Login.css";

import { connect } from "react-redux";
import { login } from "../../dux/reducers/userDux";
import { updateEmail, updatePassword } from "../../dux/reducers/editDux";

function Login(props) {
    
    function login() {
        console.log(props);
    props.login(props.email, props.password)
      .then( res => {props.history.push('/dash')})
      .catch(err => alert("username or password not found"));
  }
  return (
    <div>
      <input
        onChange={e => props.updateEmail(e.target.value)}
        placeholder="email"
      />
      <input
        onChange={e => props.updatePassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => login()}>Login</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.user,
    email: state.editing.editEmail,
    password: state.editing.editPassword
  };
}

export default withRouter(connect(
  mapStateToProps,
  { login, updateEmail, updatePassword }
)(Login));
