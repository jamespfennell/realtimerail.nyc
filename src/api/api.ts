export {}

const baseURL = "/transiter/v0.6/";
const systemID = "us-ny-subway";

export function listRoutesURL(): string {
    return baseURL + "systems/" + systemID + "/routes?alerts_detail=all"
}

export function routeURL(routeID: string): string {
    return baseURL + "systems/" + systemID + "/routes/" + routeID
}

export function tripURL(routeID: string, tripID: string): string {
    return baseURL + "systems/" + systemID + "/routes/" + routeID + "/trips/" + tripID
}

export function stopURL(stopID: string): string {
    return baseURL + "systems/" + systemID + "/stops/" + stopID
}
