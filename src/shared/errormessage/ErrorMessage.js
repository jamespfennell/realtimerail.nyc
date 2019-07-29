import React from "react";
import './ErrorMessage.css'


export default function ErrorMessage(props) {
  return (
    <div className="ErrorMessage">
      <div>{props.children}</div>
      <div className="tryAgain" onClick={props.tryAgainFunction}>try again</div>
    </div>
  )
}

