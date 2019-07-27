import React from 'react'
import './List.css'

export function ListElement(props) {
  return (
    <div className={"ListElement" + (props.className ? " " + props.className : "")}>
      {props.children}
    </div>
  )
}

export function List(props) {
  return (
    <div className={"List" + (props.className ? " " + props.className : "")}>
      {props.children}
    </div>
  )
}
