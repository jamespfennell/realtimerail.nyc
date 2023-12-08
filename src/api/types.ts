/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

/** Request payload for the entrypoint endpoint. */
export interface EntrypointRequest {}

/** Response payload for the entrypoint endpoint. */
export interface EntrypointReply {
  /** Version and other information about this Transiter binary. */
  transiter: EntrypointReply_TransiterDetails | undefined;
  /** Systems that are installed in this Transiter instance. */
  systems: ChildResources | undefined;
}

/** Message containing version information about a Transiter binary. */
export interface EntrypointReply_TransiterDetails {
  /** The version of the Transiter binary this instance is running. */
  version: string;
  /** URL of the Transiter GitHub respository. */
  href: string;
  /** Information about the CI build invocation that built this Transiter binary. */
  build?: EntrypointReply_TransiterDetails_Build | undefined;
}

/** Message containing information about a specific Transiter CI build. */
export interface EntrypointReply_TransiterDetails_Build {
  /** The GitHub build number. */
  number: string;
  /** Time the binary was built, in the form of a human readable string. */
  builtAt: string;
  /** Time the binary was built, in the form of a Unix timestamp. */
  builtAtTimestamp: string;
  /** Hash of the Git commit that the binary was built at. */
  gitCommitHash: string;
  /** URL of the GitHub actions CI run. */
  href: string;
}

/** Request payload for the list systems endpoint. */
export interface ListSystemsRequest {}

/** Response payload for the list systems endpoint. */
export interface ListSystemsReply {
  /** List of systems. */
  systems: System[];
}

