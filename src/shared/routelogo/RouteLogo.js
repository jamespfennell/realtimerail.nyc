import React from "react";
import PropTypes from 'prop-types';

import ImageFor1 from './images/1.svg'
import ImageFor2 from './images/2.svg'
import ImageFor3 from './images/3.svg'
import ImageFor4 from './images/4.svg'
import ImageFor5 from './images/5.svg'
import ImageFor6 from './images/6.svg'
import ImageFor7 from './images/7.svg'
import ImageForA from './images/a.svg'
import ImageForB from './images/b.svg'
import ImageForC from './images/c.svg'
import ImageForD from './images/d.svg'
import ImageForE from './images/e.svg'
import ImageForF from './images/f.svg'
import ImageForG from './images/g.svg'
import ImageForJ from './images/j.svg'
import ImageForL from './images/l.svg'
import ImageForM from './images/m.svg'
import ImageForN from './images/n.svg'
import ImageForQ from './images/q.svg'
import ImageForR from './images/r.svg'
import ImageForShuttle from './images/s.svg'
import ImageForSIR from './images/sir.svg'
import ImageForW from './images/w.svg'
import ImageForZ from './images/z.svg'


let routeIdToImage = {
    '1': ImageFor1,
    '2': ImageFor2,
    '3': ImageFor3,
    '4': ImageFor4,
    '5': ImageFor5,
    '6': ImageFor6,
    '7': ImageFor7,
    'A': ImageForA,
    'B': ImageForB,
    'C': ImageForC,
    'D': ImageForD,
    'E': ImageForE,
    'F': ImageForF,
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
};


class RouteLogo extends React.Component {
    render() {
        return (
            <img className="RouteLogo" alt={"Logo for the " + this.props.route} src={routeIdToImage[this.props.route]} />
        )
    }
}

//TODO: rename route routeId
RouteLogo.propTypes = {
    route: PropTypes.string
};



export function replaceRouteIdsWithImages(message)
{
  // Replace route markers of the form [L] in a service message with the relevant image.
	// The function works recursively. It finds the first occurrence of [<route_id>]. What comes before is left intact,
	// the [<route_id>] string is replaced by an image, and the remainder of the message is processed by the same function
	// to see if there another [<route_id>] string.
	let a = message.indexOf('[');
	let b = message.indexOf(']', a);
	if (a<0 || b<0) {
		return message
	}
	let pre = message.substring(0,a);
	let route_id = message.substring(a+1,b);
	let post =replaceRouteIdsWithImages(message.substring(b+1));
	let answer = [
	  <span key={post.length-1}>{pre}</span>,
    <RouteLogo route={route_id.toUpperCase()} key={post.length}/>
  ];
  answer.push(post);
	return answer;

}





export default RouteLogo
