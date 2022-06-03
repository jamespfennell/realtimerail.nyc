import React from "react";
import PropTypes from 'prop-types';

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


class RouteLogo extends React.Component {
  render() {
    let Image = routeIdToImage[this.props.route];
    if (Image === undefined) {
      return "image for route " + this.props.route + " not found"
    }
    return (
      <Image className="RouteLogo" alt={"Logo for the " + this.props.route + " train"} />
    )
  }
}

//TODO: rename route routeId
RouteLogo.propTypes = {
  route: PropTypes.string
};


export function replaceRouteIdsWithImages(message) {
  // Replace route markers of the form [L] in a service message with the relevant image.
  // The function works recursively. It finds the first occurrence of [<route_id>]. What comes before is left intact,
  // the [<route_id>] string is replaced by an image, and the remainder of the message is processed by the same function
  // to see if there another [<route_id>] string.
  let a = message.indexOf('[');
  let b = message.indexOf(']', a);
  if (a < 0 || b < 0) {
    return message
  }
  let pre = message.substring(0, a);
  let route_id = message.substring(a + 1, b);
  let post = replaceRouteIdsWithImages(message.substring(b + 1));
  let answer = [
    <span key={post.length - 1}>{pre}</span>,
    <RouteLogo route={route_id.toUpperCase()} key={post.length}/>
  ];
  answer.push(post);
  return answer;

}


export default RouteLogo
