import React from "react";
import './LoadingBar.css'


export default function LoadingBar() {
  return (
    <div className="LoadingBar">
      <div className="spinner">
        <div className="bounce1"/>
        <div className="bounce2"/>
        <div className="bounce3"/>
      </div>
    </div>
  )

}

