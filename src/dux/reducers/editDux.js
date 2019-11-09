import { EDITING_EMAIL, EDITING_PASSWORD } from "../action";

const initialState = {
  editEmail: "",
  editPassword: ""
};

export default function editDux(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case EDITING_EMAIL:
      return { ...state, editEmail: payload };
    case EDITING_PASSWORD:
      return { ...state, editPassword: payload };
    default:
      return state;
  }
}

export function updateEmail(email) {
  return {
    type: EDITING_EMAIL,
    payload: email
  };
}

export function updatePassword(password) {
  return {
    type: EDITING_PASSWORD,
    payload: password
  };
}
