import React from "react"
import {getMonthPropExpenses} from '../../dux/reducers/expenseDux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Property(props) {
  return (
    <div>
      <h4>{props.prop.address}</h4>
      <img style={{ height: "100px" }} src={props.prop.img} alt="house" />
      <Link to={`/property/expenses/${props.prop.id}`} >See Property's expenses</Link>
    </div>
  );
}

export default connect(null, {getMonthPropExpenses})(Property)