/** Request payload for the get system endpoint. */
export interface GetSystemRequest {
  /**
   * ID of the system to get.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
}

/** Request payload for the list agencies endpoint. */
export interface ListAgenciesRequest {
  /**
   * ID of the system for which to list agencies.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
}

/** Response payload for the list agencies endpoint. */
export interface ListAgenciesReply {
  /** List of agencies. */
  agencies: Agency[];
}

/** Request payload for the get agency endpoint. */
export interface GetAgencyRequest {
  /**
   * ID of the system the agency is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the agency.
   *
   * This is a URL parameter in the HTTP API.
   */
  agencyId: string;
}

/** Request payload for the list stops endpoint. */
export interface ListStopsRequest {
  /**
   * ID of the system for which to list stops.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /** The type of search to perform when listing stops. */
  searchMode?: ListStopsRequest_SearchMode | undefined;
  /**
   * If true, only return stops whose IDs are specified in the repeated `id` field.
   * Only supported when the search mode is ID.
   */
  onlyReturnSpecifiedIds: boolean;
  /**
   * IDs to return if `only_return_specified_ids` is set to true. It is an error to
   * populate this field if `only_return_specified_ids` is false.
   * Only supported when the search mode is ID.
   */
  id: string[];
  /**
   * ID of the first stop to return. If not set, the stop with the smallest ID will be first.
   * Only supported when the search mode is ID.
   */
  firstId?: string | undefined;
  /**
   * Maximum number of stops to return.
   * This is supported in all search modes.
   * For performance reasons, if it is larger than 100 it is rounded down to 100.
   */
  limit?: number | undefined;
  /**
   * If true, the stop times field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipStopTimes: boolean;
  /**
   * If true, the service maps field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipServiceMaps: boolean;
  /**
   * If true, the alerts field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipAlerts: boolean;
  /**
   * If true, the transfers field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipTransfers: boolean;
  /**
   * The maximum distance in kilometers that a stop must be from
   * latitude, longitude to be listed when using DISTANCE search mode.
   */
  maxDistance?: number | undefined;
  /** The latitude relative to the returned stops when using DISTANCE search mode. */
  latitude?: number | undefined;
  /** The longitude relative to the returned stops when using DISTANCE search mode. */
  longitude?: number | undefined;
}

/** The possible search modes when listing stops. */
export enum ListStopsRequest_SearchMode {
  /** ID - Return a paginated list of stops sorted by stop ID. */
  ID = 0,
  /** DISTANCE - Return all stops within max_distance of (latitude, longitude), sorted by the distance. */
  DISTANCE = 1,
  UNRECOGNIZED = -1,
}

export function listStopsRequest_SearchModeFromJSON(
  object: any,
): ListStopsRequest_SearchMode {
  switch (object) {
    case 0:
    case "ID":
      return ListStopsRequest_SearchMode.ID;
    case 1:
    case "DISTANCE":
      return ListStopsRequest_SearchMode.DISTANCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListStopsRequest_SearchMode.UNRECOGNIZED;
  }
}

export function listStopsRequest_SearchModeToJSON(
  object: ListStopsRequest_SearchMode,
): string {
  switch (object) {
    case ListStopsRequest_SearchMode.ID:
      return "ID";
    case ListStopsRequest_SearchMode.DISTANCE:
      return "DISTANCE";
    case ListStopsRequest_SearchMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Response payload for the list stops endpoint. */
export interface ListStopsReply {
  /** List of stops. */
  stops: Stop[];
  /** ID of the next stop to return, if there are more results. */
  nextId?: string | undefined;
}

/** Reqeust payload for the get stop endpoint. */
export interface GetStopRequest {
  /**
   * ID of the system the stop is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the stop.
   *
   * This is a URL parameter in the HTTP API.
   */
  stopId: string;
  /**
   * If true, the stop times field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipStopTimes: boolean;
  /**
   * If true, the service maps field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipServiceMaps: boolean;
  /**
   * If true, the alerts field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipAlerts: boolean;
  /**
   * If true, the transfers field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipTransfers: boolean;
}

/** Request payload for the list routes endpoint. */
export interface ListRoutesRequest {
  /**
   * ID of the system for which to list routes.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * If true, the estimated headway fields will not be populated.
   * This will generally make the response faster to generate.
   */
  skipEstimatedHeadways: boolean;
  /**
   * If true, the service maps field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipServiceMaps: boolean;
  /**
   * If true, the alerts field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipAlerts: boolean;
}

/** Response payload for the list routes endpoint. */
export interface ListRoutesReply {
  /** List of routes. */
  routes: Route[];
}

/** Request payload for the get route endpoint. */
export interface GetRouteRequest {
  /**
   * ID of the system the route is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the route.
   *
   * This is a URL parameter in the HTTP API.
   */
  routeId: string;
  /**
   * If true, the estimated headway field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipEstimatedHeadways: boolean;
  /**
   * If true, the service maps field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipServiceMaps: boolean;
  /**
   * If true, the alerts field will not be populated.
   * This will generally make the response faster to generate.
   */
  skipAlerts: boolean;
}

/** Request payload for the list trips endpoint. */
export interface ListTripsRequest {
  /**
   * ID of the system the route is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the route for which to list trips
   *
   * This is a URL parameter in the HTTP API.
   */
  routeId: string;
}

/** Response payload for the list trips endpoint. */
export interface ListTripsReply {
  /** List of trips. */
  trips: Trip[];
}

/** Request payload for the list alerts endpoint. */
export interface ListAlertsRequest {
  /**
   * ID of the system for which to list alerts.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * If non-empty, only alerts with the provided IDs are returned.
   * This is interpreted as a filtering condition, so it is not an error to provide non-existent IDs.
   *
   * If empty, all alerts in the system are returned.
   * TODO: add a boolean filter_on_alert_ids field
   */
  alertId: string[];
}

/** Response payload for the list alerts endpoiont. */
export interface ListAlertsReply {
  /** List of alerts. */
  alerts: Alert[];
}

/** Request payload for the get alert endpoint. */
export interface GetAlertRequest {
  /**
   * ID of the system the alert is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the alert.
   *
   * This is a URL parameter in the HTTP API.
   */
  alertId: string;
}

/** Request payload for the get trip endpoint. */
export interface GetTripRequest {
  /**
   * ID of the system the trip is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the route the trip is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  routeId: string;
  /**
   * ID of the route.
   *
   * This is a URL parameter in the HTTP API.
   */
  tripId: string;
}

/** Request payload for the list feeds endpoint. */
export interface ListFeedsRequest {
  /** ID of the system for which to list feeds. */
  systemId: string;
}

/** Response payload for the list feeds endpoint. */
export interface ListFeedsReply {
  /** List of feeds. */
  feeds: Feed[];
}

/** Request payload for the get feed endpoint. */
export interface GetFeedRequest {
  /**
   * ID of the system the feed is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the feed.
   *
   * This is a URL parameter in the HTTP API.
   */
  feedId: string;
}

/** Request payload for the list transfers endpoint. */
export interface ListTransfersRequest {
  /** ID of the system for which to list transfers. */
  systemId: string;
}

/** Response payload for the list transfers endpoint. */
export interface ListTransfersReply {
  /** List of transfers. */
  transfers: Transfer[];
}

export interface ListVehiclesRequest {
  /** ID of the system for which to list vehicles. */
  systemId: string;
  /** The type of search to perform when listing vehicles. */
  searchMode?: ListVehiclesRequest_SearchMode | undefined;
  /**
   * If true, only return vehicles whose IDs are specified in the repeated `id` field.
   * Only supported when the search mode is ID.
   */
  onlyReturnSpecifiedIds: boolean;
  /**
   * IDs to return if `only_return_specified_ids` is set to true. It is an error to
   * populate this field if `only_return_specified_ids` is false.
   * Only supported when the search mode is ID.
   */
  id: string[];
  /**
   * ID of the first vehicle to return. If not set, the vehicle with the smallest ID will be first.
   * Only supported when the search mode is ID.
   */
  firstId?: string | undefined;
  /**
   * Maximum number of vehicles to return.
   * This is supported in all search modes.
   * For performance reasons, if it is larger than 100 it is rounded down to 100.
   */
  limit?: number | undefined;
  /**
   * The maximum distance in kilometers that a vehicle must be from
   * latitude, longitude to be listed when using DISTANCE search mode.
   */
  maxDistance?: number | undefined;
  /** The latitude relative to the returned vehicles when using DISTANCE search mode. */
  latitude?: number | undefined;
  /** The longitude relative to the returned vehicles when using DISTANCE search mode. */
  longitude?: number | undefined;
}

export enum ListVehiclesRequest_SearchMode {
  /** ID - Return a paginated list of vehicles sorted by vehicle ID. */
  ID = 0,
  /** DISTANCE - Return all vehicles within max_distance of (latitude, longitude), sorted by the distance. */
  DISTANCE = 1,
  UNRECOGNIZED = -1,
}

export function listVehiclesRequest_SearchModeFromJSON(
  object: any,
): ListVehiclesRequest_SearchMode {
  switch (object) {
    case 0:
    case "ID":
      return ListVehiclesRequest_SearchMode.ID;
    case 1:
    case "DISTANCE":
      return ListVehiclesRequest_SearchMode.DISTANCE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ListVehiclesRequest_SearchMode.UNRECOGNIZED;
  }
}

export function listVehiclesRequest_SearchModeToJSON(
  object: ListVehiclesRequest_SearchMode,
): string {
  switch (object) {
    case ListVehiclesRequest_SearchMode.ID:
      return "ID";
    case ListVehiclesRequest_SearchMode.DISTANCE:
      return "DISTANCE";
    case ListVehiclesRequest_SearchMode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ListVehiclesReply {
  /** List of vehicles. */
  vehicles: Vehicle[];
  /** ID of the next vehicle to return, if there are more results. */
  nextId?: string | undefined;
}

export interface GetVehicleRequest {
  /**
   * ID of the system the vehicle is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the vehicle.
   *
   * This is a URL parameter in the HTTP API.
   */
  vehicleId: string;
}

export interface ListShapesRequest {
  /** System to list shapes for. */
  systemId: string;
  /** If true, only return shapes whose IDs are specified in the repeated `id` field. */
  onlyReturnSpecifiedIds: boolean;
  /**
   * IDs to return if `only_return_specified_ids` is set to true. It is an error to
   * populate this field if `only_return_specified_ids` is false.
   */
  id: string[];
  /** ID of the first shape to return. If not set, the shape with the smallest ID will be first. */
  firstId?: string | undefined;
  /** Maximum number of shapes to return. */
  limit?: number | undefined;
}

export interface ListShapesReply {
  /** Shapes that were listed. */
  shapes: Shape[];
  /** ID of the next shape to list, if there are more results. */
  nextId?: string | undefined;
}

export interface GetShapeRequest {
  /** System to get shape for. */
  systemId: string;
  /** ID of the shape to get. */
  shapeId: string;
}

/** The System resource. */
export interface System {
  /** ID of the system as specified in the install request. */
  id: string;
  /** Generic metadata about the system resource. */
  resource: Resource | undefined;
  /** Name of the system as specified in the system configuration file. */
  name: string;
  /** Status of the system. */
  status: System_Status;
  agencies: ChildResources | undefined;
  feeds: ChildResources | undefined;
  routes: ChildResources | undefined;
  stops: ChildResources | undefined;
  transfers: ChildResources | undefined;
}

/** Enum describing the possible statuses of a system. */
export enum System_Status {
  /** UNKNOWN - Unknown status, included for protobuf reasons. */
  UNKNOWN = 0,
  /** INSTALLING - The system is currently being installed through an asychronous install request. */
  INSTALLING = 1,
  /** ACTIVE - The system was successfully installed and is now active. */
  ACTIVE = 2,
  /** INSTALL_FAILED - The system was added through an asynchronous install request, but the install failed. */
  INSTALL_FAILED = 3,
  /** UPDATING - The system is currently being updated through an asynchronous update request. */
  UPDATING = 4,
  /** UPDATE_FAILED - An asynchronous update of the system failed. */
  UPDATE_FAILED = 5,
  /** DELETING - The system is in the process of being deleted through an asynchronous delete request. */
  DELETING = 6,
  UNRECOGNIZED = -1,
}

export function system_StatusFromJSON(object: any): System_Status {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return System_Status.UNKNOWN;
    case 1:
    case "INSTALLING":
      return System_Status.INSTALLING;
    case 2:
    case "ACTIVE":
      return System_Status.ACTIVE;
    case 3:
    case "INSTALL_FAILED":
      return System_Status.INSTALL_FAILED;
    case 4:
    case "UPDATING":
      return System_Status.UPDATING;
    case 5:
    case "UPDATE_FAILED":
      return System_Status.UPDATE_FAILED;
    case 6:
    case "DELETING":
      return System_Status.DELETING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return System_Status.UNRECOGNIZED;
  }
}

export function system_StatusToJSON(object: System_Status): string {
  switch (object) {
    case System_Status.UNKNOWN:
      return "UNKNOWN";
    case System_Status.INSTALLING:
      return "INSTALLING";
    case System_Status.ACTIVE:
      return "ACTIVE";
    case System_Status.INSTALL_FAILED:
      return "INSTALL_FAILED";
    case System_Status.UPDATING:
      return "UPDATING";
    case System_Status.UPDATE_FAILED:
      return "UPDATE_FAILED";
    case System_Status.DELETING:
      return "DELETING";
    case System_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Reference is the reference type for the system resource. */
export interface System_Reference {
  id: string;
  resource: Resource | undefined;
}

/** The resource message contains generic metadata that applies to all resources. */
export interface Resource {
  path: string;
  href?: string | undefined;
}

/**
 * Description of a collection of child resources for a resource.
 * This message and fields using this message exist to support API discoverability.
 */
export interface ChildResources {
  /** Number of child resources. */
  count: number;
  /** URL of the endpoint to list child resources. */
  href?: string | undefined;
}

/**
 * The Stop resource.
 *
 * This resource corresponds to the [stop type in the GTFS static
 * specification](https://developers.google.com/transit/gtfs/reference#stopstxt).
 * Most of the static fields in the resource come directly from the `stops.txt` table.
 * Transiter adds some additional related fields (transfers, alerts, stop times)
 *   and computed fields (service maps).
 */
export interface Stop {
  /** ID of the stop. This is the `stop_id` column in `stops.txt`. */
  id: string;
  /** Generic metadata about the stop resource. */
  resource: Resource | undefined;
  /**
   * System corresponding to this stop.
   * This is the parent resource in Transiter's resource hierarchy.
   */
  system: System_Reference | undefined;
  /** Code of the stop. This is the `stop_code` column in `stops.txt`. */
  code?: string | undefined;
  /** Name of the stop. This is the `stop_name` column in `stops.txt`. */
  name?: string | undefined;
  /** Description of the stop. This is the `stop_desc` column in `stops.txt`. */
  description?: string | undefined;
  /** Zone ID of the stop. This is the `zone_id` column in `stops.txt`. */
  zoneId?: string | undefined;
  /** Latitude of the stop. This is the `stop_lat` column in `stops.txt`. */
  latitude?: number | undefined;
  /** Longitude of the stop. This is the `stop_lon` column in `stops.txt`. */
  longitude?: number | undefined;
  /** URL of a webpage about the stop. This is the `stop_url` column in `stops.txt`. */
  url?: string | undefined;
  /** Type of the stop. This is the `platform_type` column in `stops.txt`. */
  type: Stop_Type;
  /** Parent stop. This is determined using the `parent_station` column in `stops.txt`. */
  parentStop?: Stop_Reference | undefined;
  /** Child stops. This are determined using the `parent_station` column in `stops.txt`. */
  childStops: Stop_Reference[];
  /** Timezone of the stop. This is the `stop_timezone` column in `stops.txt`. */
  timezone?: string | undefined;
  /** If there is wheelchair boarding for this stop. This is the `wheelchair_boarding` column in `stops.txt`. */
  wheelchairBoarding?: boolean | undefined;
  /** Platform code of the stop. This is the `platform_code` column in `stops.txt`. */
  platformCode?: string | undefined;
  /** List of service maps for this stop. */
  serviceMaps: Stop_ServiceMap[];
  /**
   * Active alerts for this stop.
   *
   * These are determined using the `informed_entity` field in
   * the [GTFS realtime alerts
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
   */
  alerts: Alert_Reference[];
  /**
   * List of realtime stop times for this stop.
   *
   * A stop time is an event at which a trip calls at a stop.
   */
  stopTimes: StopTime[];
  /**
   * Transfers out of this stop.
   *
   * These are determined using the `from_stop_id` field in the GTFS static `transfers.txt` file.
   */
  transfers: Transfer[];
  /** List of headsign rules for this stop. */
  headsignRules: Stop_HeadsignRule[];
}

/** Enum describing the possible stop types */
export enum Stop_Type {
  STOP = 0,
  STATION = 1,
  ENTRANCE_OR_EXIT = 2,
  GENERIC_NODE = 3,
  BOARDING_AREA = 4,
  UNRECOGNIZED = -1,
}

export function stop_TypeFromJSON(object: any): Stop_Type {
  switch (object) {
    case 0:
    case "STOP":
      return Stop_Type.STOP;
    case 1:
    case "STATION":
      return Stop_Type.STATION;
    case 2:
    case "ENTRANCE_OR_EXIT":
      return Stop_Type.ENTRANCE_OR_EXIT;
    case 3:
    case "GENERIC_NODE":
      return Stop_Type.GENERIC_NODE;
    case 4:
    case "BOARDING_AREA":
      return Stop_Type.BOARDING_AREA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Stop_Type.UNRECOGNIZED;
  }
}

export function stop_TypeToJSON(object: Stop_Type): string {
  switch (object) {
    case Stop_Type.STOP:
      return "STOP";
    case Stop_Type.STATION:
      return "STATION";
    case Stop_Type.ENTRANCE_OR_EXIT:
      return "ENTRANCE_OR_EXIT";
    case Stop_Type.GENERIC_NODE:
      return "GENERIC_NODE";
    case Stop_Type.BOARDING_AREA:
      return "BOARDING_AREA";
    case Stop_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Message describing the service maps view in stops.
 *
 * See the service maps documentation for more information on this
 * message and the associated field.
 */
export interface Stop_ServiceMap {
  /** Config ID of the service map, as specified in the system configuration file. */
  configId: string;
  /**
   * List of routes which call at this stop.
   *
   * This list may be empty, in which case the stop has no service in the service map.
   */
  routes: Route_Reference[];
}

/** Message describing a headsign rule. */
export interface Stop_HeadsignRule {
  /** Stop the rule is for. */
  stop: Stop_Reference | undefined;
  /** Priority of the rule (lower is higher priority). */
  priority: number;
  /** NYCT track. */
  track?: string | undefined;
  /** Headsign. */
  headsign: string;
}

/** Reference is the reference type for the stop resource. */
export interface Stop_Reference {
  id: string;
  resource: Resource | undefined;
  system: System_Reference | undefined;
  name?: string | undefined;
}

/**
 * Message describing a realtime stop time.
 *
 * A stop time is an event in which a trip calls at a stop.
 * This message corresponds to the [GTFS realtime `StopTimeUpdate`
 * message](https://developers.google.com/transit/gtfs-realtime/reference#message-stoptimeupdate)
 */
export interface StopTime {
  /** The stop. */
  stop: Stop_Reference | undefined;
  /** The trip. */
  trip: Trip_Reference | undefined;
  /** Arrival time. */
  arrival: StopTime_EstimatedTime | undefined;
  /** Departure time. */
  departure: StopTime_EstimatedTime | undefined;
  /**
   * If this stop time is in the future.
   * This field is *not* based on the arrival or departure time.
   * Instead, a stop time is considered in the future if it appeared in the most recent
   * GTFS realtime feed for its trip.
   * When this stop time disappears from the trip, Transiter marks it as past and freezes
   * its data.
   */
  future: boolean;
  /** Stop sequence. */
  stopSequence: number;
  /** Headsign. */
  headsign?: string | undefined;
  /** Track, from the NYCT realtime extension. */
  track?: string | undefined;
}

/**
 * Message describing the arrival or departure time of a stop time.
 * This corresponds to the [GTFS realtime `StopTimeEvent`
 * message](https://developers.google.com/transit/gtfs-realtime/reference#message-stoptimeevent).
 */
export interface StopTime_EstimatedTime {
  time?: number | undefined;
  delay?: number | undefined;
  uncertainty?: number | undefined;
}

export interface Trip {
  id: string;
  /** Generic metadata about the trip resource. */
  resource: Resource | undefined;
  /**
   * Route corresponding to this trip.
   * This is the parent resource in Transiter's resource hierarchy.
   * It is determined using the `route_id` field in the GTFS realtime feed.
   */
  route: Route_Reference | undefined;
  startedAt?: number | undefined;
  vehicle?: Vehicle_Reference | undefined;
  directionId: boolean;
  stopTimes: StopTime[];
  shape?: Shape_Reference | undefined;
}

/** Reference is the reference type for the trip resource. */
export interface Trip_Reference {
  id: string;
  resource: Resource | undefined;
  route: Route_Reference | undefined;
  destination: Stop_Reference | undefined;
  vehicle?: Vehicle_Reference | undefined;
  directionId: boolean;
}

/**
 * The Vehicle resource.
 *
 * This resource corresponds to the [vehicle position type in the GTFS static
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#message-vehicleposition).
 */
export interface Vehicle {
  /** A unique ID for the vehicle. */
  id: string;
  /** A reference to the vehicle's trip. */
  trip?: Trip_Reference | undefined;
  /** The vehicle's current latitude. */
  latitude?: number | undefined;
  /** The vehicle's current longitude. */
  longitude?: number | undefined;
  /** The vehicle's current bearing. */
  bearing?: number | undefined;
  /** The vehicle's current odometer reading. */
  odometer?: number | undefined;
  /** The vehicle's current speed. */
  speed?: number | undefined;
  /** The stop sequence index of the vehicle's current stop. */
  stopSequence?: number | undefined;
  /** A reference to the vehicle's current stop. */
  stop?: Stop_Reference | undefined;
  /** The vehicle's current status. */
  currentStatus?: Vehicle_CurrentStatus | undefined;
  /** The timestamp of the last update to the vehicle's position. */
  updatedAt?: number | undefined;
  /** The vehicle's current congestion level. */
  congestionLevel: Vehicle_CongestionLevel;
  /** The vehicle's current occupancy status. */
  occupancyStatus?: Vehicle_OccupancyStatus | undefined;
  /** The percentage of seats occupied. */
  occupancyPercentage?: number | undefined;
}

/**
 * Corresponds to [VehicleStopStatus](https://developers.google.com/
 * transit/gtfs-realtime/reference#enum-vehiclestopstatus).
 */
export enum Vehicle_CurrentStatus {
  INCOMING_AT = 0,
  STOPPED_AT = 1,
  IN_TRANSIT_TO = 2,
  UNRECOGNIZED = -1,
}

export function vehicle_CurrentStatusFromJSON(
  object: any,
): Vehicle_CurrentStatus {
  switch (object) {
    case 0:
    case "INCOMING_AT":
      return Vehicle_CurrentStatus.INCOMING_AT;
    case 1:
    case "STOPPED_AT":
      return Vehicle_CurrentStatus.STOPPED_AT;
    case 2:
    case "IN_TRANSIT_TO":
      return Vehicle_CurrentStatus.IN_TRANSIT_TO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Vehicle_CurrentStatus.UNRECOGNIZED;
  }
}

export function vehicle_CurrentStatusToJSON(
  object: Vehicle_CurrentStatus,
): string {
  switch (object) {
    case Vehicle_CurrentStatus.INCOMING_AT:
      return "INCOMING_AT";
    case Vehicle_CurrentStatus.STOPPED_AT:
      return "STOPPED_AT";
    case Vehicle_CurrentStatus.IN_TRANSIT_TO:
      return "IN_TRANSIT_TO";
    case Vehicle_CurrentStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Corresponds to [CongestionLevel](https://developers.google.com/
 * transit/gtfs-realtime/reference#enum-congestionlevel).
 */
export enum Vehicle_CongestionLevel {
  UNKNOWN_CONGESTION_LEVEL = 0,
  RUNNING_SMOOTHLY = 1,
  STOP_AND_GO = 2,
  CONGESTION = 3,
  SEVERE_CONGESTION = 4,
  UNRECOGNIZED = -1,
}

export function vehicle_CongestionLevelFromJSON(
  object: any,
): Vehicle_CongestionLevel {
  switch (object) {
    case 0:
    case "UNKNOWN_CONGESTION_LEVEL":
      return Vehicle_CongestionLevel.UNKNOWN_CONGESTION_LEVEL;
    case 1:
    case "RUNNING_SMOOTHLY":
      return Vehicle_CongestionLevel.RUNNING_SMOOTHLY;
    case 2:
    case "STOP_AND_GO":
      return Vehicle_CongestionLevel.STOP_AND_GO;
    case 3:
    case "CONGESTION":
      return Vehicle_CongestionLevel.CONGESTION;
    case 4:
    case "SEVERE_CONGESTION":
      return Vehicle_CongestionLevel.SEVERE_CONGESTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Vehicle_CongestionLevel.UNRECOGNIZED;
  }
}

export function vehicle_CongestionLevelToJSON(
  object: Vehicle_CongestionLevel,
): string {
  switch (object) {
    case Vehicle_CongestionLevel.UNKNOWN_CONGESTION_LEVEL:
      return "UNKNOWN_CONGESTION_LEVEL";
    case Vehicle_CongestionLevel.RUNNING_SMOOTHLY:
      return "RUNNING_SMOOTHLY";
    case Vehicle_CongestionLevel.STOP_AND_GO:
      return "STOP_AND_GO";
    case Vehicle_CongestionLevel.CONGESTION:
      return "CONGESTION";
    case Vehicle_CongestionLevel.SEVERE_CONGESTION:
      return "SEVERE_CONGESTION";
    case Vehicle_CongestionLevel.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Corresponds to [OccupancyStatus](https://developers.google.com/
 * transit/gtfs-realtime/reference#enum-occupancystatus).
 */
export enum Vehicle_OccupancyStatus {
  EMPTY = 0,
  MANY_SEATS_AVAILABLE = 1,
  FEW_SEATS_AVAILABLE = 2,
  STANDING_ROOM_ONLY = 3,
  CRUSHED_STANDING_ROOM_ONLY = 4,
  FULL = 5,
  NOT_ACCEPTING_PASSENGERS = 6,
  UNRECOGNIZED = -1,
}

export function vehicle_OccupancyStatusFromJSON(
  object: any,
): Vehicle_OccupancyStatus {
  switch (object) {
    case 0:
    case "EMPTY":
      return Vehicle_OccupancyStatus.EMPTY;
    case 1:
    case "MANY_SEATS_AVAILABLE":
      return Vehicle_OccupancyStatus.MANY_SEATS_AVAILABLE;
    case 2:
    case "FEW_SEATS_AVAILABLE":
      return Vehicle_OccupancyStatus.FEW_SEATS_AVAILABLE;
    case 3:
    case "STANDING_ROOM_ONLY":
      return Vehicle_OccupancyStatus.STANDING_ROOM_ONLY;
    case 4:
    case "CRUSHED_STANDING_ROOM_ONLY":
      return Vehicle_OccupancyStatus.CRUSHED_STANDING_ROOM_ONLY;
    case 5:
    case "FULL":
      return Vehicle_OccupancyStatus.FULL;
    case 6:
    case "NOT_ACCEPTING_PASSENGERS":
      return Vehicle_OccupancyStatus.NOT_ACCEPTING_PASSENGERS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Vehicle_OccupancyStatus.UNRECOGNIZED;
  }
}

export function vehicle_OccupancyStatusToJSON(
  object: Vehicle_OccupancyStatus,
): string {
  switch (object) {
    case Vehicle_OccupancyStatus.EMPTY:
      return "EMPTY";
    case Vehicle_OccupancyStatus.MANY_SEATS_AVAILABLE:
      return "MANY_SEATS_AVAILABLE";
    case Vehicle_OccupancyStatus.FEW_SEATS_AVAILABLE:
      return "FEW_SEATS_AVAILABLE";
    case Vehicle_OccupancyStatus.STANDING_ROOM_ONLY:
      return "STANDING_ROOM_ONLY";
    case Vehicle_OccupancyStatus.CRUSHED_STANDING_ROOM_ONLY:
      return "CRUSHED_STANDING_ROOM_ONLY";
    case Vehicle_OccupancyStatus.FULL:
      return "FULL";
    case Vehicle_OccupancyStatus.NOT_ACCEPTING_PASSENGERS:
      return "NOT_ACCEPTING_PASSENGERS";
    case Vehicle_OccupancyStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Reference is the reference type for the vehicle resource. */
export interface Vehicle_Reference {
  id: string;
  resource: Resource | undefined;
}

/**
 * The Route resource.
 *
 * This resource corresponds to the [route type in the GTFS static
 * specification](https://developers.google.com/transit/gtfs/reference#routestxt).
 * Most of the fields in the resource come directly from the `routes.txt` table.
 * Transiter adds some additional related fields (agency, alerts)
 *   and computed fields (estimated headway, service maps).
 */
export interface Route {
  /** ID of the route. This is the `route_id` column in `routes.txt`. */
  id: string;
  /** Generic metadata about the route resource. */
  resource: Resource | undefined;
  /**
   * System corresponding to this route.
   * This is the parent resource in Transiter's resource hierarchy.
   */
  system: System_Reference | undefined;
  /** Short name of the route. This is the `route_short_name` column in `routes.txt`. */
  shortName?: string | undefined;
  /** Long name of the route. This is the `route_long_name` column in `routes.txt`. */
  longName?: string | undefined;
  /** Color of the route. This is the `route_color` column in `routes.txt`. */
  color: string;
  /** Text color of the route. This is the `route_text_color` column in `routes.txt`. */
  textColor: string;
  /** Description of the route. This is the `route_desc` column in `routes.txt`. */
  description?: string | undefined;
  /** URL of a web page about the route. This is the `route_url` column in `routes.txt`. */
  url?: string | undefined;
  /** Sort order of the route. This is the `route_sort_order` column in `routes.txt`. */
  sortOrder?: number | undefined;
  /** Continuous pickup policy. This is the `continuous_pickup` column in `routes.txt`. */
  continuousPickup: Route_ContinuousPolicy;
  /** Continuous dropoff policy. This is the `continuous_dropoff` column in `routes.txt`. */
  continuousDropOff: Route_ContinuousPolicy;
  /** Type of the route. This is the `route_type` column in `routes.txt`. */
  type: Route_Type;
  /**
   * Agency this route is associated to.
   *
   * This is determined using the `agency_id` column in `routes.txt`.
   */
  agency: Agency_Reference | undefined;
  /**
   * Active alerts for this route.
   *
   * These are determined using the `informed_entity` field in
   * the [GTFS realtime alerts
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
   */
  alerts: Alert_Reference[];
  /**
   * An estimate of the interval of time between consecutive realtime trips, in seconds.
   *
   * If there is insufficient data to compute an estimate, the field will be empty.
   *
   * The estimate is computed as follows.
   * For each stop that has realtime trips for the route,
   *  the list of arrival times for those trips is examined.
   * The difference between consecutive arrival times is calculated.
   * If there are `N` trips, there will be `N-1` such arrival time diffs.
   * The estimated headway is the average of these diffs across
   * all stops.
   */
  estimatedHeadway?: number | undefined;
  /** List of service maps for this route. */
  serviceMaps: Route_ServiceMap[];
}

/** Enum describing possible policies for continuous pickup or drop-off. */
export enum Route_ContinuousPolicy {
  /** ALLOWED - Continuous pickup or drop-off allowed. */
  ALLOWED = 0,
  /** NOT_ALLOWED - Continuous pickup or drop-off not allowed. */
  NOT_ALLOWED = 1,
  /** PHONE_AGENCY - Must phone the agency to arrange continuous pickup or drop-off. */
  PHONE_AGENCY = 2,
  /** COORDINATE_WITH_DRIVER - Must coordinate with driver to arrange continuous pickup or drop-off. */
  COORDINATE_WITH_DRIVER = 3,
  UNRECOGNIZED = -1,
}

export function route_ContinuousPolicyFromJSON(
  object: any,
): Route_ContinuousPolicy {
  switch (object) {
    case 0:
    case "ALLOWED":
      return Route_ContinuousPolicy.ALLOWED;
    case 1:
    case "NOT_ALLOWED":
      return Route_ContinuousPolicy.NOT_ALLOWED;
    case 2:
    case "PHONE_AGENCY":
      return Route_ContinuousPolicy.PHONE_AGENCY;
    case 3:
    case "COORDINATE_WITH_DRIVER":
      return Route_ContinuousPolicy.COORDINATE_WITH_DRIVER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Route_ContinuousPolicy.UNRECOGNIZED;
  }
}

export function route_ContinuousPolicyToJSON(
  object: Route_ContinuousPolicy,
): string {
  switch (object) {
    case Route_ContinuousPolicy.ALLOWED:
      return "ALLOWED";
    case Route_ContinuousPolicy.NOT_ALLOWED:
      return "NOT_ALLOWED";
    case Route_ContinuousPolicy.PHONE_AGENCY:
      return "PHONE_AGENCY";
    case Route_ContinuousPolicy.COORDINATE_WITH_DRIVER:
      return "COORDINATE_WITH_DRIVER";
    case Route_ContinuousPolicy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Enum describing possible route types.
 * This corresponds to possible values of the `route_type` column in `routes.txt`.
 */
export enum Route_Type {
  LIGHT_RAIL = 0,
  SUBWAY = 1,
  RAIL = 2,
  BUS = 3,
  FERRY = 4,
  CABLE_TRAM = 5,
  AERIAL_LIFT = 6,
  FUNICULAR = 7,
  TROLLEY_BUS = 11,
  MONORAIL = 12,
  UNKNOWN = 100,
  UNRECOGNIZED = -1,
}

export function route_TypeFromJSON(object: any): Route_Type {
  switch (object) {
    case 0:
    case "LIGHT_RAIL":
      return Route_Type.LIGHT_RAIL;
    case 1:
    case "SUBWAY":
      return Route_Type.SUBWAY;
    case 2:
    case "RAIL":
      return Route_Type.RAIL;
    case 3:
    case "BUS":
      return Route_Type.BUS;
    case 4:
    case "FERRY":
      return Route_Type.FERRY;
    case 5:
    case "CABLE_TRAM":
      return Route_Type.CABLE_TRAM;
    case 6:
    case "AERIAL_LIFT":
      return Route_Type.AERIAL_LIFT;
    case 7:
    case "FUNICULAR":
      return Route_Type.FUNICULAR;
    case 11:
    case "TROLLEY_BUS":
      return Route_Type.TROLLEY_BUS;
    case 12:
    case "MONORAIL":
      return Route_Type.MONORAIL;
    case 100:
    case "UNKNOWN":
      return Route_Type.UNKNOWN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Route_Type.UNRECOGNIZED;
  }
}

export function route_TypeToJSON(object: Route_Type): string {
  switch (object) {
    case Route_Type.LIGHT_RAIL:
      return "LIGHT_RAIL";
    case Route_Type.SUBWAY:
      return "SUBWAY";
    case Route_Type.RAIL:
      return "RAIL";
    case Route_Type.BUS:
      return "BUS";
    case Route_Type.FERRY:
      return "FERRY";
    case Route_Type.CABLE_TRAM:
      return "CABLE_TRAM";
    case Route_Type.AERIAL_LIFT:
      return "AERIAL_LIFT";
    case Route_Type.FUNICULAR:
      return "FUNICULAR";
    case Route_Type.TROLLEY_BUS:
      return "TROLLEY_BUS";
    case Route_Type.MONORAIL:
      return "MONORAIL";
    case Route_Type.UNKNOWN:
      return "UNKNOWN";
    case Route_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Message describing the service maps view in routes.
 *
 * See the service maps documentation for more information on this
 * message and the associated field.
 */
export interface Route_ServiceMap {
  /** Config ID of the service map, as specified in the system configuration file. */
  configId: string;
  /**
   * Ordered list of stop at which this route calls.
   *
   * This list may be empty, in which case the route has no service in the service map.
   */
  stops: Stop_Reference[];
}

/** Reference is the reference type for the route resource. */
export interface Route_Reference {
  id: string;
  resource: Resource | undefined;
  system: System_Reference | undefined;
  color: string;
}

/**
 * The feed resource.
 *
 * Each feed is defined in the system configuration file.
 * Feeds are included in the public API because there are non-admin use-cases for this resource.
 * For example, an app might publish the staleness of realtime data
 *   by checking the last successful feed update time.
 *
 * More detailed information on a feed -- its full configuration, and the
 *   current status of its periodic updates -- can be retrieved through the admin API.
 */
export interface Feed {
  /** ID of the feed, as specified in the system configuration file. */
  id: string;
  /** Generic metadata about the feed resource. */
  resource: Resource | undefined;
  /**
   * System corresponding to this feed.
   * This is the parent resource in Transiter's resource hierarchy.
   */
  system: System_Reference | undefined;
  lastUpdateMs?: number | undefined;
  lastSuccessfulUpdateMs?: number | undefined;
  lastSkippedUpdateMs?: number | undefined;
  lastFailedUpdateMs?: number | undefined;
}

/** Reference is the reference type for the feed resource. */
export interface Feed_Reference {
  id: string;
  resource: Resource | undefined;
  system: System_Reference | undefined;
}

/**
 * The Agency resource.
 *
 * This resource corresponds to the [agency type in the GTFS static
 * specification](https://developers.google.com/transit/gtfs/reference#agencytxt).
 * Most of the fields in the resource come directly from the `agency.txt` table.
 * Transiter adds some additional related fields (alerts).
 */
export interface Agency {
  /** ID of the agency. This is the `agency_id` column in `agency.txt`. */
  id: string;
  /** Generic metadata about the agency resource. */
  resource: Resource | undefined;
  /**
   * System corresponding to this agency.
   * This is the parent resource in Transiter's resource hierarchy.
   */
  system: System_Reference | undefined;
  /** Name of the agency. This is the `agency_name` column in `agency.txt`. */
  name: string;
  /** URL of the agency. This is the `agency_url` column in `agency.txt`. */
  url: string;
  /** Timezone of the agency. This is the `agency_timezone` column in `agency.txt`. */
  timezone: string;
  /** Language of the agency. This is the `agency_lang` column in `agency.txt`. */
  language?: string | undefined;
  /** Phone number of the agency. This is the `agency_phone` column in `agency.txt`. */
  phone?: string | undefined;
  /**
   * URL where tickets for the agency's services ban be bought.
   * This is the `agency_fare_url` column in `agency.txt`.
   */
  fareUrl?: string | undefined;
  /** Email address of the agency. This is the `agency_email` column in `agency.txt`. */
  email?: string | undefined;
  routes: Route_Reference[];
  /**
   * List of active alerts for the agency.
   *
   * These are determined using the `informed_entity` field in
   * the [GTFS realtime alerts
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
   */
  alerts: Alert_Reference[];
}

/** Reference is the reference type for the agency resource. */
export interface Agency_Reference {
  id: string;
  resource: Resource | undefined;
  system: System_Reference | undefined;
  name: string;
}

/**
 * The Alert resource.
 *
 * This resource corresponds to the [alert type in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
 *
 * TODO; alphabetize the messages
 */
export interface Alert {
  /**
   * ID of the alert. This corresponds to the [ID field in the feed entity
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-feedentity)
   * corresponding to the alert.
   */
  id: string;
  /** Generic metadata about the alert resource. */
  resource: Resource | undefined;
  /**
   * System corresponding to this alert.
   * This is the parent resource in Transiter's resource hierarchy.
   */
  system: System_Reference | undefined;
  /** Cause of the alert. This corresponds to the `cause` field in the realtime alert message. */
  cause: Alert_Cause;
  /** Effect of the alert. This corresponds to the `effect` field in the realtime alert message. */
  effect: Alert_Effect;
  /**
   * The current active period, if the alert is currently active.
   * If the alert is not active this is empty.
   */
  currentActivePeriod?: Alert_ActivePeriod | undefined;
  /**
   * All active periods for this alert.
   * Transiter guarantees that these active periods have no overlap.
   */
  allActivePeriods: Alert_ActivePeriod[];
  /**
   * Header of the alert, in zero or more languages.
   * This corresponds to the `header_text` field in the realtime alert message.
   */
  header: Alert_Text[];
  /**
   * Description of the alert, in zero or more languages.
   * This corresponds to the `description_text` field in the realtime alert message.
   */
  description: Alert_Text[];
  /**
   * URL for additional information about the alert, in zero or more languages.
   * This corresponds to the `url` field in the realtime alert message.
   */
  url: Alert_Text[];
}

/**
 * Cause is the same as the [cause enum in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#enum-cause),
 * except `UNKNOWN_CAUSE` has value 0 instead of 1 to satisfy proto3 requirements.
 */
export enum Alert_Cause {
  UNKNOWN_CAUSE = 0,
  OTHER_CAUSE = 2,
  TECHNICAL_PROBLEM = 3,
  STRIKE = 4,
  DEMONSTRATION = 5,
  ACCIDENT = 6,
  HOLIDAY = 7,
  WEATHER = 8,
  MAINTENANCE = 9,
  CONSTRUCTION = 10,
  POLICE_ACTIVITY = 11,
  MEDICAL_EMERGENCY = 12,
  UNRECOGNIZED = -1,
}

export function alert_CauseFromJSON(object: any): Alert_Cause {
  switch (object) {
    case 0:
    case "UNKNOWN_CAUSE":
      return Alert_Cause.UNKNOWN_CAUSE;
    case 2:
    case "OTHER_CAUSE":
      return Alert_Cause.OTHER_CAUSE;
    case 3:
    case "TECHNICAL_PROBLEM":
      return Alert_Cause.TECHNICAL_PROBLEM;
    case 4:
    case "STRIKE":
      return Alert_Cause.STRIKE;
    case 5:
    case "DEMONSTRATION":
      return Alert_Cause.DEMONSTRATION;
    case 6:
    case "ACCIDENT":
      return Alert_Cause.ACCIDENT;
    case 7:
    case "HOLIDAY":
      return Alert_Cause.HOLIDAY;
    case 8:
    case "WEATHER":
      return Alert_Cause.WEATHER;
    case 9:
    case "MAINTENANCE":
      return Alert_Cause.MAINTENANCE;
    case 10:
    case "CONSTRUCTION":
      return Alert_Cause.CONSTRUCTION;
    case 11:
    case "POLICE_ACTIVITY":
      return Alert_Cause.POLICE_ACTIVITY;
    case 12:
    case "MEDICAL_EMERGENCY":
      return Alert_Cause.MEDICAL_EMERGENCY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Alert_Cause.UNRECOGNIZED;
  }
}

export function alert_CauseToJSON(object: Alert_Cause): string {
  switch (object) {
    case Alert_Cause.UNKNOWN_CAUSE:
      return "UNKNOWN_CAUSE";
    case Alert_Cause.OTHER_CAUSE:
      return "OTHER_CAUSE";
    case Alert_Cause.TECHNICAL_PROBLEM:
      return "TECHNICAL_PROBLEM";
    case Alert_Cause.STRIKE:
      return "STRIKE";
    case Alert_Cause.DEMONSTRATION:
      return "DEMONSTRATION";
    case Alert_Cause.ACCIDENT:
      return "ACCIDENT";
    case Alert_Cause.HOLIDAY:
      return "HOLIDAY";
    case Alert_Cause.WEATHER:
      return "WEATHER";
    case Alert_Cause.MAINTENANCE:
      return "MAINTENANCE";
    case Alert_Cause.CONSTRUCTION:
      return "CONSTRUCTION";
    case Alert_Cause.POLICE_ACTIVITY:
      return "POLICE_ACTIVITY";
    case Alert_Cause.MEDICAL_EMERGENCY:
      return "MEDICAL_EMERGENCY";
    case Alert_Cause.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * Effect is the same as the [effect enum in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#enum-effect),
 * except `UNKNOWN_EFFECT` has value 0 instead of 1 to satisfy proto3 requirements.
 */
export enum Alert_Effect {
  UNKNOWN_EFFECT = 0,
  NO_SERVICE = 1,
  REDUCED_SERVICE = 2,
  SIGNIFICANT_DELAYS = 3,
  DETOUR = 4,
  ADDITIONAL_SERVICE = 5,
  MODIFIED_SERVICE = 6,
  OTHER_EFFECT = 7,
  STOP_MOVED = 9,
  NO_EFFECT = 10,
  ACCESSIBILITY_ISSUE = 11,
  UNRECOGNIZED = -1,
}

export function alert_EffectFromJSON(object: any): Alert_Effect {
  switch (object) {
    case 0:
    case "UNKNOWN_EFFECT":
      return Alert_Effect.UNKNOWN_EFFECT;
    case 1:
    case "NO_SERVICE":
      return Alert_Effect.NO_SERVICE;
    case 2:
    case "REDUCED_SERVICE":
      return Alert_Effect.REDUCED_SERVICE;
    case 3:
    case "SIGNIFICANT_DELAYS":
      return Alert_Effect.SIGNIFICANT_DELAYS;
    case 4:
    case "DETOUR":
      return Alert_Effect.DETOUR;
    case 5:
    case "ADDITIONAL_SERVICE":
      return Alert_Effect.ADDITIONAL_SERVICE;
    case 6:
    case "MODIFIED_SERVICE":
      return Alert_Effect.MODIFIED_SERVICE;
    case 7:
    case "OTHER_EFFECT":
      return Alert_Effect.OTHER_EFFECT;
    case 9:
    case "STOP_MOVED":
      return Alert_Effect.STOP_MOVED;
    case 10:
    case "NO_EFFECT":
      return Alert_Effect.NO_EFFECT;
    case 11:
    case "ACCESSIBILITY_ISSUE":
      return Alert_Effect.ACCESSIBILITY_ISSUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Alert_Effect.UNRECOGNIZED;
  }
}

export function alert_EffectToJSON(object: Alert_Effect): string {
  switch (object) {
    case Alert_Effect.UNKNOWN_EFFECT:
      return "UNKNOWN_EFFECT";
    case Alert_Effect.NO_SERVICE:
      return "NO_SERVICE";
    case Alert_Effect.REDUCED_SERVICE:
      return "REDUCED_SERVICE";
    case Alert_Effect.SIGNIFICANT_DELAYS:
      return "SIGNIFICANT_DELAYS";
    case Alert_Effect.DETOUR:
      return "DETOUR";
    case Alert_Effect.ADDITIONAL_SERVICE:
      return "ADDITIONAL_SERVICE";
    case Alert_Effect.MODIFIED_SERVICE:
      return "MODIFIED_SERVICE";
    case Alert_Effect.OTHER_EFFECT:
      return "OTHER_EFFECT";
    case Alert_Effect.STOP_MOVED:
      return "STOP_MOVED";
    case Alert_Effect.NO_EFFECT:
      return "NO_EFFECT";
    case Alert_Effect.ACCESSIBILITY_ISSUE:
      return "ACCESSIBILITY_ISSUE";
    case Alert_Effect.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * The active period message describes a period when an alert is active.
 * It corresponds the the [time range message in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#message-timerange).
 */
export interface Alert_ActivePeriod {
  /**
   * Unix timestamp of the start time of the active period.
   * If not set, the alert be interpreted
   * as being always active up to the end time.
   */
  startsAt?: number | undefined;
  /**
   * Unix timestamp of the end time of the active period.
   * If not set, the alert be interpreted as being indefinitely active.
   */
  endsAt?: number | undefined;
}

/**
 * The text message describes an alert header/description/URL in a specified language.
 * It corresponds the the [translation message in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#message-translation).
 */
export interface Alert_Text {
  /** Content of the text. */
  text: string;
  /** Language of this text. */
  language: string;
}

/** Reference is the reference type for the agency resource. */
export interface Alert_Reference {
  id: string;
  resource: Resource | undefined;
  system: System_Reference | undefined;
  cause: Alert_Cause;
  effect: Alert_Effect;
}

export interface Transfer {
  /**
   * TODO: id, system, resource
   * Probably will use the pk of the DB row for the ID
   */
  fromStop: Stop_Reference | undefined;
  toStop: Stop_Reference | undefined;
  type: Transfer_Type;
  minTransferTime?: number | undefined;
  distance?: number | undefined;
}

export enum Transfer_Type {
  RECOMMENDED = 0,
  TIMED = 1,
  REQUIRES_TIME = 2,
  NO_POSSIBLE = 3,
  UNRECOGNIZED = -1,
}

export function transfer_TypeFromJSON(object: any): Transfer_Type {
  switch (object) {
    case 0:
    case "RECOMMENDED":
      return Transfer_Type.RECOMMENDED;
    case 1:
    case "TIMED":
      return Transfer_Type.TIMED;
    case 2:
    case "REQUIRES_TIME":
      return Transfer_Type.REQUIRES_TIME;
    case 3:
    case "NO_POSSIBLE":
      return Transfer_Type.NO_POSSIBLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Transfer_Type.UNRECOGNIZED;
  }
}

export function transfer_TypeToJSON(object: Transfer_Type): string {
  switch (object) {
    case Transfer_Type.RECOMMENDED:
      return "RECOMMENDED";
    case Transfer_Type.TIMED:
      return "TIMED";
    case Transfer_Type.REQUIRES_TIME:
      return "REQUIRES_TIME";
    case Transfer_Type.NO_POSSIBLE:
      return "NO_POSSIBLE";
    case Transfer_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Shape {
  /** Unique ID for the shape. */
  id: string;
  /** Ordered list of points that make up the shape. */
  points: Shape_ShapePoint[];
}

/** A point within the shape. */
export interface Shape_ShapePoint {
  /** Latitude of the point. */
  latitude: number;
  /** Longitude of the point. */
  longitude: number;
  /** Distance from the start of the shape to this point. */
  distance?: number | undefined;
}

export interface Shape_Reference {
  id: string;
  resource: Resource | undefined;
}

function createBaseEntrypointRequest(): EntrypointRequest {
  return {};
}

export const EntrypointRequest = {
  fromJSON(_: any): EntrypointRequest {
    return {};
  },

  toJSON(_: EntrypointRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

function createBaseEntrypointReply(): EntrypointReply {
  return { transiter: undefined, systems: undefined };
}

export const EntrypointReply = {
  fromJSON(object: any): EntrypointReply {
    return {
      transiter: isSet(object.transiter)
        ? EntrypointReply_TransiterDetails.fromJSON(object.transiter)
        : undefined,
      systems: isSet(object.systems)
        ? ChildResources.fromJSON(object.systems)
        : undefined,
    };
  },

  toJSON(message: EntrypointReply): unknown {
    const obj: any = {};
    message.transiter !== undefined &&
      (obj.transiter = message.transiter
        ? EntrypointReply_TransiterDetails.toJSON(message.transiter)
        : undefined);
    message.systems !== undefined &&
      (obj.systems = message.systems
        ? ChildResources.toJSON(message.systems)
        : undefined);
    return obj;
  },
};

function createBaseEntrypointReply_TransiterDetails(): EntrypointReply_TransiterDetails {
  return { version: "", href: "", build: undefined };
}

export const EntrypointReply_TransiterDetails = {
  fromJSON(object: any): EntrypointReply_TransiterDetails {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      href: isSet(object.href) ? String(object.href) : "",
      build: isSet(object.build)
        ? EntrypointReply_TransiterDetails_Build.fromJSON(object.build)
        : undefined,
    };
  },

  toJSON(message: EntrypointReply_TransiterDetails): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.href !== undefined && (obj.href = message.href);
    message.build !== undefined &&
      (obj.build = message.build
        ? EntrypointReply_TransiterDetails_Build.toJSON(message.build)
        : undefined);
    return obj;
  },
};

function createBaseEntrypointReply_TransiterDetails_Build(): EntrypointReply_TransiterDetails_Build {
  return {
    number: "",
    builtAt: "",
    builtAtTimestamp: "",
    gitCommitHash: "",
    href: "",
  };
}

export const EntrypointReply_TransiterDetails_Build = {
  fromJSON(object: any): EntrypointReply_TransiterDetails_Build {
    return {
      number: isSet(object.number) ? String(object.number) : "",
      builtAt: isSet(object.builtAt) ? String(object.builtAt) : "",
      builtAtTimestamp: isSet(object.builtAtTimestamp)
        ? String(object.builtAtTimestamp)
        : "",
      gitCommitHash: isSet(object.gitCommitHash)
        ? String(object.gitCommitHash)
        : "",
      href: isSet(object.href) ? String(object.href) : "",
    };
  },

  toJSON(message: EntrypointReply_TransiterDetails_Build): unknown {
    const obj: any = {};
    message.number !== undefined && (obj.number = message.number);
    message.builtAt !== undefined && (obj.builtAt = message.builtAt);
    message.builtAtTimestamp !== undefined &&
      (obj.builtAtTimestamp = message.builtAtTimestamp);
    message.gitCommitHash !== undefined &&
      (obj.gitCommitHash = message.gitCommitHash);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseListSystemsRequest(): ListSystemsRequest {
  return {};
}

export const ListSystemsRequest = {
  fromJSON(_: any): ListSystemsRequest {
    return {};
  },

  toJSON(_: ListSystemsRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

function createBaseListSystemsReply(): ListSystemsReply {
  return { systems: [] };
}

export const ListSystemsReply = {
  fromJSON(object: any): ListSystemsReply {
    return {
      systems: Array.isArray(object?.systems)
        ? object.systems.map((e: any) => System.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListSystemsReply): unknown {
    const obj: any = {};
    if (message.systems) {
      obj.systems = message.systems.map((e) =>
        e ? System.toJSON(e) : undefined,
      );
    } else {
      obj.systems = [];
    }
    return obj;
  },
};

function createBaseGetSystemRequest(): GetSystemRequest {
  return { systemId: "" };
}

export const GetSystemRequest = {
  fromJSON(object: any): GetSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: GetSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListAgenciesRequest(): ListAgenciesRequest {
  return { systemId: "" };
}

export const ListAgenciesRequest = {
  fromJSON(object: any): ListAgenciesRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListAgenciesRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListAgenciesReply(): ListAgenciesReply {
  return { agencies: [] };
}

export const ListAgenciesReply = {
  fromJSON(object: any): ListAgenciesReply {
    return {
      agencies: Array.isArray(object?.agencies)
        ? object.agencies.map((e: any) => Agency.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListAgenciesReply): unknown {
    const obj: any = {};
    if (message.agencies) {
      obj.agencies = message.agencies.map((e) =>
        e ? Agency.toJSON(e) : undefined,
      );
    } else {
      obj.agencies = [];
    }
    return obj;
  },
};

function createBaseGetAgencyRequest(): GetAgencyRequest {
  return { systemId: "", agencyId: "" };
}

export const GetAgencyRequest = {
  fromJSON(object: any): GetAgencyRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      agencyId: isSet(object.agencyId) ? String(object.agencyId) : "",
    };
  },

  toJSON(message: GetAgencyRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.agencyId !== undefined && (obj.agencyId = message.agencyId);
    return obj;
  },
};

function createBaseListStopsRequest(): ListStopsRequest {
  return {
    systemId: "",
    searchMode: undefined,
    onlyReturnSpecifiedIds: false,
    id: [],
    firstId: undefined,
    limit: undefined,
    skipStopTimes: false,
    skipServiceMaps: false,
    skipAlerts: false,
    skipTransfers: false,
    maxDistance: undefined,
    latitude: undefined,
    longitude: undefined,
  };
}

export const ListStopsRequest = {
  fromJSON(object: any): ListStopsRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      searchMode: isSet(object.searchMode)
        ? listStopsRequest_SearchModeFromJSON(object.searchMode)
        : undefined,
      onlyReturnSpecifiedIds: isSet(object.onlyReturnSpecifiedIds)
        ? Boolean(object.onlyReturnSpecifiedIds)
        : false,
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      firstId: isSet(object.firstId) ? String(object.firstId) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      skipStopTimes: isSet(object.skipStopTimes)
        ? Boolean(object.skipStopTimes)
        : false,
      skipServiceMaps: isSet(object.skipServiceMaps)
        ? Boolean(object.skipServiceMaps)
        : false,
      skipAlerts: isSet(object.skipAlerts) ? Boolean(object.skipAlerts) : false,
      skipTransfers: isSet(object.skipTransfers)
        ? Boolean(object.skipTransfers)
        : false,
      maxDistance: isSet(object.maxDistance)
        ? Number(object.maxDistance)
        : undefined,
      latitude: isSet(object.latitude) ? Number(object.latitude) : undefined,
      longitude: isSet(object.longitude) ? Number(object.longitude) : undefined,
    };
  },

  toJSON(message: ListStopsRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.searchMode !== undefined &&
      (obj.searchMode =
        message.searchMode !== undefined
          ? listStopsRequest_SearchModeToJSON(message.searchMode)
          : undefined);
    message.onlyReturnSpecifiedIds !== undefined &&
      (obj.onlyReturnSpecifiedIds = message.onlyReturnSpecifiedIds);
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    message.firstId !== undefined && (obj.firstId = message.firstId);
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.skipStopTimes !== undefined &&
      (obj.skipStopTimes = message.skipStopTimes);
    message.skipServiceMaps !== undefined &&
      (obj.skipServiceMaps = message.skipServiceMaps);
    message.skipAlerts !== undefined && (obj.skipAlerts = message.skipAlerts);
    message.skipTransfers !== undefined &&
      (obj.skipTransfers = message.skipTransfers);
    message.maxDistance !== undefined &&
      (obj.maxDistance = message.maxDistance);
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    return obj;
  },
};

function createBaseListStopsReply(): ListStopsReply {
  return { stops: [], nextId: undefined };
}

export const ListStopsReply = {
  fromJSON(object: any): ListStopsReply {
    return {
      stops: Array.isArray(object?.stops)
        ? object.stops.map((e: any) => Stop.fromJSON(e))
        : [],
      nextId: isSet(object.nextId) ? String(object.nextId) : undefined,
    };
  },

  toJSON(message: ListStopsReply): unknown {
    const obj: any = {};
    if (message.stops) {
      obj.stops = message.stops.map((e) => (e ? Stop.toJSON(e) : undefined));
    } else {
      obj.stops = [];
    }
    message.nextId !== undefined && (obj.nextId = message.nextId);
    return obj;
  },
};

function createBaseGetStopRequest(): GetStopRequest {
  return {
    systemId: "",
    stopId: "",
    skipStopTimes: false,
    skipServiceMaps: false,
    skipAlerts: false,
    skipTransfers: false,
  };
}

export const GetStopRequest = {
  fromJSON(object: any): GetStopRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      stopId: isSet(object.stopId) ? String(object.stopId) : "",
      skipStopTimes: isSet(object.skipStopTimes)
        ? Boolean(object.skipStopTimes)
        : false,
      skipServiceMaps: isSet(object.skipServiceMaps)
        ? Boolean(object.skipServiceMaps)
        : false,
      skipAlerts: isSet(object.skipAlerts) ? Boolean(object.skipAlerts) : false,
      skipTransfers: isSet(object.skipTransfers)
        ? Boolean(object.skipTransfers)
        : false,
    };
  },

  toJSON(message: GetStopRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.stopId !== undefined && (obj.stopId = message.stopId);
    message.skipStopTimes !== undefined &&
      (obj.skipStopTimes = message.skipStopTimes);
    message.skipServiceMaps !== undefined &&
      (obj.skipServiceMaps = message.skipServiceMaps);
    message.skipAlerts !== undefined && (obj.skipAlerts = message.skipAlerts);
    message.skipTransfers !== undefined &&
      (obj.skipTransfers = message.skipTransfers);
    return obj;
  },
};

function createBaseListRoutesRequest(): ListRoutesRequest {
  return {
    systemId: "",
    skipEstimatedHeadways: false,
    skipServiceMaps: false,
    skipAlerts: false,
  };
}

export const ListRoutesRequest = {
  fromJSON(object: any): ListRoutesRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      skipEstimatedHeadways: isSet(object.skipEstimatedHeadways)
        ? Boolean(object.skipEstimatedHeadways)
        : false,
      skipServiceMaps: isSet(object.skipServiceMaps)
        ? Boolean(object.skipServiceMaps)
        : false,
      skipAlerts: isSet(object.skipAlerts) ? Boolean(object.skipAlerts) : false,
    };
  },

  toJSON(message: ListRoutesRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.skipEstimatedHeadways !== undefined &&
      (obj.skipEstimatedHeadways = message.skipEstimatedHeadways);
    message.skipServiceMaps !== undefined &&
      (obj.skipServiceMaps = message.skipServiceMaps);
    message.skipAlerts !== undefined && (obj.skipAlerts = message.skipAlerts);
    return obj;
  },
};

function createBaseListRoutesReply(): ListRoutesReply {
  return { routes: [] };
}

export const ListRoutesReply = {
  fromJSON(object: any): ListRoutesReply {
    return {
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => Route.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListRoutesReply): unknown {
    const obj: any = {};
    if (message.routes) {
      obj.routes = message.routes.map((e) => (e ? Route.toJSON(e) : undefined));
    } else {
      obj.routes = [];
    }
    return obj;
  },
};

function createBaseGetRouteRequest(): GetRouteRequest {
  return {
    systemId: "",
    routeId: "",
    skipEstimatedHeadways: false,
    skipServiceMaps: false,
    skipAlerts: false,
  };
}

export const GetRouteRequest = {
  fromJSON(object: any): GetRouteRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      routeId: isSet(object.routeId) ? String(object.routeId) : "",
      skipEstimatedHeadways: isSet(object.skipEstimatedHeadways)
        ? Boolean(object.skipEstimatedHeadways)
        : false,
      skipServiceMaps: isSet(object.skipServiceMaps)
        ? Boolean(object.skipServiceMaps)
        : false,
      skipAlerts: isSet(object.skipAlerts) ? Boolean(object.skipAlerts) : false,
    };
  },

  toJSON(message: GetRouteRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.routeId !== undefined && (obj.routeId = message.routeId);
    message.skipEstimatedHeadways !== undefined &&
      (obj.skipEstimatedHeadways = message.skipEstimatedHeadways);
    message.skipServiceMaps !== undefined &&
      (obj.skipServiceMaps = message.skipServiceMaps);
    message.skipAlerts !== undefined && (obj.skipAlerts = message.skipAlerts);
    return obj;
  },
};

function createBaseListTripsRequest(): ListTripsRequest {
  return { systemId: "", routeId: "" };
}

export const ListTripsRequest = {
  fromJSON(object: any): ListTripsRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      routeId: isSet(object.routeId) ? String(object.routeId) : "",
    };
  },

  toJSON(message: ListTripsRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.routeId !== undefined && (obj.routeId = message.routeId);
    return obj;
  },
};

function createBaseListTripsReply(): ListTripsReply {
  return { trips: [] };
}

export const ListTripsReply = {
  fromJSON(object: any): ListTripsReply {
    return {
      trips: Array.isArray(object?.trips)
        ? object.trips.map((e: any) => Trip.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTripsReply): unknown {
    const obj: any = {};
    if (message.trips) {
      obj.trips = message.trips.map((e) => (e ? Trip.toJSON(e) : undefined));
    } else {
      obj.trips = [];
    }
    return obj;
  },
};

function createBaseListAlertsRequest(): ListAlertsRequest {
  return { systemId: "", alertId: [] };
}

export const ListAlertsRequest = {
  fromJSON(object: any): ListAlertsRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      alertId: Array.isArray(object?.alertId)
        ? object.alertId.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListAlertsRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    if (message.alertId) {
      obj.alertId = message.alertId.map((e) => e);
    } else {
      obj.alertId = [];
    }
    return obj;
  },
};

function createBaseListAlertsReply(): ListAlertsReply {
  return { alerts: [] };
}

export const ListAlertsReply = {
  fromJSON(object: any): ListAlertsReply {
    return {
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListAlertsReply): unknown {
    const obj: any = {};
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) => (e ? Alert.toJSON(e) : undefined));
    } else {
      obj.alerts = [];
    }
    return obj;
  },
};

function createBaseGetAlertRequest(): GetAlertRequest {
  return { systemId: "", alertId: "" };
}

export const GetAlertRequest = {
  fromJSON(object: any): GetAlertRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      alertId: isSet(object.alertId) ? String(object.alertId) : "",
    };
  },

  toJSON(message: GetAlertRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.alertId !== undefined && (obj.alertId = message.alertId);
    return obj;
  },
};

function createBaseGetTripRequest(): GetTripRequest {
  return { systemId: "", routeId: "", tripId: "" };
}

export const GetTripRequest = {
  fromJSON(object: any): GetTripRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      routeId: isSet(object.routeId) ? String(object.routeId) : "",
      tripId: isSet(object.tripId) ? String(object.tripId) : "",
    };
  },

  toJSON(message: GetTripRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.routeId !== undefined && (obj.routeId = message.routeId);
    message.tripId !== undefined && (obj.tripId = message.tripId);
    return obj;
  },
};

function createBaseListFeedsRequest(): ListFeedsRequest {
  return { systemId: "" };
}

export const ListFeedsRequest = {
  fromJSON(object: any): ListFeedsRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListFeedsRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListFeedsReply(): ListFeedsReply {
  return { feeds: [] };
}

export const ListFeedsReply = {
  fromJSON(object: any): ListFeedsReply {
    return {
      feeds: Array.isArray(object?.feeds)
        ? object.feeds.map((e: any) => Feed.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListFeedsReply): unknown {
    const obj: any = {};
    if (message.feeds) {
      obj.feeds = message.feeds.map((e) => (e ? Feed.toJSON(e) : undefined));
    } else {
      obj.feeds = [];
    }
    return obj;
  },
};

function createBaseGetFeedRequest(): GetFeedRequest {
  return { systemId: "", feedId: "" };
}

export const GetFeedRequest = {
  fromJSON(object: any): GetFeedRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      feedId: isSet(object.feedId) ? String(object.feedId) : "",
    };
  },

  toJSON(message: GetFeedRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.feedId !== undefined && (obj.feedId = message.feedId);
    return obj;
  },
};

function createBaseListTransfersRequest(): ListTransfersRequest {
  return { systemId: "" };
}

export const ListTransfersRequest = {
  fromJSON(object: any): ListTransfersRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListTransfersRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListTransfersReply(): ListTransfersReply {
  return { transfers: [] };
}

export const ListTransfersReply = {
  fromJSON(object: any): ListTransfersReply {
    return {
      transfers: Array.isArray(object?.transfers)
        ? object.transfers.map((e: any) => Transfer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTransfersReply): unknown {
    const obj: any = {};
    if (message.transfers) {
      obj.transfers = message.transfers.map((e) =>
        e ? Transfer.toJSON(e) : undefined,
      );
    } else {
      obj.transfers = [];
    }
    return obj;
  },
};

function createBaseListVehiclesRequest(): ListVehiclesRequest {
  return {
    systemId: "",
    searchMode: undefined,
    onlyReturnSpecifiedIds: false,
    id: [],
    firstId: undefined,
    limit: undefined,
    maxDistance: undefined,
    latitude: undefined,
    longitude: undefined,
  };
}

export const ListVehiclesRequest = {
  fromJSON(object: any): ListVehiclesRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      searchMode: isSet(object.searchMode)
        ? listVehiclesRequest_SearchModeFromJSON(object.searchMode)
        : undefined,
      onlyReturnSpecifiedIds: isSet(object.onlyReturnSpecifiedIds)
        ? Boolean(object.onlyReturnSpecifiedIds)
        : false,
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      firstId: isSet(object.firstId) ? String(object.firstId) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
      maxDistance: isSet(object.maxDistance)
        ? Number(object.maxDistance)
        : undefined,
      latitude: isSet(object.latitude) ? Number(object.latitude) : undefined,
      longitude: isSet(object.longitude) ? Number(object.longitude) : undefined,
    };
  },

  toJSON(message: ListVehiclesRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.searchMode !== undefined &&
      (obj.searchMode =
        message.searchMode !== undefined
          ? listVehiclesRequest_SearchModeToJSON(message.searchMode)
          : undefined);
    message.onlyReturnSpecifiedIds !== undefined &&
      (obj.onlyReturnSpecifiedIds = message.onlyReturnSpecifiedIds);
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    message.firstId !== undefined && (obj.firstId = message.firstId);
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    message.maxDistance !== undefined &&
      (obj.maxDistance = message.maxDistance);
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    return obj;
  },
};

function createBaseListVehiclesReply(): ListVehiclesReply {
  return { vehicles: [], nextId: undefined };
}

export const ListVehiclesReply = {
  fromJSON(object: any): ListVehiclesReply {
    return {
      vehicles: Array.isArray(object?.vehicles)
        ? object.vehicles.map((e: any) => Vehicle.fromJSON(e))
        : [],
      nextId: isSet(object.nextId) ? String(object.nextId) : undefined,
    };
  },

  toJSON(message: ListVehiclesReply): unknown {
    const obj: any = {};
    if (message.vehicles) {
      obj.vehicles = message.vehicles.map((e) =>
        e ? Vehicle.toJSON(e) : undefined,
      );
    } else {
      obj.vehicles = [];
    }
    message.nextId !== undefined && (obj.nextId = message.nextId);
    return obj;
  },
};

function createBaseGetVehicleRequest(): GetVehicleRequest {
  return { systemId: "", vehicleId: "" };
}

export const GetVehicleRequest = {
  fromJSON(object: any): GetVehicleRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      vehicleId: isSet(object.vehicleId) ? String(object.vehicleId) : "",
    };
  },

  toJSON(message: GetVehicleRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.vehicleId !== undefined && (obj.vehicleId = message.vehicleId);
    return obj;
  },
};

function createBaseListShapesRequest(): ListShapesRequest {
  return {
    systemId: "",
    onlyReturnSpecifiedIds: false,
    id: [],
    firstId: undefined,
    limit: undefined,
  };
}

export const ListShapesRequest = {
  fromJSON(object: any): ListShapesRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      onlyReturnSpecifiedIds: isSet(object.onlyReturnSpecifiedIds)
        ? Boolean(object.onlyReturnSpecifiedIds)
        : false,
      id: Array.isArray(object?.id) ? object.id.map((e: any) => String(e)) : [],
      firstId: isSet(object.firstId) ? String(object.firstId) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
    };
  },

  toJSON(message: ListShapesRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.onlyReturnSpecifiedIds !== undefined &&
      (obj.onlyReturnSpecifiedIds = message.onlyReturnSpecifiedIds);
    if (message.id) {
      obj.id = message.id.map((e) => e);
    } else {
      obj.id = [];
    }
    message.firstId !== undefined && (obj.firstId = message.firstId);
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    return obj;
  },
};

function createBaseListShapesReply(): ListShapesReply {
  return { shapes: [], nextId: undefined };
}

export const ListShapesReply = {
  fromJSON(object: any): ListShapesReply {
    return {
      shapes: Array.isArray(object?.shapes)
        ? object.shapes.map((e: any) => Shape.fromJSON(e))
        : [],
      nextId: isSet(object.nextId) ? String(object.nextId) : undefined,
    };
  },

  toJSON(message: ListShapesReply): unknown {
    const obj: any = {};
    if (message.shapes) {
      obj.shapes = message.shapes.map((e) => (e ? Shape.toJSON(e) : undefined));
    } else {
      obj.shapes = [];
    }
    message.nextId !== undefined && (obj.nextId = message.nextId);
    return obj;
  },
};

function createBaseGetShapeRequest(): GetShapeRequest {
  return { systemId: "", shapeId: "" };
}

export const GetShapeRequest = {
  fromJSON(object: any): GetShapeRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      shapeId: isSet(object.shapeId) ? String(object.shapeId) : "",
    };
  },

  toJSON(message: GetShapeRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.shapeId !== undefined && (obj.shapeId = message.shapeId);
    return obj;
  },
};

function createBaseSystem(): System {
  return {
    id: "",
    resource: undefined,
    name: "",
    status: 0,
    agencies: undefined,
    feeds: undefined,
    routes: undefined,
    stops: undefined,
    transfers: undefined,
  };
}

export const System = {
  fromJSON(object: any): System {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      status: isSet(object.status) ? system_StatusFromJSON(object.status) : 0,
      agencies: isSet(object.agencies)
        ? ChildResources.fromJSON(object.agencies)
        : undefined,
      feeds: isSet(object.feeds)
        ? ChildResources.fromJSON(object.feeds)
        : undefined,
      routes: isSet(object.routes)
        ? ChildResources.fromJSON(object.routes)
        : undefined,
      stops: isSet(object.stops)
        ? ChildResources.fromJSON(object.stops)
        : undefined,
      transfers: isSet(object.transfers)
        ? ChildResources.fromJSON(object.transfers)
        : undefined,
    };
  },

  toJSON(message: System): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.status !== undefined &&
      (obj.status = system_StatusToJSON(message.status));
    message.agencies !== undefined &&
      (obj.agencies = message.agencies
        ? ChildResources.toJSON(message.agencies)
        : undefined);
    message.feeds !== undefined &&
      (obj.feeds = message.feeds
        ? ChildResources.toJSON(message.feeds)
        : undefined);
    message.routes !== undefined &&
      (obj.routes = message.routes
        ? ChildResources.toJSON(message.routes)
        : undefined);
    message.stops !== undefined &&
      (obj.stops = message.stops
        ? ChildResources.toJSON(message.stops)
        : undefined);
    message.transfers !== undefined &&
      (obj.transfers = message.transfers
        ? ChildResources.toJSON(message.transfers)
        : undefined);
    return obj;
  },
};

function createBaseSystem_Reference(): System_Reference {
  return { id: "", resource: undefined };
}

export const System_Reference = {
  fromJSON(object: any): System_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
    };
  },

  toJSON(message: System_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },
};

function createBaseResource(): Resource {
  return { path: "", href: undefined };
}

export const Resource = {
  fromJSON(object: any): Resource {
    return {
      path: isSet(object.path) ? String(object.path) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Resource): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseChildResources(): ChildResources {
  return { count: 0, href: undefined };
}

export const ChildResources = {
  fromJSON(object: any): ChildResources {
    return {
      count: isSet(object.count) ? Number(object.count) : 0,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: ChildResources): unknown {
    const obj: any = {};
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseStop(): Stop {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    code: undefined,
    name: undefined,
    description: undefined,
    zoneId: undefined,
    latitude: undefined,
    longitude: undefined,
    url: undefined,
    type: 0,
    parentStop: undefined,
    childStops: [],
    timezone: undefined,
    wheelchairBoarding: undefined,
    platformCode: undefined,
    serviceMaps: [],
    alerts: [],
    stopTimes: [],
    transfers: [],
    headsignRules: [],
  };
}

export const Stop = {
  fromJSON(object: any): Stop {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      code: isSet(object.code) ? String(object.code) : undefined,
      name: isSet(object.name) ? String(object.name) : undefined,
      description: isSet(object.description)
        ? String(object.description)
        : undefined,
      zoneId: isSet(object.zoneId) ? String(object.zoneId) : undefined,
      latitude: isSet(object.latitude) ? Number(object.latitude) : undefined,
      longitude: isSet(object.longitude) ? Number(object.longitude) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      type: isSet(object.type) ? stop_TypeFromJSON(object.type) : 0,
      parentStop: isSet(object.parentStop)
        ? Stop_Reference.fromJSON(object.parentStop)
        : undefined,
      childStops: Array.isArray(object?.childStops)
        ? object.childStops.map((e: any) => Stop_Reference.fromJSON(e))
        : [],
      timezone: isSet(object.timezone) ? String(object.timezone) : undefined,
      wheelchairBoarding: isSet(object.wheelchairBoarding)
        ? Boolean(object.wheelchairBoarding)
        : undefined,
      platformCode: isSet(object.platformCode)
        ? String(object.platformCode)
        : undefined,
      serviceMaps: Array.isArray(object?.serviceMaps)
        ? object.serviceMaps.map((e: any) => Stop_ServiceMap.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert_Reference.fromJSON(e))
        : [],
      stopTimes: Array.isArray(object?.stopTimes)
        ? object.stopTimes.map((e: any) => StopTime.fromJSON(e))
        : [],
      transfers: Array.isArray(object?.transfers)
        ? object.transfers.map((e: any) => Transfer.fromJSON(e))
        : [],
      headsignRules: Array.isArray(object?.headsignRules)
        ? object.headsignRules.map((e: any) => Stop_HeadsignRule.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Stop): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.code !== undefined && (obj.code = message.code);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.zoneId !== undefined && (obj.zoneId = message.zoneId);
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    message.url !== undefined && (obj.url = message.url);
    message.type !== undefined && (obj.type = stop_TypeToJSON(message.type));
    message.parentStop !== undefined &&
      (obj.parentStop = message.parentStop
        ? Stop_Reference.toJSON(message.parentStop)
        : undefined);
    if (message.childStops) {
      obj.childStops = message.childStops.map((e) =>
        e ? Stop_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.childStops = [];
    }
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.wheelchairBoarding !== undefined &&
      (obj.wheelchairBoarding = message.wheelchairBoarding);
    message.platformCode !== undefined &&
      (obj.platformCode = message.platformCode);
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? Stop_ServiceMap.toJSON(e) : undefined,
      );
    } else {
      obj.serviceMaps = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.alerts = [];
    }
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? StopTime.toJSON(e) : undefined,
      );
    } else {
      obj.stopTimes = [];
    }
    if (message.transfers) {
      obj.transfers = message.transfers.map((e) =>
        e ? Transfer.toJSON(e) : undefined,
      );
    } else {
      obj.transfers = [];
    }
    if (message.headsignRules) {
      obj.headsignRules = message.headsignRules.map((e) =>
        e ? Stop_HeadsignRule.toJSON(e) : undefined,
      );
    } else {
      obj.headsignRules = [];
    }
    return obj;
  },
};

function createBaseStop_ServiceMap(): Stop_ServiceMap {
  return { configId: "", routes: [] };
}

export const Stop_ServiceMap = {
  fromJSON(object: any): Stop_ServiceMap {
    return {
      configId: isSet(object.configId) ? String(object.configId) : "",
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => Route_Reference.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Stop_ServiceMap): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? Route_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.routes = [];
    }
    return obj;
  },
};

function createBaseStop_HeadsignRule(): Stop_HeadsignRule {
  return { stop: undefined, priority: 0, track: undefined, headsign: "" };
}

export const Stop_HeadsignRule = {
  fromJSON(object: any): Stop_HeadsignRule {
    return {
      stop: isSet(object.stop)
        ? Stop_Reference.fromJSON(object.stop)
        : undefined,
      priority: isSet(object.priority) ? Number(object.priority) : 0,
      track: isSet(object.track) ? String(object.track) : undefined,
      headsign: isSet(object.headsign) ? String(object.headsign) : "",
    };
  },

  toJSON(message: Stop_HeadsignRule): unknown {
    const obj: any = {};
    message.stop !== undefined &&
      (obj.stop = message.stop
        ? Stop_Reference.toJSON(message.stop)
        : undefined);
    message.priority !== undefined &&
      (obj.priority = Math.round(message.priority));
    message.track !== undefined && (obj.track = message.track);
    message.headsign !== undefined && (obj.headsign = message.headsign);
    return obj;
  },
};

function createBaseStop_Reference(): Stop_Reference {
  return { id: "", resource: undefined, system: undefined, name: undefined };
}

export const Stop_Reference = {
  fromJSON(object: any): Stop_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      name: isSet(object.name) ? String(object.name) : undefined,
    };
  },

  toJSON(message: Stop_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

function createBaseStopTime(): StopTime {
  return {
    stop: undefined,
    trip: undefined,
    arrival: undefined,
    departure: undefined,
    future: false,
    stopSequence: 0,
    headsign: undefined,
    track: undefined,
  };
}

export const StopTime = {
  fromJSON(object: any): StopTime {
    return {
      stop: isSet(object.stop)
        ? Stop_Reference.fromJSON(object.stop)
        : undefined,
      trip: isSet(object.trip)
        ? Trip_Reference.fromJSON(object.trip)
        : undefined,
      arrival: isSet(object.arrival)
        ? StopTime_EstimatedTime.fromJSON(object.arrival)
        : undefined,
      departure: isSet(object.departure)
        ? StopTime_EstimatedTime.fromJSON(object.departure)
        : undefined,
      future: isSet(object.future) ? Boolean(object.future) : false,
      stopSequence: isSet(object.stopSequence)
        ? Number(object.stopSequence)
        : 0,
      headsign: isSet(object.headsign) ? String(object.headsign) : undefined,
      track: isSet(object.track) ? String(object.track) : undefined,
    };
  },

  toJSON(message: StopTime): unknown {
    const obj: any = {};
    message.stop !== undefined &&
      (obj.stop = message.stop
        ? Stop_Reference.toJSON(message.stop)
        : undefined);
    message.trip !== undefined &&
      (obj.trip = message.trip
        ? Trip_Reference.toJSON(message.trip)
        : undefined);
    message.arrival !== undefined &&
      (obj.arrival = message.arrival
        ? StopTime_EstimatedTime.toJSON(message.arrival)
        : undefined);
    message.departure !== undefined &&
      (obj.departure = message.departure
        ? StopTime_EstimatedTime.toJSON(message.departure)
        : undefined);
    message.future !== undefined && (obj.future = message.future);
    message.stopSequence !== undefined &&
      (obj.stopSequence = Math.round(message.stopSequence));
    message.headsign !== undefined && (obj.headsign = message.headsign);
    message.track !== undefined && (obj.track = message.track);
    return obj;
  },
};

function createBaseStopTime_EstimatedTime(): StopTime_EstimatedTime {
  return { time: undefined, delay: undefined, uncertainty: undefined };
}

export const StopTime_EstimatedTime = {
  fromJSON(object: any): StopTime_EstimatedTime {
    return {
      time: isSet(object.time) ? Number(object.time) : undefined,
      delay: isSet(object.delay) ? Number(object.delay) : undefined,
      uncertainty: isSet(object.uncertainty)
        ? Number(object.uncertainty)
        : undefined,
    };
  },

  toJSON(message: StopTime_EstimatedTime): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = Math.round(message.time));
    message.delay !== undefined && (obj.delay = Math.round(message.delay));
    message.uncertainty !== undefined &&
      (obj.uncertainty = Math.round(message.uncertainty));
    return obj;
  },
};

function createBaseTrip(): Trip {
  return {
    id: "",
    resource: undefined,
    route: undefined,
    startedAt: undefined,
    vehicle: undefined,
    directionId: false,
    stopTimes: [],
    shape: undefined,
  };
}

export const Trip = {
  fromJSON(object: any): Trip {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      route: isSet(object.route)
        ? Route_Reference.fromJSON(object.route)
        : undefined,
      startedAt: isSet(object.startedAt) ? Number(object.startedAt) : undefined,
      vehicle: isSet(object.vehicle)
        ? Vehicle_Reference.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
      stopTimes: Array.isArray(object?.stopTimes)
        ? object.stopTimes.map((e: any) => StopTime.fromJSON(e))
        : [],
      shape: isSet(object.shape)
        ? Shape_Reference.fromJSON(object.shape)
        : undefined,
    };
  },

  toJSON(message: Trip): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.route !== undefined &&
      (obj.route = message.route
        ? Route_Reference.toJSON(message.route)
        : undefined);
    message.startedAt !== undefined &&
      (obj.startedAt = Math.round(message.startedAt));
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? Vehicle_Reference.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? StopTime.toJSON(e) : undefined,
      );
    } else {
      obj.stopTimes = [];
    }
    message.shape !== undefined &&
      (obj.shape = message.shape
        ? Shape_Reference.toJSON(message.shape)
        : undefined);
    return obj;
  },
};

function createBaseTrip_Reference(): Trip_Reference {
  return {
    id: "",
    resource: undefined,
    route: undefined,
    destination: undefined,
    vehicle: undefined,
    directionId: false,
  };
}

export const Trip_Reference = {
  fromJSON(object: any): Trip_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      route: isSet(object.route)
        ? Route_Reference.fromJSON(object.route)
        : undefined,
      destination: isSet(object.destination)
        ? Stop_Reference.fromJSON(object.destination)
        : undefined,
      vehicle: isSet(object.vehicle)
        ? Vehicle_Reference.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
    };
  },

  toJSON(message: Trip_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.route !== undefined &&
      (obj.route = message.route
        ? Route_Reference.toJSON(message.route)
        : undefined);
    message.destination !== undefined &&
      (obj.destination = message.destination
        ? Stop_Reference.toJSON(message.destination)
        : undefined);
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? Vehicle_Reference.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    return obj;
  },
};

function createBaseVehicle(): Vehicle {
  return {
    id: "",
    trip: undefined,
    latitude: undefined,
    longitude: undefined,
    bearing: undefined,
    odometer: undefined,
    speed: undefined,
    stopSequence: undefined,
    stop: undefined,
    currentStatus: undefined,
    updatedAt: undefined,
    congestionLevel: 0,
    occupancyStatus: undefined,
    occupancyPercentage: undefined,
  };
}

export const Vehicle = {
  fromJSON(object: any): Vehicle {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      trip: isSet(object.trip)
        ? Trip_Reference.fromJSON(object.trip)
        : undefined,
      latitude: isSet(object.latitude) ? Number(object.latitude) : undefined,
      longitude: isSet(object.longitude) ? Number(object.longitude) : undefined,
      bearing: isSet(object.bearing) ? Number(object.bearing) : undefined,
      odometer: isSet(object.odometer) ? Number(object.odometer) : undefined,
      speed: isSet(object.speed) ? Number(object.speed) : undefined,
      stopSequence: isSet(object.stopSequence)
        ? Number(object.stopSequence)
        : undefined,
      stop: isSet(object.stop)
        ? Stop_Reference.fromJSON(object.stop)
        : undefined,
      currentStatus: isSet(object.currentStatus)
        ? vehicle_CurrentStatusFromJSON(object.currentStatus)
        : undefined,
      updatedAt: isSet(object.updatedAt) ? Number(object.updatedAt) : undefined,
      congestionLevel: isSet(object.congestionLevel)
        ? vehicle_CongestionLevelFromJSON(object.congestionLevel)
        : 0,
      occupancyStatus: isSet(object.occupancyStatus)
        ? vehicle_OccupancyStatusFromJSON(object.occupancyStatus)
        : undefined,
      occupancyPercentage: isSet(object.occupancyPercentage)
        ? Number(object.occupancyPercentage)
        : undefined,
    };
  },

  toJSON(message: Vehicle): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.trip !== undefined &&
      (obj.trip = message.trip
        ? Trip_Reference.toJSON(message.trip)
        : undefined);
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    message.bearing !== undefined && (obj.bearing = message.bearing);
    message.odometer !== undefined && (obj.odometer = message.odometer);
    message.speed !== undefined && (obj.speed = message.speed);
    message.stopSequence !== undefined &&
      (obj.stopSequence = Math.round(message.stopSequence));
    message.stop !== undefined &&
      (obj.stop = message.stop
        ? Stop_Reference.toJSON(message.stop)
        : undefined);
    message.currentStatus !== undefined &&
      (obj.currentStatus =
        message.currentStatus !== undefined
          ? vehicle_CurrentStatusToJSON(message.currentStatus)
          : undefined);
    message.updatedAt !== undefined &&
      (obj.updatedAt = Math.round(message.updatedAt));
    message.congestionLevel !== undefined &&
      (obj.congestionLevel = vehicle_CongestionLevelToJSON(
        message.congestionLevel,
      ));
    message.occupancyStatus !== undefined &&
      (obj.occupancyStatus =
        message.occupancyStatus !== undefined
          ? vehicle_OccupancyStatusToJSON(message.occupancyStatus)
          : undefined);
    message.occupancyPercentage !== undefined &&
      (obj.occupancyPercentage = Math.round(message.occupancyPercentage));
    return obj;
  },
};

function createBaseVehicle_Reference(): Vehicle_Reference {
  return { id: "", resource: undefined };
}

export const Vehicle_Reference = {
  fromJSON(object: any): Vehicle_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
    };
  },

  toJSON(message: Vehicle_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },
};

function createBaseRoute(): Route {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    shortName: undefined,
    longName: undefined,
    color: "",
    textColor: "",
    description: undefined,
    url: undefined,
    sortOrder: undefined,
    continuousPickup: 0,
    continuousDropOff: 0,
    type: 0,
    agency: undefined,
    alerts: [],
    estimatedHeadway: undefined,
    serviceMaps: [],
  };
}

export const Route = {
  fromJSON(object: any): Route {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      shortName: isSet(object.shortName) ? String(object.shortName) : undefined,
      longName: isSet(object.longName) ? String(object.longName) : undefined,
      color: isSet(object.color) ? String(object.color) : "",
      textColor: isSet(object.textColor) ? String(object.textColor) : "",
      description: isSet(object.description)
        ? String(object.description)
        : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      sortOrder: isSet(object.sortOrder) ? Number(object.sortOrder) : undefined,
      continuousPickup: isSet(object.continuousPickup)
        ? route_ContinuousPolicyFromJSON(object.continuousPickup)
        : 0,
      continuousDropOff: isSet(object.continuousDropOff)
        ? route_ContinuousPolicyFromJSON(object.continuousDropOff)
        : 0,
      type: isSet(object.type) ? route_TypeFromJSON(object.type) : 0,
      agency: isSet(object.agency)
        ? Agency_Reference.fromJSON(object.agency)
        : undefined,
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert_Reference.fromJSON(e))
        : [],
      estimatedHeadway: isSet(object.estimatedHeadway)
        ? Number(object.estimatedHeadway)
        : undefined,
      serviceMaps: Array.isArray(object?.serviceMaps)
        ? object.serviceMaps.map((e: any) => Route_ServiceMap.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Route): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.shortName !== undefined && (obj.shortName = message.shortName);
    message.longName !== undefined && (obj.longName = message.longName);
    message.color !== undefined && (obj.color = message.color);
    message.textColor !== undefined && (obj.textColor = message.textColor);
    message.description !== undefined &&
      (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.sortOrder !== undefined &&
      (obj.sortOrder = Math.round(message.sortOrder));
    message.continuousPickup !== undefined &&
      (obj.continuousPickup = route_ContinuousPolicyToJSON(
        message.continuousPickup,
      ));
    message.continuousDropOff !== undefined &&
      (obj.continuousDropOff = route_ContinuousPolicyToJSON(
        message.continuousDropOff,
      ));
    message.type !== undefined && (obj.type = route_TypeToJSON(message.type));
    message.agency !== undefined &&
      (obj.agency = message.agency
        ? Agency_Reference.toJSON(message.agency)
        : undefined);
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.alerts = [];
    }
    message.estimatedHeadway !== undefined &&
      (obj.estimatedHeadway = Math.round(message.estimatedHeadway));
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? Route_ServiceMap.toJSON(e) : undefined,
      );
    } else {
      obj.serviceMaps = [];
    }
    return obj;
  },
};

function createBaseRoute_ServiceMap(): Route_ServiceMap {
  return { configId: "", stops: [] };
}

export const Route_ServiceMap = {
  fromJSON(object: any): Route_ServiceMap {
    return {
      configId: isSet(object.configId) ? String(object.configId) : "",
      stops: Array.isArray(object?.stops)
        ? object.stops.map((e: any) => Stop_Reference.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Route_ServiceMap): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.stops) {
      obj.stops = message.stops.map((e) =>
        e ? Stop_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.stops = [];
    }
    return obj;
  },
};

function createBaseRoute_Reference(): Route_Reference {
  return { id: "", resource: undefined, system: undefined, color: "" };
}

export const Route_Reference = {
  fromJSON(object: any): Route_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      color: isSet(object.color) ? String(object.color) : "",
    };
  },

