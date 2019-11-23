import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Dash.css";
import { getProperties } from "../../dux/reducers/propertyDux";
import Property from "../property/Property";

const Dash = props => {
  const [addHouse, toggleForm] = useState(false);
  const allProperties = async () => {
    await props.getProperties();
  };

  useEffect(() => {
    if (props.user.id < 1) props.history.push("/login");
  });

  useEffect(() => {
    allProperties();
  }, []);

  return (
    <div>
      {addHouse ? (
        <>
          <section className="add-property-form">
            <input placeholder="address" />
            <input placeholder="image url" />
            <div>
              <button>Submit new Property</button>
              <button onClick={() => toggleForm(!addHouse)}>Cancel</button>
            </div>
          </section>
          {props.properties.map((prop, i) => (
            <Property key={i} prop={prop} addHouse={addHouse} />
          ))}
        </>
      ) : (
        <>
          <button onClick={() => toggleForm(!addHouse)}>Add Property</button>
          <input placeholder="Search" />

          {props.properties.map((prop, i) => (
            <Property key={i} prop={prop} />
          ))}
        </>
      )}
      
    </div>
  );
};

function mapStateToProps(state) {
  return {
    properties: state.properties.properties,
    user: state.user.user
  };
}

export default withRouter(connect(mapStateToProps, { getProperties })(Dash));
