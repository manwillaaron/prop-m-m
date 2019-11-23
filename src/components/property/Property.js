import React from "react";
import { getMonthPropExpenses } from "../../dux/reducers/expenseDux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Property.css";

function Property(props) {
  return (
    <>
      {props.addHouse ? (
        <div className="property-container">
          <h4>{props.prop.address}</h4>
          <img style={{ height: "100px" }} src={props.prop.img} alt="house" />
          <Link to={`/property/expenses/${props.prop.id}`}>
            See <button>Property's expenses</button>
          </Link>
        </div>
      ) : (
        <div className="property-container-normal">
          <h4>{props.prop.address}</h4>
          <img style={{ height: "100px" }} src={props.prop.img} alt="house" />
          <Link to={`/property/expenses/${props.prop.id}`}>
            See <button>Property's expenses</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default connect(null, { getMonthPropExpenses })(Property);
