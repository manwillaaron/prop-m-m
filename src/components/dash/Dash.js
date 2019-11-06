import React, { useState, useRef, useEffect } from "react";
// import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import "./Dash.css";
import { getProperties } from "../../dux/reducers/propertyDux";

function Dash(props) {
  props.getProperties()
  // let [properties, setAll] = useState([]);
  useEffect(() => {
    console.log(props);
    
    // setAll((properties = props.properties));
  }, []);

  // let proper = properties.map(prop => (
  //   <div key={prop.id}>
  //     <h1>{prop.address}</h1>
  //     <img src={prop.picture} alt="house" />
  //   </div>
  // ));
  return (
    <div>
      this is the dash
      {/* {proper} */}
      {/* <Link>Expenses</Link> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    properties: state.properties,
    user: state.user.user
  }
}

export default connect(
  mapStateToProps,
  { getProperties }
)(Dash);
