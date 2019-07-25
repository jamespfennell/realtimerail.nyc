import React from 'react'

import './ListOfRouteLogos.css'
import RouteLogo from "./RouteLogo";


export default function ListOfRouteLogos(props) {
  let routeLogos = [];
  for (const routeId of props.routeIds) {
    routeLogos.push(
      <div key={routeId}>
        <RouteLogo route={routeId} />
      </div>
    )
  }
  return (

    <div className="ListOfRouteLogos">
      {routeLogos}
    </div>
  )
}

//ListOfRouteLogos.Props = {
//  routeIds: PropTypes.array
//}