  toJSON(message: Route_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.color !== undefined && (obj.color = message.color);
    return obj;
  },
};

function createBaseFeed(): Feed {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    lastUpdateMs: undefined,
    lastSuccessfulUpdateMs: undefined,
    lastSkippedUpdateMs: undefined,
    lastFailedUpdateMs: undefined,
  };
}

export const Feed = {
  fromJSON(object: any): Feed {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      lastUpdateMs: isSet(object.lastUpdateMs)
        ? Number(object.lastUpdateMs)
        : undefined,
      lastSuccessfulUpdateMs: isSet(object.lastSuccessfulUpdateMs)
        ? Number(object.lastSuccessfulUpdateMs)
        : undefined,
      lastSkippedUpdateMs: isSet(object.lastSkippedUpdateMs)
        ? Number(object.lastSkippedUpdateMs)
        : undefined,
      lastFailedUpdateMs: isSet(object.lastFailedUpdateMs)
        ? Number(object.lastFailedUpdateMs)
        : undefined,
    };
  },

  toJSON(message: Feed): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.lastUpdateMs !== undefined &&
      (obj.lastUpdateMs = Math.round(message.lastUpdateMs));
    message.lastSuccessfulUpdateMs !== undefined &&
      (obj.lastSuccessfulUpdateMs = Math.round(message.lastSuccessfulUpdateMs));
    message.lastSkippedUpdateMs !== undefined &&
      (obj.lastSkippedUpdateMs = Math.round(message.lastSkippedUpdateMs));
    message.lastFailedUpdateMs !== undefined &&
      (obj.lastFailedUpdateMs = Math.round(message.lastFailedUpdateMs));
    return obj;
  },
};

