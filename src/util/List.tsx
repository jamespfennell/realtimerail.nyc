import React from 'react'
import './List.css'

export function ListElement(props: any) {
  return (
    <div className={"ListElement" + (props.className ? " " + props.className : "")}>
      {props.children}
    </div>
  )
}

export function List(props: any) {
  return (
    <div className={"List" + (props.className ? " " + props.className : "")}>
      {props.children}
    </div>
  )
}
