import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./TotalExpenses.css";
import { getUserExpenses } from "../../dux/reducers/expenseDux";

function TotalExpenses(props) {
  const get = async () => {
    await props.getUserExpenses();
  };

  useEffect(() => {
    get();
  }, []);

  const total = props.expenses.reduce((acc, ex) => {
    let amount = ex.amount.slice(1, ex.amount.length - 1);
    return (acc += +amount);
  }, 0);

  return (
    <div>
      <h1> Total Spent: {total}</h1>
      {props.expenses.map(ex => (
        <div id='item-container' key={ex.id}>
            <section>
                <label>Store:</label><p>{ex.store}</p>
            </section>
            <section>
                <label>Amount:</label><p>{ex.amount}</p>
            </section>
            <hb />
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    expenses: state.expenses.userExpenses
  };
}

export default connect(
  mapStateToProps,
  { getUserExpenses }
)(TotalExpenses);