function createBaseFeed_Reference(): Feed_Reference {
  return { id: "", resource: undefined, system: undefined };
}

export const Feed_Reference = {
  fromJSON(object: any): Feed_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
    };
  },

  toJSON(message: Feed_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    return obj;
  },
};

function createBaseAgency(): Agency {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    name: "",
    url: "",
    timezone: "",
    language: undefined,
    phone: undefined,
    fareUrl: undefined,
    email: undefined,
    routes: [],
    alerts: [],
  };
}

export const Agency = {
  fromJSON(object: any): Agency {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
      url: isSet(object.url) ? String(object.url) : "",
      timezone: isSet(object.timezone) ? String(object.timezone) : "",
      language: isSet(object.language) ? String(object.language) : undefined,
      phone: isSet(object.phone) ? String(object.phone) : undefined,
      fareUrl: isSet(object.fareUrl) ? String(object.fareUrl) : undefined,
      email: isSet(object.email) ? String(object.email) : undefined,
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => Route_Reference.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert_Reference.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Agency): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.language !== undefined && (obj.language = message.language);
    message.phone !== undefined && (obj.phone = message.phone);
    message.fareUrl !== undefined && (obj.fareUrl = message.fareUrl);
    message.email !== undefined && (obj.email = message.email);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? Route_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.routes = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Reference.toJSON(e) : undefined,
      );
    } else {
      obj.alerts = [];
    }
    return obj;
  },
};

