import axios from "axios";

const initialState = {
  userExpenses: [],
  propertyExpenses: []
};

const GET_USER_EXPENSES = "GET_USER_EXPENSES";

export default function expenseDux(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_EXPENSES + "_FULFILLED":
      return { ...state, userExpenses: payload };
    default:
      return state;
  }
}

export function getUserExpenses() {
  let data = axios.get("/api/expenses").then(res => res.data);
  return {
    type: GET_USER_EXPENSES,
    payload: data
  };
}
