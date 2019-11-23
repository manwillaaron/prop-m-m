import React, { useEffect, useState } from "react";
import "./PropExpense.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getMonthPropExpenses } from "../../dux/reducers/expenseDux";
import Buttons from "./Buttons";
import AddExpense from "./AddExpense";

function PropExpenses(props) {
  const [addExpense, toggleForm] = useState(false);
  async function getFilteredProperties(month, year) {
    await props.getMonthPropExpenses(props.match.params.propId, month, year);
  }

  useEffect(() => {
    getFilteredProperties("todays", "date");
  }, []);

  useEffect(() => {}, []);

  let total = props.expenses.reduce((acc, ex) => {
    let amount = ex.amount.slice(1, ex.amount.length - 1);
    return Math.round((acc += +amount));
  }, 0);

  const totalLength = total.toString().length;

  if (totalLength > 3) {
    total = total.toString();
    total =
      total.slice(0, totalLength - 3) + "," + total.slice(totalLength - 3);
  }

  return (
    <div>
      {addExpense ? <AddExpense toggleForm={toggleForm}/> : null}
      <div id={addExpense ? "property-expense-container" : null}>
        <button onClick={() => toggleForm(!addExpense)}>Add an Expense</button>
        <Buttons getFilteredProperties={getFilteredProperties} />
        {props.loading ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <section>
              <label>Monthly total:</label>
              <h4></h4>
            </section>
            {props.expenses.map(ex => (
              <div id="item-container" key={ex.id}>
                <section>
                  <label>Store:</label>
                  <p>{ex.store}</p>
                </section>
                <section>
                  <label>Amount:</label>
                  <p>{ex.amount}</p>
                </section>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    expenses: state.expenses.propertyExpenses,
    uExpenses: state.expenses.userExpenses,
    loading: state.expenses.loading
  };
}

export default withRouter(
  connect(mapStateToProps, { getMonthPropExpenses })(PropExpenses)
);