function createBaseAgency_Reference(): Agency_Reference {
  return { id: "", resource: undefined, system: undefined, name: "" };
}

export const Agency_Reference = {
  fromJSON(object: any): Agency_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: Agency_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

function createBaseAlert(): Alert {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    cause: 0,
    effect: 0,
    currentActivePeriod: undefined,
    allActivePeriods: [],
    header: [],
    description: [],
    url: [],
  };
}

export const Alert = {
  fromJSON(object: any): Alert {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      cause: isSet(object.cause) ? alert_CauseFromJSON(object.cause) : 0,
      effect: isSet(object.effect) ? alert_EffectFromJSON(object.effect) : 0,
      currentActivePeriod: isSet(object.currentActivePeriod)
        ? Alert_ActivePeriod.fromJSON(object.currentActivePeriod)
        : undefined,
      allActivePeriods: Array.isArray(object?.allActivePeriods)
        ? object.allActivePeriods.map((e: any) =>
            Alert_ActivePeriod.fromJSON(e),
          )
        : [],
      header: Array.isArray(object?.header)
        ? object.header.map((e: any) => Alert_Text.fromJSON(e))
        : [],
      description: Array.isArray(object?.description)
        ? object.description.map((e: any) => Alert_Text.fromJSON(e))
        : [],
      url: Array.isArray(object?.url)
        ? object.url.map((e: any) => Alert_Text.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Alert): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.cause !== undefined &&
      (obj.cause = alert_CauseToJSON(message.cause));
    message.effect !== undefined &&
      (obj.effect = alert_EffectToJSON(message.effect));
    message.currentActivePeriod !== undefined &&
      (obj.currentActivePeriod = message.currentActivePeriod
        ? Alert_ActivePeriod.toJSON(message.currentActivePeriod)
        : undefined);
    if (message.allActivePeriods) {
      obj.allActivePeriods = message.allActivePeriods.map((e) =>
        e ? Alert_ActivePeriod.toJSON(e) : undefined,
      );
    } else {
      obj.allActivePeriods = [];
    }
    if (message.header) {
      obj.header = message.header.map((e) =>
        e ? Alert_Text.toJSON(e) : undefined,
      );
    } else {
      obj.header = [];
    }
    if (message.description) {
      obj.description = message.description.map((e) =>
        e ? Alert_Text.toJSON(e) : undefined,
      );
    } else {
      obj.description = [];
    }
    if (message.url) {
      obj.url = message.url.map((e) => (e ? Alert_Text.toJSON(e) : undefined));
    } else {
      obj.url = [];
    }
    return obj;
  },
};

