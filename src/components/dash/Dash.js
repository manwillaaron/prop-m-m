import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Dash.css";
import { getProperties } from "../../dux/reducers/propertyDux";
import Property from "../property/Property";

const Dash = props => {
  const allProperties = async () => {
    await props.getProperties();
  };
  
  useEffect(()=>{
    if (props.user.id < 1) props.history.push("/login");
  })
  
  useEffect(() => {
    allProperties();
  },[]);

  return (
    <div>
      {props.properties.map((prop, i) => (
        <Property key={i} prop={prop} />
      ))}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    properties: state.properties.properties,
    user: state.user.user
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getProperties }
  )(Dash)
);
