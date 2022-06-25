import { ReactComponent as ImageFor1 } from './images/1.svg'
import { ReactComponent as ImageFor2 } from './images/2.svg'
import { ReactComponent as ImageFor3 } from './images/3.svg'
import { ReactComponent as ImageFor4 } from './images/4.svg'
import { ReactComponent as ImageFor5 } from './images/5.svg'
import { ReactComponent as ImageFor6 } from './images/6.svg'
import { ReactComponent as ImageFor7 } from './images/7.svg'
import { ReactComponent as ImageFor7X } from './images/7x.svg'
import { ReactComponent as ImageForA } from './images/a.svg'
import { ReactComponent as ImageForB } from './images/b.svg'
import { ReactComponent as ImageForC } from './images/c.svg'
import { ReactComponent as ImageForD } from './images/d.svg'
import { ReactComponent as ImageForE } from './images/e.svg'
import { ReactComponent as ImageForF } from './images/f.svg'
import { ReactComponent as ImageForG } from './images/g.svg'
import { ReactComponent as ImageForJ } from './images/j.svg'
import { ReactComponent as ImageForL } from './images/l.svg'
import { ReactComponent as ImageForM } from './images/m.svg'
import { ReactComponent as ImageForN } from './images/n.svg'
import { ReactComponent as ImageForQ } from './images/q.svg'
import { ReactComponent as ImageForR } from './images/r.svg'
import { ReactComponent as ImageForShuttle } from './images/s.svg'
import { ReactComponent as ImageForSIR } from './images/sir.svg'
import { ReactComponent as ImageForW } from './images/w.svg'
import { ReactComponent as ImageForZ } from './images/z.svg'
import { ReactComponent as ImageForAccesible } from './images/acc.svg'


let routeIdToImage = {
  '1': ImageFor1,
  '2': ImageFor2,
  '3': ImageFor3,
  '4': ImageFor4,
  '5': ImageFor5,
  '5X': ImageFor5,
  '6': ImageFor6,
  '6X': ImageFor6, // TODO
  '7': ImageFor7,
  '7X': ImageFor7X,
  'A': ImageForA,
  'B': ImageForB,
  'C': ImageForC,
  'D': ImageForD,
  'E': ImageForE,
  'F': ImageForF,
  'FS': ImageForShuttle,
  'FX': ImageForF,
  'G': ImageForG,
  'GS': ImageForShuttle,
  'H': ImageForShuttle,
  'J': ImageForJ,
  'L': ImageForL,
  'M': ImageForM,
  'N': ImageForN,
  'Q': ImageForQ,
  'R': ImageForR,
  'S': ImageForShuttle,
  'SIR': ImageForSIR,
  'SI': ImageForSIR,
  'W': ImageForW,
  'Z': ImageForZ,
  'AD': ImageForAccesible
};


export type RouteLogoProps = {
  route: string, // TODO: rename routeID
}

export default function RouteLogo(props: RouteLogoProps) {
  // TODO: fix the typing "as any" hack here
  let Image = (routeIdToImage as any)[props.route];
  if (Image === undefined) {
    return <span>"image for route " + props.route + " not found"</span>
  }
  return (
    <Image className="RouteLogo" alt={"Logo for the " + props.route + " train"} />
  )
}

// Replaces route markers of the form [L] in a service message with the relevant image.
export function replaceRouteIdsWithImages(message: string): JSX.Element[] {
  let elements: JSX.Element[] = [];
  let start = 0;
  while (start < message.length) {
    let a = message.indexOf('[');
    let b = message.indexOf(']', a);
    if (a < 0 || b < 0) {
      elements.push(<span key={2 * message.length}>{message}</span>);
      break
    }
    let pre = message.substring(0, a);
    let route_id = message.substring(a + 1, b);
    elements.push(<span key={2 * message.length}>{pre}</span>);
    elements.push(<RouteLogo route={route_id.toUpperCase()} key={2 * message.length + 1} />);
    message = message.substring(b + 1);
  }
  return elements;
}