function createBaseAlert_ActivePeriod(): Alert_ActivePeriod {
  return { startsAt: undefined, endsAt: undefined };
}

export const Alert_ActivePeriod = {
  fromJSON(object: any): Alert_ActivePeriod {
    return {
      startsAt: isSet(object.startsAt) ? Number(object.startsAt) : undefined,
      endsAt: isSet(object.endsAt) ? Number(object.endsAt) : undefined,
    };
  },

  toJSON(message: Alert_ActivePeriod): unknown {
    const obj: any = {};
    message.startsAt !== undefined &&
      (obj.startsAt = Math.round(message.startsAt));
    message.endsAt !== undefined && (obj.endsAt = Math.round(message.endsAt));
    return obj;
  },
};

function createBaseAlert_Text(): Alert_Text {
  return { text: "", language: "" };
}

export const Alert_Text = {
  fromJSON(object: any): Alert_Text {
    return {
      text: isSet(object.text) ? String(object.text) : "",
      language: isSet(object.language) ? String(object.language) : "",
    };
  },

  toJSON(message: Alert_Text): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.language !== undefined && (obj.language = message.language);
    return obj;
  },
};

function createBaseAlert_Reference(): Alert_Reference {
  return {
    id: "",
    resource: undefined,
    system: undefined,
    cause: 0,
    effect: 0,
  };
}

