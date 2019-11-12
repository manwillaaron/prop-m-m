import axios from "axios";

const initialState = {
  userExpenses: [],
  propertyExpenses: []
};

const GET_USER_EXPENSES = "GET_USER_EXPENSES";
const GET_MONTH_PROP_EXPENSES = "GET_MONTH_PROP_EXPENSES";

export default function expenseDux(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_EXPENSES + "_FULFILLED":
      return { ...state, userExpenses: payload };
    case GET_MONTH_PROP_EXPENSES + "_FULFILLED":
      return { ...state, propertyExpenses: payload };
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

export function getMonthPropExpenses(propId, month, year) {
  console.log(month, year);
  
  let data = axios
    .get(`/api/monthly/expenses/${propId}/${month}/${year}`)
    .then(res => res.data);
  return {
    payload: data,
    type: GET_MONTH_PROP_EXPENSES
  };
}
