import React from 'react'
import  "../InputControl/InputControl.css";

function InputControl(props) {
  return (
      <div className="container1">
          {props.label && <label>{props.label}</label>}
          <input type="text" {...props} />
      </div>
  )
}

export default InputControl