export const Alert_Reference = {
  fromJSON(object: any): Alert_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
      system: isSet(object.system)
        ? System_Reference.fromJSON(object.system)
        : undefined,
      cause: isSet(object.cause) ? alert_CauseFromJSON(object.cause) : 0,
      effect: isSet(object.effect) ? alert_EffectFromJSON(object.effect) : 0,
    };
  },

  toJSON(message: Alert_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    message.system !== undefined &&
      (obj.system = message.system
        ? System_Reference.toJSON(message.system)
        : undefined);
    message.cause !== undefined &&
      (obj.cause = alert_CauseToJSON(message.cause));
    message.effect !== undefined &&
      (obj.effect = alert_EffectToJSON(message.effect));
    return obj;
  },
};

function createBaseTransfer(): Transfer {
  return {
    fromStop: undefined,
    toStop: undefined,
    type: 0,
    minTransferTime: undefined,
    distance: undefined,
  };
}

export const Transfer = {
  fromJSON(object: any): Transfer {
    return {
      fromStop: isSet(object.fromStop)
        ? Stop_Reference.fromJSON(object.fromStop)
        : undefined,
      toStop: isSet(object.toStop)
        ? Stop_Reference.fromJSON(object.toStop)
        : undefined,
      type: isSet(object.type) ? transfer_TypeFromJSON(object.type) : 0,
      minTransferTime: isSet(object.minTransferTime)
        ? Number(object.minTransferTime)
        : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : undefined,
    };
  },

  toJSON(message: Transfer): unknown {
    const obj: any = {};
    message.fromStop !== undefined &&
      (obj.fromStop = message.fromStop
        ? Stop_Reference.toJSON(message.fromStop)
        : undefined);
    message.toStop !== undefined &&
      (obj.toStop = message.toStop
        ? Stop_Reference.toJSON(message.toStop)
        : undefined);
    message.type !== undefined &&
      (obj.type = transfer_TypeToJSON(message.type));
    message.minTransferTime !== undefined &&
      (obj.minTransferTime = Math.round(message.minTransferTime));
    message.distance !== undefined &&
      (obj.distance = Math.round(message.distance));
    return obj;
  },
};

