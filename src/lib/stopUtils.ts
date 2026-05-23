import { Stop } from "../api/types";

/**
 * Filters stops to only include those that have usual routes (weekday service).
 * This is the same logic used in ListOfStops component.
 *
 * @param stops - Array of stops to filter
 * @returns Array of stops that have weekday service routes
 */
export function filterStopsWithUsualRoutes(stops: Stop[]): Stop[] {
  return stops.filter((stop) => {
    for (const serviceMap of stop.serviceMaps) {
      if (serviceMap.configId === "weekday") {
        return true;
      }
    }
    return false;
  });
}

/**
 * Extracts route IDs from a stop's weekday service maps.
 *
 * @param stop - The stop to extract route IDs from
 * @returns Array of route IDs that serve this stop on weekdays
 */
export function getUsualRouteIds(stop: Stop): string[] {
  let usualRouteIds: string[] = [];
  for (const serviceMap of stop.serviceMaps) {
    if (serviceMap.configId === "weekday") {
      serviceMap.routes.forEach((route) => usualRouteIds.push(route.id));
    }
  }
  return usualRouteIds;
}
