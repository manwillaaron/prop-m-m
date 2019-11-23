import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
import { login } from "../../dux/reducers/userDux";
import { updateEmail, updatePassword } from "../../dux/reducers/editDux";
import Swal from 'sweetalert2'

function Login(props) {
  useEffect(() => {
    if (props.user.id > 0) {
      props.history.push("/dash");
    }
  }, []);

  const login = () => {
    props
      .login(props.email, props.password)
      .then(res => {
        props.history.push("/dash");
      })
      .catch(err => Swal.fire(err.response.data));
  };
  return (
    <div className="login-back">
      <div>
        <section id="login-container">
        <h1>Login</h1>
          <input
            onChange={e => props.updateEmail(e.target.value)}
            placeholder="email"
          />
          <input
            onChange={e => props.updatePassword(e.target.value)}
            placeholder="password"
          />
          <button onClick={() => login()}>Login</button>
        </section>
      </div>
      <div />
      <div />
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
  connect(mapStateToProps, { login, updateEmail, updatePassword })(Login)
);
