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
  /** List of systems that are installed in this Transiter instance. */
  systems: System_Preview[];
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
  /** ID of the first stop to return. If not set, the stop with the smallest ID will be first. */
  firstId?: string | undefined;
  /** Maximum number of stops to return. */
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
  /**
   * List of trips.
   * TODO: full Trip instead of preview
   */
  trips: Trip_Preview[];
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
  /**
   * List of feeds.
   * TODO: full Feed instead of preview
   */
  feeds: Feed_Preview[];
}

/** Request payload for the list feed updates endpoint. */
export interface ListFeedUpdatesRequest {
  /**
   * ID of the system the feed is in.
   *
   * This is a URL parameter in the HTTP API.
   */
  systemId: string;
  /**
   * ID of the feed for which to list updates.
   *
   * This is a URL parameter in the HTTP API.
   */
  feedId: string;
}

/** Response payload for the list feed updates endpoint. */
export interface ListFeedUpdatesReply {
  /** List of updates. */
  updates: FeedUpdate[];
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

/** The System resource. */
export interface System {
  /** ID of the system as specified in the install request. */
  id: string;
  /** Name of the system as specified in the system configuration file. */
  name: string;
  /** Status of the system. */
  status: System_Status;
  agencies?: System_ChildEntities | undefined;
  feeds?: System_ChildEntities | undefined;
  routes?: System_ChildEntities | undefined;
  stops?: System_ChildEntities | undefined;
  transfers?: System_ChildEntities | undefined;
  href?: string | undefined;
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

/** TODO: rename `ChildResources`, move out of here, and reuse */
export interface System_ChildEntities {
  count: number;
  href?: string | undefined;
}

/** Preview contains preview information about the system. */
export interface System_Preview {
  id: string;
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
  parentStop?: Stop_Preview | undefined;
  /** Child stops. This are determined using the `parent_station` column in `stops.txt`. */
  childStops: Stop_Preview[];
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
  alerts: Alert_Preview[];
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
  routes: Route_Preview[];
}

/** Message describing a headsign rule. */
export interface Stop_HeadsignRule {
  /** Stop the rule is for. */
  stop: Stop_Preview | undefined;
  /** Priority of the rule (lower is higher priority). */
  priority: number;
  /** NYCT track. */
  track?: string | undefined;
  /** Headsign. */
  headsign: string;
}

/** Preview contains preview information about the stop. */
export interface Stop_Preview {
  id: string;
  /** TODO: make optional */
  name: string;
  href?: string | undefined;
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
  stop: Stop_Preview | undefined;
  /** The trip. */
  trip: Trip_Preview | undefined;
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
  /** TODO(APIv2): remove route? */
  route: Route_Preview | undefined;
  /** TODO: remove? */
  lastStop: Stop_Preview | undefined;
  startedAt?: number | undefined;
  vehicle?: Vehicle_Preview | undefined;
  directionId: boolean;
  stopTimes: StopTime[];
  href?: string | undefined;
}

/** Preview contains preview information about the trip. */
export interface Trip_Preview {
  id: string;
  route: Route_Preview | undefined;
  destination: Stop_Preview | undefined;
  vehicle?: Vehicle_Preview | undefined;
  href?: string | undefined;
}

export interface Vehicle {}

/** Preview contains preview information about the vehice. */
export interface Vehicle_Preview {
  id: string;
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
  /**
   * TODO: make these 3 fields enums
   * Continuous pickup policy. This is the `continuous_pickup` column in `routes.txt`.
   */
  continuousPickup: string;
  /** Continuous dropoff policy. This is the `continuous_dropoff` column in `routes.txt`. */
  continuousDropOff: string;
  /** Type of the route. This is the `route_type` column in `routes.txt`. */
  type: string;
  /**
   * Agency this route is associated to.
   *
   * This is determined using the `agency_id` column in `routes.txt`.
   */
  agency: Agency_Preview | undefined;
  /**
   * Active alerts for this route.
   *
   * These are determined using the `informed_entity` field in
   * the [GTFS realtime alerts
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
   */
  alerts: Alert_Preview[];
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
   * / all stops.
   */
  estimatedHeadway?: number | undefined;
  /** List of service maps for this route. */
  serviceMaps: Route_ServiceMap[];
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
  stops: Stop_Preview[];
}

/** Preview contains preview information about the route. */
export interface Route_Preview {
  id: string;
  /** TODO(APIv2): remove? or add text_color? */
  color: string;
  /**
   * Will be populated only if the system is not obvious
   * TODO: maybe we should just include it always so that each preview/reference
   * uniquely identifies a resource
   */
  system?: System | undefined;
  href?: string | undefined;
}

/**
 * The feed resource.
 *
 * Each feed is defined in the system configuration file.
 * Feeds are included in the public API because there are non-admin use-cases for this resource.
 * For example, an app might publish the staleness of realtime data
 *   by checking for the last succesful feed update.
 *
 * More detailed information on a feed -- its full configuration, and the
 *   current status of its periodic updates -- can be retrieved through the admin API.
 */
export interface Feed {
  /** ID of the feed, as specified in the system configuration file. */
  id: string;
  /** Whether periodic update is enabled for this feed. */
  periodicUpdateEnabled: boolean;
  /** If periodic update is enabled, the period each update is triggered. */
  periodicUpdatePeriod?: string | undefined;
  updates?: Feed_Updates | undefined;
}

/** TODO: have a ChildResources message and use that instead */
export interface Feed_Updates {
  href?: string | undefined;
}

/** Preview contains preview information about the feed. */
export interface Feed_Preview {
  id: string;
  /** TODO: remove */
  periodicUpdateEnabled: boolean;
  /** TODO: remove */
  periodicUpdatePeriod?: string | undefined;
  href?: string | undefined;
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
  /** TODO: this should be its own endpoint I think */
  routes: Route_Preview[];
  /**
   * List of active alerts for the agency.
   *
   * These are determined using the `informed_entity` field in
   * the [GTFS realtime alerts
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
   */
  alerts: Alert_Preview[];
  href?: string | undefined;
}

/** Preview contains preview information about the agency. */
export interface Agency_Preview {
  id: string;
  name: string;
  href?: string | undefined;
}

/**
 * The Alert resource.
 *
 * This resource corresponds to the [alert type in the GTFS realtime
 * specification](https://developers.google.com/transit/gtfs-realtime/reference#message-alert).
 *
 * TODO: informed entites
 * TODO; alphabetize the messages
 */
export interface Alert {
  /**
   * ID of the alert. This corresponds to the [ID field in the feed entity
   * message](https://developers.google.com/transit/gtfs-realtime/reference#message-feedentity)
   * corresponding to the alert.
   */
  id: string;
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

/** TODO: rename Preview to Reference? */
export interface Alert_Preview {
  id: string;
  cause: Alert_Cause;
  /**
   * TODO(APIv2): add this field and create API endpoints
   * optional string href = 3;
   */
  effect: Alert_Effect;
}

export interface Transfer {
  fromStop: Stop_Preview | undefined;
  toStop: Stop_Preview | undefined;
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

/**
 * The feed update resource.
 *
 * Each feed update event
 *   -- triggered manually though the admin API, or automatically by the scheduler --
 * generates a feed update resource.
 * This resource is updated as the feed update progresses.
 * A background task in Transiter periodically garbage collects old updates.
 */
export interface FeedUpdate {
  /**
   * ID of the feed update. This is the primary key of the associated Postgres
   * database row so it's actually globally unique.
   */
  id: string;
  /**
   * TODO: make these enums
   * Type of the feed update.
   */
  type: string;
  /** Status of the feed update. */
  status: string;
  /** TODO what is this? */
  result?: string | undefined;
  /** TODO: delete? */
  stackTrace?: string | undefined;
  /** Number of bytes in the downloaded feed data. */
  contentLength?: number | undefined;
  /**
   * Hash of the downloaded feed data. This is used to skip updates
   * if the feed data hasn't changed.
   */
  contentHash?: string | undefined;
  /**
   * Unix timestamp of the approximate time the update completed.
   * TODO: started_at? scheduled_at?
   */
  completedAt?: number | undefined;
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
  return { transiter: undefined, systems: [] };
}

export const EntrypointReply = {
  fromJSON(object: any): EntrypointReply {
    return {
      transiter: isSet(object.transiter)
        ? EntrypointReply_TransiterDetails.fromJSON(object.transiter)
        : undefined,
      systems: Array.isArray(object?.systems)
        ? object.systems.map((e: any) => System_Preview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EntrypointReply): unknown {
    const obj: any = {};
    message.transiter !== undefined &&
      (obj.transiter = message.transiter
        ? EntrypointReply_TransiterDetails.toJSON(message.transiter)
        : undefined);
    if (message.systems) {
      obj.systems = message.systems.map((e) =>
        e ? System_Preview.toJSON(e) : undefined
      );
    } else {
      obj.systems = [];
    }
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
        e ? System.toJSON(e) : undefined
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
        e ? Agency.toJSON(e) : undefined
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
    firstId: undefined,
    limit: undefined,
    skipStopTimes: false,
    skipServiceMaps: false,
    skipAlerts: false,
    skipTransfers: false,
  };
}

export const ListStopsRequest = {
  fromJSON(object: any): ListStopsRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
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
    };
  },

  toJSON(message: ListStopsRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.firstId !== undefined && (obj.firstId = message.firstId);
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
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
        ? object.trips.map((e: any) => Trip_Preview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTripsReply): unknown {
    const obj: any = {};
    if (message.trips) {
      obj.trips = message.trips.map((e) =>
        e ? Trip_Preview.toJSON(e) : undefined
      );
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
        ? object.feeds.map((e: any) => Feed_Preview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListFeedsReply): unknown {
    const obj: any = {};
    if (message.feeds) {
      obj.feeds = message.feeds.map((e) =>
        e ? Feed_Preview.toJSON(e) : undefined
      );
    } else {
      obj.feeds = [];
    }
    return obj;
  },
};

function createBaseListFeedUpdatesRequest(): ListFeedUpdatesRequest {
  return { systemId: "", feedId: "" };
}

export const ListFeedUpdatesRequest = {
  fromJSON(object: any): ListFeedUpdatesRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      feedId: isSet(object.feedId) ? String(object.feedId) : "",
    };
  },

  toJSON(message: ListFeedUpdatesRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.feedId !== undefined && (obj.feedId = message.feedId);
    return obj;
  },
};

function createBaseListFeedUpdatesReply(): ListFeedUpdatesReply {
  return { updates: [] };
}

export const ListFeedUpdatesReply = {
  fromJSON(object: any): ListFeedUpdatesReply {
    return {
      updates: Array.isArray(object?.updates)
        ? object.updates.map((e: any) => FeedUpdate.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListFeedUpdatesReply): unknown {
    const obj: any = {};
    if (message.updates) {
      obj.updates = message.updates.map((e) =>
        e ? FeedUpdate.toJSON(e) : undefined
      );
    } else {
      obj.updates = [];
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
        e ? Transfer.toJSON(e) : undefined
      );
    } else {
      obj.transfers = [];
    }
    return obj;
  },
};

function createBaseSystem(): System {
  return {
    id: "",
    name: "",
    status: 0,
    agencies: undefined,
    feeds: undefined,
    routes: undefined,
    stops: undefined,
    transfers: undefined,
    href: undefined,
  };
}

export const System = {
  fromJSON(object: any): System {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      status: isSet(object.status) ? system_StatusFromJSON(object.status) : 0,
      agencies: isSet(object.agencies)
        ? System_ChildEntities.fromJSON(object.agencies)
        : undefined,
      feeds: isSet(object.feeds)
        ? System_ChildEntities.fromJSON(object.feeds)
        : undefined,
      routes: isSet(object.routes)
        ? System_ChildEntities.fromJSON(object.routes)
        : undefined,
      stops: isSet(object.stops)
        ? System_ChildEntities.fromJSON(object.stops)
        : undefined,
      transfers: isSet(object.transfers)
        ? System_ChildEntities.fromJSON(object.transfers)
        : undefined,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: System): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.status !== undefined &&
      (obj.status = system_StatusToJSON(message.status));
    message.agencies !== undefined &&
      (obj.agencies = message.agencies
        ? System_ChildEntities.toJSON(message.agencies)
        : undefined);
    message.feeds !== undefined &&
      (obj.feeds = message.feeds
        ? System_ChildEntities.toJSON(message.feeds)
        : undefined);
    message.routes !== undefined &&
      (obj.routes = message.routes
        ? System_ChildEntities.toJSON(message.routes)
        : undefined);
    message.stops !== undefined &&
      (obj.stops = message.stops
        ? System_ChildEntities.toJSON(message.stops)
        : undefined);
    message.transfers !== undefined &&
      (obj.transfers = message.transfers
        ? System_ChildEntities.toJSON(message.transfers)
        : undefined);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseSystem_ChildEntities(): System_ChildEntities {
  return { count: 0, href: undefined };
}

export const System_ChildEntities = {
  fromJSON(object: any): System_ChildEntities {
    return {
      count: isSet(object.count) ? Number(object.count) : 0,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: System_ChildEntities): unknown {
    const obj: any = {};
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseSystem_Preview(): System_Preview {
  return { id: "", href: undefined };
}

export const System_Preview = {
  fromJSON(object: any): System_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: System_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseStop(): Stop {
  return {
    id: "",
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
        ? Stop_Preview.fromJSON(object.parentStop)
        : undefined,
      childStops: Array.isArray(object?.childStops)
        ? object.childStops.map((e: any) => Stop_Preview.fromJSON(e))
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
        ? object.alerts.map((e: any) => Alert_Preview.fromJSON(e))
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
        ? Stop_Preview.toJSON(message.parentStop)
        : undefined);
    if (message.childStops) {
      obj.childStops = message.childStops.map((e) =>
        e ? Stop_Preview.toJSON(e) : undefined
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
        e ? Stop_ServiceMap.toJSON(e) : undefined
      );
    } else {
      obj.serviceMaps = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Preview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? StopTime.toJSON(e) : undefined
      );
    } else {
      obj.stopTimes = [];
    }
    if (message.transfers) {
      obj.transfers = message.transfers.map((e) =>
        e ? Transfer.toJSON(e) : undefined
      );
    } else {
      obj.transfers = [];
    }
    if (message.headsignRules) {
      obj.headsignRules = message.headsignRules.map((e) =>
        e ? Stop_HeadsignRule.toJSON(e) : undefined
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
        ? object.routes.map((e: any) => Route_Preview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Stop_ServiceMap): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? Route_Preview.toJSON(e) : undefined
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
      stop: isSet(object.stop) ? Stop_Preview.fromJSON(object.stop) : undefined,
      priority: isSet(object.priority) ? Number(object.priority) : 0,
      track: isSet(object.track) ? String(object.track) : undefined,
      headsign: isSet(object.headsign) ? String(object.headsign) : "",
    };
  },

  toJSON(message: Stop_HeadsignRule): unknown {
    const obj: any = {};
    message.stop !== undefined &&
      (obj.stop = message.stop ? Stop_Preview.toJSON(message.stop) : undefined);
    message.priority !== undefined &&
      (obj.priority = Math.round(message.priority));
    message.track !== undefined && (obj.track = message.track);
    message.headsign !== undefined && (obj.headsign = message.headsign);
    return obj;
  },
};

function createBaseStop_Preview(): Stop_Preview {
  return { id: "", name: "", href: undefined };
}

export const Stop_Preview = {
  fromJSON(object: any): Stop_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Stop_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.href !== undefined && (obj.href = message.href);
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
      stop: isSet(object.stop) ? Stop_Preview.fromJSON(object.stop) : undefined,
      trip: isSet(object.trip) ? Trip_Preview.fromJSON(object.trip) : undefined,
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
      (obj.stop = message.stop ? Stop_Preview.toJSON(message.stop) : undefined);
    message.trip !== undefined &&
      (obj.trip = message.trip ? Trip_Preview.toJSON(message.trip) : undefined);
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
    route: undefined,
    lastStop: undefined,
    startedAt: undefined,
    vehicle: undefined,
    directionId: false,
    stopTimes: [],
    href: undefined,
  };
}

export const Trip = {
  fromJSON(object: any): Trip {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      route: isSet(object.route)
        ? Route_Preview.fromJSON(object.route)
        : undefined,
      lastStop: isSet(object.lastStop)
        ? Stop_Preview.fromJSON(object.lastStop)
        : undefined,
      startedAt: isSet(object.startedAt) ? Number(object.startedAt) : undefined,
      vehicle: isSet(object.vehicle)
        ? Vehicle_Preview.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
      stopTimes: Array.isArray(object?.stopTimes)
        ? object.stopTimes.map((e: any) => StopTime.fromJSON(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Trip): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.route !== undefined &&
      (obj.route = message.route
        ? Route_Preview.toJSON(message.route)
        : undefined);
    message.lastStop !== undefined &&
      (obj.lastStop = message.lastStop
        ? Stop_Preview.toJSON(message.lastStop)
        : undefined);
    message.startedAt !== undefined &&
      (obj.startedAt = Math.round(message.startedAt));
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? Vehicle_Preview.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? StopTime.toJSON(e) : undefined
      );
    } else {
      obj.stopTimes = [];
    }
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTrip_Preview(): Trip_Preview {
  return {
    id: "",
    route: undefined,
    destination: undefined,
    vehicle: undefined,
    href: undefined,
  };
}

export const Trip_Preview = {
  fromJSON(object: any): Trip_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      route: isSet(object.route)
        ? Route_Preview.fromJSON(object.route)
        : undefined,
      destination: isSet(object.destination)
        ? Stop_Preview.fromJSON(object.destination)
        : undefined,
      vehicle: isSet(object.vehicle)
        ? Vehicle_Preview.fromJSON(object.vehicle)
        : undefined,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Trip_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.route !== undefined &&
      (obj.route = message.route
        ? Route_Preview.toJSON(message.route)
        : undefined);
    message.destination !== undefined &&
      (obj.destination = message.destination
        ? Stop_Preview.toJSON(message.destination)
        : undefined);
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? Vehicle_Preview.toJSON(message.vehicle)
        : undefined);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseVehicle(): Vehicle {
  return {};
}

export const Vehicle = {
  fromJSON(_: any): Vehicle {
    return {};
  },

  toJSON(_: Vehicle): unknown {
    const obj: any = {};
    return obj;
  },
};

function createBaseVehicle_Preview(): Vehicle_Preview {
  return { id: "" };
}

export const Vehicle_Preview = {
  fromJSON(object: any): Vehicle_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: Vehicle_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

function createBaseRoute(): Route {
  return {
    id: "",
    shortName: undefined,
    longName: undefined,
    color: "",
    textColor: "",
    description: undefined,
    url: undefined,
    sortOrder: undefined,
    continuousPickup: "",
    continuousDropOff: "",
    type: "",
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
        ? String(object.continuousPickup)
        : "",
      continuousDropOff: isSet(object.continuousDropOff)
        ? String(object.continuousDropOff)
        : "",
      type: isSet(object.type) ? String(object.type) : "",
      agency: isSet(object.agency)
        ? Agency_Preview.fromJSON(object.agency)
        : undefined,
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert_Preview.fromJSON(e))
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
      (obj.continuousPickup = message.continuousPickup);
    message.continuousDropOff !== undefined &&
      (obj.continuousDropOff = message.continuousDropOff);
    message.type !== undefined && (obj.type = message.type);
    message.agency !== undefined &&
      (obj.agency = message.agency
        ? Agency_Preview.toJSON(message.agency)
        : undefined);
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Preview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    message.estimatedHeadway !== undefined &&
      (obj.estimatedHeadway = Math.round(message.estimatedHeadway));
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? Route_ServiceMap.toJSON(e) : undefined
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
        ? object.stops.map((e: any) => Stop_Preview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Route_ServiceMap): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.stops) {
      obj.stops = message.stops.map((e) =>
        e ? Stop_Preview.toJSON(e) : undefined
      );
    } else {
      obj.stops = [];
    }
    return obj;
  },
};

function createBaseRoute_Preview(): Route_Preview {
  return { id: "", color: "", system: undefined, href: undefined };
}

export const Route_Preview = {
  fromJSON(object: any): Route_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      color: isSet(object.color) ? String(object.color) : "",
      system: isSet(object.system) ? System.fromJSON(object.system) : undefined,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Route_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.color !== undefined && (obj.color = message.color);
    message.system !== undefined &&
      (obj.system = message.system ? System.toJSON(message.system) : undefined);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseFeed(): Feed {
  return {
    id: "",
    periodicUpdateEnabled: false,
    periodicUpdatePeriod: undefined,
    updates: undefined,
  };
}

export const Feed = {
  fromJSON(object: any): Feed {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      periodicUpdateEnabled: isSet(object.periodicUpdateEnabled)
        ? Boolean(object.periodicUpdateEnabled)
        : false,
      periodicUpdatePeriod: isSet(object.periodicUpdatePeriod)
        ? String(object.periodicUpdatePeriod)
        : undefined,
      updates: isSet(object.updates)
        ? Feed_Updates.fromJSON(object.updates)
        : undefined,
    };
  },

  toJSON(message: Feed): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.periodicUpdateEnabled !== undefined &&
      (obj.periodicUpdateEnabled = message.periodicUpdateEnabled);
    message.periodicUpdatePeriod !== undefined &&
      (obj.periodicUpdatePeriod = message.periodicUpdatePeriod);
    message.updates !== undefined &&
      (obj.updates = message.updates
        ? Feed_Updates.toJSON(message.updates)
        : undefined);
    return obj;
  },
};

function createBaseFeed_Updates(): Feed_Updates {
  return { href: undefined };
}

export const Feed_Updates = {
  fromJSON(object: any): Feed_Updates {
    return {
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Feed_Updates): unknown {
    const obj: any = {};
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseFeed_Preview(): Feed_Preview {
  return {
    id: "",
    periodicUpdateEnabled: false,
    periodicUpdatePeriod: undefined,
    href: undefined,
  };
}

export const Feed_Preview = {
  fromJSON(object: any): Feed_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      periodicUpdateEnabled: isSet(object.periodicUpdateEnabled)
        ? Boolean(object.periodicUpdateEnabled)
        : false,
      periodicUpdatePeriod: isSet(object.periodicUpdatePeriod)
        ? String(object.periodicUpdatePeriod)
        : undefined,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Feed_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.periodicUpdateEnabled !== undefined &&
      (obj.periodicUpdateEnabled = message.periodicUpdateEnabled);
    message.periodicUpdatePeriod !== undefined &&
      (obj.periodicUpdatePeriod = message.periodicUpdatePeriod);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseAgency(): Agency {
  return {
    id: "",
    name: "",
    url: "",
    timezone: "",
    language: undefined,
    phone: undefined,
    fareUrl: undefined,
    email: undefined,
    routes: [],
    alerts: [],
    href: undefined,
  };
}

export const Agency = {
  fromJSON(object: any): Agency {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      url: isSet(object.url) ? String(object.url) : "",
      timezone: isSet(object.timezone) ? String(object.timezone) : "",
      language: isSet(object.language) ? String(object.language) : undefined,
      phone: isSet(object.phone) ? String(object.phone) : undefined,
      fareUrl: isSet(object.fareUrl) ? String(object.fareUrl) : undefined,
      email: isSet(object.email) ? String(object.email) : undefined,
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => Route_Preview.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert_Preview.fromJSON(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Agency): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    message.timezone !== undefined && (obj.timezone = message.timezone);
    message.language !== undefined && (obj.language = message.language);
    message.phone !== undefined && (obj.phone = message.phone);
    message.fareUrl !== undefined && (obj.fareUrl = message.fareUrl);
    message.email !== undefined && (obj.email = message.email);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? Route_Preview.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? Alert_Preview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseAgency_Preview(): Agency_Preview {
  return { id: "", name: "", href: undefined };
}

export const Agency_Preview = {
  fromJSON(object: any): Agency_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Agency_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseAlert(): Alert {
  return {
    id: "",
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
      cause: isSet(object.cause) ? alert_CauseFromJSON(object.cause) : 0,
      effect: isSet(object.effect) ? alert_EffectFromJSON(object.effect) : 0,
      currentActivePeriod: isSet(object.currentActivePeriod)
        ? Alert_ActivePeriod.fromJSON(object.currentActivePeriod)
        : undefined,
      allActivePeriods: Array.isArray(object?.allActivePeriods)
        ? object.allActivePeriods.map((e: any) =>
            Alert_ActivePeriod.fromJSON(e)
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
        e ? Alert_ActivePeriod.toJSON(e) : undefined
      );
    } else {
      obj.allActivePeriods = [];
    }
    if (message.header) {
      obj.header = message.header.map((e) =>
        e ? Alert_Text.toJSON(e) : undefined
      );
    } else {
      obj.header = [];
    }
    if (message.description) {
      obj.description = message.description.map((e) =>
        e ? Alert_Text.toJSON(e) : undefined
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

function createBaseAlert_Preview(): Alert_Preview {
  return { id: "", cause: 0, effect: 0 };
}

export const Alert_Preview = {
  fromJSON(object: any): Alert_Preview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      cause: isSet(object.cause) ? alert_CauseFromJSON(object.cause) : 0,
      effect: isSet(object.effect) ? alert_EffectFromJSON(object.effect) : 0,
    };
  },

  toJSON(message: Alert_Preview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
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
        ? Stop_Preview.fromJSON(object.fromStop)
        : undefined,
      toStop: isSet(object.toStop)
        ? Stop_Preview.fromJSON(object.toStop)
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
        ? Stop_Preview.toJSON(message.fromStop)
        : undefined);
    message.toStop !== undefined &&
      (obj.toStop = message.toStop
        ? Stop_Preview.toJSON(message.toStop)
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

function createBaseFeedUpdate(): FeedUpdate {
  return {
    id: "",
    type: "",
    status: "",
    result: undefined,
    stackTrace: undefined,
    contentLength: undefined,
    contentHash: undefined,
    completedAt: undefined,
  };
}

export const FeedUpdate = {
  fromJSON(object: any): FeedUpdate {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      type: isSet(object.type) ? String(object.type) : "",
      status: isSet(object.status) ? String(object.status) : "",
      result: isSet(object.result) ? String(object.result) : undefined,
      stackTrace: isSet(object.stackTrace)
        ? String(object.stackTrace)
        : undefined,
      contentLength: isSet(object.contentLength)
        ? Number(object.contentLength)
        : undefined,
      contentHash: isSet(object.contentHash)
        ? String(object.contentHash)
        : undefined,
      completedAt: isSet(object.completedAt)
        ? Number(object.completedAt)
        : undefined,
    };
  },

  toJSON(message: FeedUpdate): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = message.type);
    message.status !== undefined && (obj.status = message.status);
    message.result !== undefined && (obj.result = message.result);
    message.stackTrace !== undefined && (obj.stackTrace = message.stackTrace);
    message.contentLength !== undefined &&
      (obj.contentLength = Math.round(message.contentLength));
    message.contentHash !== undefined &&
      (obj.contentHash = message.contentHash);
    message.completedAt !== undefined &&
      (obj.completedAt = Math.round(message.completedAt));
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
