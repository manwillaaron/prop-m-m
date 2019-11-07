import React, {useEffect} from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Login.css";

import { connect } from "react-redux";
import { login } from "../../dux/reducers/userDux";
import { updateEmail, updatePassword } from "../../dux/reducers/editDux";

function Login(props) {
  useEffect(()=>{
    console.log(props);
    if(props.user.id > 0) {
      props.history.push('/dash')}
  },[])

  const login = () => {
    props
      .login(props.email, props.password)
      .then(res => {
        props.history.push("/dash");
      })
      .catch(err => alert("username or password not found"));
  };
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
    user: state.user.user,
    email: state.editing.editEmail,
    password: state.editing.editPassword
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { login, updateEmail, updatePassword }
  )(Login)
);
