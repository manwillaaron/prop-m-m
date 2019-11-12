import React, { useEffect, useState } from "react";
import "./PropExpense.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMonthPropExpenses } from "../../dux/reducers/expenseDux";

function PropExpenses(props) {
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    let d = new Date();
    let [monthHi, setMonth] = useState(monthNames[d.getMonth()])
  async function getFilteredProperties(month, year) {
      await props.getMonthPropExpenses(props.match.params.propId, month, year);
  }
  
  useEffect(() => {
    getFilteredProperties("todays", "date");
    console.log(props);
  }, []);

  const total = props.expenses.reduce((acc, ex) => {
    let amount = ex.amount.slice(1, ex.amount.length - 1);
    return (acc += +amount);
  }, 0);



  return (
    <div>
      <nav>
        <button
          onClick={e =>{ 
              console.log(e.target.value);
              
            getFilteredProperties('Jan', "2019")
        
        }}
        value='Jan'
          className="month-buttons"
        >
          Jan
        </button>
        <button
          onClick={e => getFilteredProperties('Feb', "2019")}
          className="month-buttons"
          value='Feb'
        >
          Feb
        </button>
        <button
          onClick={e => getFilteredProperties('Mar', "2019")}
          className="month-buttons"
          value='Mar'
        >
          Mar
        </button>
        <button
          onClick={e => getFilteredProperties('Apr', "2019")}
          className="month-buttons"
          value='Apr'
        >
          Apr
        </button>
        <button
          onClick={e => getFilteredProperties('May', "2019")}
          className="month-buttons"
          value='May'
        >
          May
        </button>
        <button
          onClick={e => getFilteredProperties('Jun', "2019")}
          className="month-buttons"
          value='Jun'
        >
          Jun
        </button>
        <button
          onClick={e => getFilteredProperties('Jul', "2019")}
          className="month-buttons"
          value='Jul'
        >
          Jul
        </button>
        <button
          onClick={e => getFilteredProperties('Aug', "2019")}
          className="month-buttons"
          value='Aug'
        >
          Aug
        </button>
        <button
          onClick={e => getFilteredProperties('Sep', "2019")}
          className="month-buttons"
          value='Sep'
        >
          Sep
        </button>
        <button
          onClick={e => getFilteredProperties('Oct', "2019")}
          className="month-buttons"
          value='Oct'
        >
          Oct
        </button>
        <button
          onClick={e => {
              getFilteredProperties('Nov', "2019")
              setMonth(monthHi = 'Nov')  
            }}
          className="month-buttons"
          value='Nov'
          id={monthHi === 'Nov'? 'hilightedButton': null}
          
        >
          Nov
        </button>
        <button
          onClick={e => {
            console.log(e.target.value);
            getFilteredProperties('Dec', "2019")
            setMonth(monthHi = 'Dec')
        }}
          className="month-buttons"
          id={monthHi === 'Dec'? 'hilightedButton': null}
        >
          Dec
        </button>
      </nav>
      <h4>{total}</h4>

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
  );
}

function mapStateToProps(state) {
  return {
    expenses: state.expenses.propertyExpenses
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getMonthPropExpenses }
  )(PropExpenses)
);
