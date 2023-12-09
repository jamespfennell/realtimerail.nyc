export {};

const baseURL = "/transiter/v0.6/";
const systemID = "us-ny-subway";

export function listRoutesURL(): string {
  return baseURL + "systems/" + systemID + "/routes?skip_service_maps=true";
}

export function routeURL(routeID: string): string {
  return baseURL + "systems/" + systemID + "/routes/" + routeID;
}

export function tripURL(routeID: string, tripID: string): string {
  return (
    baseURL + "systems/" + systemID + "/routes/" + routeID + "/trips/" + tripID
  );
}

export function entrypointURL(): string {
  return baseURL;
}

export function feedsURL(): string {
  return baseURL + "systems/" + systemID + "/feeds";
}

export function stopURL(stopID: string): string {
  return baseURL + "systems/" + systemID + "/stops/" + stopID;
}

export function locationURL(latitude: number, longitude: number): string {
  return (
    baseURL +
    "systems/" +
    systemID +
    "/stops?skip_stop_times=true&limit=30&search_mode=DISTANCE&max_distance=3.2&latitude=" +
    latitude +
    "&longitude=" +
    longitude
  );
}

export function stopServiceMapsURL(stopIDs: string[]): string {
  let url =
    baseURL +
    "systems/" +
    systemID +
    "/stops?skip_stop_times=true&only_return_specified_ids=true";
  for (const stopID of stopIDs) {
    url = url + "&id=" + stopID;
  }
  return url;
}

export function alertsURL(alertIDs: string[]): string {
  let url = baseURL + "systems/" + systemID + "/alerts";
  let first = true;

  for (const alertID of alertIDs) {
    if (first) {
      url = url + "?";
      first = false;
    } else {
      url = url + "&";
    }
    url = url + "alert_id=" + alertID;
  }
  return url;
}
