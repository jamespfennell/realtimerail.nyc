import React from 'react';

import './Header.css'
export function Header(props) {

  return (
    <div className="Header">{props.children}</div>
  )
}