import './ListOfRouteLogos.css'
import RouteLogo from "./RouteLogo";
import { Link } from "react-router-dom";


export type ListOfRouteLogosProps = {
  routeIds: string[];
  skipExpress: boolean;
  addLinks: boolean;
}

export default function ListOfRouteLogos(props: ListOfRouteLogosProps) {
  let routeIds = sortRouteIds(props.routeIds);
  let routeLogos = [];
  for (const routeId of routeIds) {
    if (props.skipExpress && routeId.substr(-1, 1) === 'X') {
      continue
    }
    if (props.addLinks) {
      routeLogos.push(
        <div key={routeId}>
          <Link to={"/routes/" + routeId}>
            <RouteLogo route={routeId} />
          </Link>
        </div>
      )
    } else {
      routeLogos.push(
        <div key={routeId}>
          <RouteLogo route={routeId} />
        </div>
      )
    }
  }
  return (
    <div className="ListOfRouteLogos">
      {routeLogos}
    </div>
  )
}

export function sortRouteIds(routeIds: string[]): string[] {
  let routeIdsSet = new Set(routeIds);
  let allGroups = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["A", "C", "E"],
    ["B", "D", "F", "M"],
    ["N", "Q", "R", "W"],
    ["J", "Z"],
  ];
  let activeGroups: string[][] = [];
  for (const routeIds of allGroups) {
    let activeGroup: string[] = [];
    for (const routeId of routeIds) {
      if (!routeIdsSet.has(routeId)) {
        continue
      }
      activeGroup.push(routeId);
      routeIdsSet.delete(routeId);
    }
    if (activeGroup.length > 0) {
      activeGroups.push(activeGroup);
    }
  }
  for (const routeId of routeIdsSet) {
    activeGroups.push([routeId]);
  }
  activeGroups.sort(function(lhs, rhs) {
    if (lhs[0] < rhs[0]) {
      return -1
    }
    return 1
  });
  let result: string[] = [];
  for (const group of activeGroups) {
    for (const routeId of group) {
      result.push(routeId)
    }
  }
  return result
}