function createBaseShape(): Shape {
  return { id: "", points: [] };
}

export const Shape = {
  fromJSON(object: any): Shape {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      points: Array.isArray(object?.points)
        ? object.points.map((e: any) => Shape_ShapePoint.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Shape): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.points) {
      obj.points = message.points.map((e) =>
        e ? Shape_ShapePoint.toJSON(e) : undefined,
      );
    } else {
      obj.points = [];
    }
    return obj;
  },
};

function createBaseShape_ShapePoint(): Shape_ShapePoint {
  return { latitude: 0, longitude: 0, distance: undefined };
}

export const Shape_ShapePoint = {
  fromJSON(object: any): Shape_ShapePoint {
    return {
      latitude: isSet(object.latitude) ? Number(object.latitude) : 0,
      longitude: isSet(object.longitude) ? Number(object.longitude) : 0,
      distance: isSet(object.distance) ? Number(object.distance) : undefined,
    };
  },

  toJSON(message: Shape_ShapePoint): unknown {
    const obj: any = {};
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },
};

function createBaseShape_Reference(): Shape_Reference {
  return { id: "", resource: undefined };
}

export const Shape_Reference = {
  fromJSON(object: any): Shape_Reference {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      resource: isSet(object.resource)
        ? Resource.fromJSON(object.resource)
        : undefined,
    };
  },

  toJSON(message: Shape_Reference): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.resource !== undefined &&
      (obj.resource = message.resource
        ? Resource.toJSON(message.resource)
        : undefined);
    return obj;
  },
};

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
