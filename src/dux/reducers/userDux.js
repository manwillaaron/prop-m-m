import axios from "axios";
import { REGISTER, LOGIN, LOGOUT } from "../action";

const initialState = {
  user: {},
  loggedIn: false,
  err: false,
  loading: false
};

export function register(first_name, last_name, phone_number, email, password) {
  let data = axios
    .post("/api/register", {
      first_name,
      last_name,
      phone_number,
      email,
      password
    })
    .then(res => {
      return res.data;
    });
  return {
    type: REGISTER,
    payload: data
  };
}
export function login(email, password) {
    console.log(email, password);
    
  let data = axios.post("/api/login", { email, password }).then(res => {
      console.log(res.data);
      
    return res.data;
  })
//   .catch(err => {
//       return res.status(404).send('username or password doesn\'t exist)
//     })
  return {
    type: LOGIN,
    payload: data
  };
}
export function logout() {
  let data = axios.delete("/api/logout").then(res => {
    return res.data;
  });
  return {
    type: LOGOUT,
    payload: data
  };
}

export default function userDux(state = initialState, action) {
  let { payload, type } = action;
  switch (type) {
    case REGISTER + "_PENDING":
      return { ...state, loading: true };
    case REGISTER + "_FULFILLED":
      return { ...state, loading: false, user: payload };
    case REGISTER + "_REJECTED":
      return { ...state, err: true, loading: false };
    case LOGIN + "_PENDING":
      return { ...state, loading: true };
    case LOGIN + "_FULFILLED":
      return { ...state, loading: false, user: payload, loggedIn: true };
    case LOGIN + "_REJECTED":
      return { ...state, err: true, loading: false };
    case LOGOUT + "_PENDING":
      return { ...state, loading: true };
    case LOGOUT + "_FULFILLED":
      return { ...state, loading: false, user: payload, loggedIn: false };
    case LOGOUT + "_REJECTED":
      return { ...state, err: true, loading: false };
    default:
      return state;
  }
}
