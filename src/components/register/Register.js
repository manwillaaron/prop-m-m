import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Register.css";
import { connect } from "react-redux";
import { register } from "../../dux/reducers/userDux";

function Register(props) {
  let [input, setInput] = useState({
    first: "",
    last: "",
    phone: "",
    email: "",
    password: "",
    passCheck: ""
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  }
  console.log(input);

  const register = () => {
    const { first, last, phone, email, password, passCheck } = input;
    props
      .register(first, last, phone, email, password, passCheck)
      .then(res => {
        props.history.push("/dash");
        setInput({
          first: "",
          last: "",
          phone: "",
          email: "",
          password: "",
          passCheck: ""
        });
      })
      .catch(err => alert("unable to create an account"));
  };

  useEffect(() => {
    if (props.user) {
      props.history.push("/dash");
    }
  }, []);

  return (
    <div>
      <h1>Register</h1>
      <section id="login-container">
        <input
          onChange={e => handleChange(e)}
          placeholder="First name"
          value={input.first}
          name="first"
        />
        <input
          onChange={e => handleChange(e)}
          placeholder="Last name"
          value={input.last}
          name="last"
        />
        <input
          onChange={e => handleChange(e)}
          placeholder="Phone number"
          value={input.phone}
          name="phone"
        />
        <input
          onChange={e => handleChange(e)}
          placeholder="Email"
          value={input.email}
          name="email"
        />
        <input
          onChange={e => handleChange(e)}
          placeholder="password"
          value={input.password}
          name="password"
        />
        <input
          onChange={e => handleChange(e)}
          placeholder="Re enter password"
          value={input.passCheck}
          name="passCheck"
        />
        <Link>
          <button onClick={() => register()}>Submit</button>
        </Link>
      </section>
    </div>
  );
}

export default withRouter(connect(null, { register })(Register));
