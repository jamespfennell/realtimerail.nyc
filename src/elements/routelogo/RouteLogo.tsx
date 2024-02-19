import { ReactComponent as ImageFor1 } from "./images/1.svg";
import { ReactComponent as ImageFor2 } from "./images/2.svg";
import { ReactComponent as ImageFor3 } from "./images/3.svg";
import { ReactComponent as ImageFor4 } from "./images/4.svg";
import { ReactComponent as ImageFor5 } from "./images/5.svg";
import { ReactComponent as ImageFor6 } from "./images/6.svg";
import { ReactComponent as ImageFor7 } from "./images/7.svg";
import { ReactComponent as ImageFor7X } from "./images/7x.svg";
import { ReactComponent as ImageForA } from "./images/a.svg";
import { ReactComponent as ImageForB } from "./images/b.svg";
import { ReactComponent as ImageForC } from "./images/c.svg";
import { ReactComponent as ImageForD } from "./images/d.svg";
import { ReactComponent as ImageForE } from "./images/e.svg";
import { ReactComponent as ImageForF } from "./images/f.svg";
import { ReactComponent as ImageForG } from "./images/g.svg";
import { ReactComponent as ImageForJ } from "./images/j.svg";
import { ReactComponent as ImageForL } from "./images/l.svg";
import { ReactComponent as ImageForM } from "./images/m.svg";
import { ReactComponent as ImageForN } from "./images/n.svg";
import { ReactComponent as ImageForQ } from "./images/q.svg";
import { ReactComponent as ImageForR } from "./images/r.svg";
import { ReactComponent as ImageForShuttle } from "./images/s.svg";
import { ReactComponent as ImageForSIR } from "./images/sir.svg";
import { ReactComponent as ImageForW } from "./images/w.svg";
import { ReactComponent as ImageForZ } from "./images/z.svg";
import { ReactComponent as ImageForAccesible } from "./images/acc.svg";

const routeIdToImage = {
  "1": ImageFor1,
  "2": ImageFor2,
  "3": ImageFor3,
  "4": ImageFor4,
  "5": ImageFor5,
  "5X": ImageFor5,
  "6": ImageFor6,
  "6X": ImageFor6, // TODO
  "7": ImageFor7,
  "7X": ImageFor7X,
  A: ImageForA,
  B: ImageForB,
  C: ImageForC,
  D: ImageForD,
  E: ImageForE,
  F: ImageForF,
  FS: ImageForShuttle,
  FX: ImageForF,
  G: ImageForG,
  GS: ImageForShuttle,
  H: ImageForShuttle,
  J: ImageForJ,
  L: ImageForL,
  M: ImageForM,
  N: ImageForN,
  Q: ImageForQ,
  R: ImageForR,
  S: ImageForShuttle,
  SIR: ImageForSIR,
  SI: ImageForSIR,
  W: ImageForW,
  Z: ImageForZ,
  AD: ImageForAccesible, // TODO change icon
} as const;

export type RouteId = keyof typeof routeIdToImage;

// Define defaults for routes which do not have a color in routes.txt.
// The only routes lacking colors are SIR, H, and FS, but this defines defaults for all routes.
export const routeIdToDefaultColor: Record<RouteId, string> = {
  "1": "ee342e",
  "2": "ee342e",
  "3": "ee342e",
  "4": "00933b",
  "5": "00933b",
  "5X": "00933b",
  "6": "00933b",
  "6X": "00933b",
  "7": "b933ae",
  "7X": "b933ae",
  A: "2852ad",
  B: "ff6219",
  C: "2852ad",
  D: "ff6219",
  E: "2852ad",
  F: "ff6219",
  FS: "808183",
  FX: "ff6219",
  G: "6dbe45",
  GS: "808183",
  H: "808183",
  J: "996433",
  L: "a7a9ac",
  M: "ff6219",
  N: "fccc0a",
  Q: "fccc0a",
  R: "fccc0a",
  S: "808183",
  SIR: "213990",
  SI: "213990",
  W: "fccc0a",
  Z: "996433",
  AD: "000000", // TODO change color
};

export type RouteLogoProps = {
  route: string; // TODO: rename routeID
};

export default function RouteLogo(props: RouteLogoProps) {
  // TODO: fix the typing "as any" hack here
  let Image = (routeIdToImage as any)[props.route];
  if (Image === undefined) {
    return <span>"image for route " + props.route + " not found"</span>;
  }
  return (
    <Image
      className="RouteLogo"
      alt={"Logo for the " + props.route + " train"}
    />
  );
}

// Replaces route markers of the form [L] in a service message with the relevant image.
export function replaceRouteIdsWithImages(message: string): JSX.Element[] {
  let elements: JSX.Element[] = [];
  let start = 0;
  while (start < message.length) {
    let a = message.indexOf("[");
    let b = message.indexOf("]", a);
    if (a < 0 || b < 0) {
      elements.push(<span key={2 * message.length}>{message}</span>);
      break;
    }
    let pre = message.substring(0, a);
    let route_id = message.substring(a + 1, b);
    elements.push(<span key={2 * message.length}>{pre}</span>);
    elements.push(
      <RouteLogo route={route_id.toUpperCase()} key={2 * message.length + 1} />,
    );
    message = message.substring(b + 1);
  }
  return elements;
}
