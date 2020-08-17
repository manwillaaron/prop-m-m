import React, { useEffect, useState } from "react";
import { getMonthPropExpenses } from "../../dux/reducers/expenseDux";
import { connect } from "react-redux";
import "./Buttons.css";

function Buttons({ getFilteredProperties }) {
  let date = new Date();
  let monthA = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const [yearsIncDec, updateYears] = useState(0);
  let [yearHi, setYear] = useState(date.getFullYear());
  let [monthHi, setMonth] = useState(monthA[date.getMonth()]);
  let years = [...Array(30)]
    .map((el, i) => i + 1999)
    .filter(
      (el, i) =>
        el <= date.getFullYear() - yearsIncDec &&
        el > date.getFullYear() - yearsIncDec - 10
    );

  return (
    <div className="month-buttons">
      <main className="filter-container">
        <div>
          <h5>Filter Results</h5>
          {monthA.map(mth => (
            <button
              className="button-cont"
              key={mth}
              onClick={() => {
                setMonth(mth);
                setYear(yearHi);
                getFilteredProperties(mth, yearHi);
              }}
              id={monthHi === mth ? "highlightedButton" : null}
            >
              {mth}
            </button>
          ))}
        </div>
        <br />
        <div>
          {years.map(yr => (
            <button
              className="button-cont"
              key={yr}
              onClick={() => {
                setYear(yr);
                setMonth(monthHi);
                getFilteredProperties(monthHi, yr);
              }}
              id={yearHi === yr ? "highlightedButton-yr" : null}
            >
              {yr}
            </button>
          ))}
        </div>
        <section className="year-inc-dec">
          <button
            className="button-cont"
            onClick={() => updateYears(yearsIncDec + 5)}
          >{`\<\<\<`}</button>
          <button
            className="button-cont"
            onClick={() => updateYears(yearsIncDec - 5)}
          >
            >>>
          </button>
        </section>
      </main>
    </div>
  );
}

export default connect(null, { getMonthPropExpenses })(Buttons);
