import axios from "axios";

const initialState = {
  userExpenses: [],
  propertyExpenses: [],
  loading: false,
  error: false
};

const GET_USER_EXPENSES = "GET_USER_EXPENSES";
const GET_MONTH_PROP_EXPENSES = "GET_MONTH_PROP_EXPENSES";
const ADD_RECEIPT = "ADD_RECEIPT";

export default function expenseDux(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_EXPENSES + "_FULFILLED":
      return { ...state, userExpenses: payload };
    case GET_MONTH_PROP_EXPENSES + "_PENDING":
      return { ...state, loading: true };
    case GET_MONTH_PROP_EXPENSES + "_FULFILLED":
      return { ...state, propertyExpenses: payload, loading: false };
    case GET_MONTH_PROP_EXPENSES + "_REJECTED":
      return { ...state, error: payload, loading: false };
    case ADD_RECEIPT + "FULFILLED":
      return { ...state, propertyExpenses: payload, loading: false };
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
  let data = axios
    .get(`/api/monthly/expenses/${propId}/${month}/${year}`)
    .then(res => res.data);
  return {
    payload: data,
    type: GET_MONTH_PROP_EXPENSES
  };
}

export function addReceipt(store, description, image, propertyId) {
  let propertyExpenses = axios
    .post(`/api/expense/${propertyId}`, {
      store,
      description,
      image
    })
    .then(res => res.data);
  return {
    payload: propertyExpenses,
    type: ADD_RECEIPT
  };
}
