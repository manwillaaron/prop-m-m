import React from 'react'

export default function Property(props){
    console.log(props);
    
    return (
        <div >
      <h4>{props.prop.address}</h4>
      <img style={{"height": "100px"}} src={props.prop.img} alt="house" />
    </div>
    )
}