/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface EntrypointRequest {}

export interface EntrypointReply {
  transiter: EntrypointReply_TransiterDetails | undefined;
  systems: CountAndHref | undefined;
}

export interface EntrypointReply_TransiterDetails {
  version: string;
  href: string;
  build?: EntrypointReply_TransiterDetails_Build | undefined;
}

export interface EntrypointReply_TransiterDetails_Build {
  number: string;
  builtAt: string;
  builtAtTimestamp: string;
  gitCommitHash: string;
  href: string;
}

export interface ListSystemsRequest {}

export interface ListSystemsReply {
  systems: System[];
}

export interface GetSystemRequest {
  systemId: string;
}

export interface ListAgenciesInSystemRequest {
  systemId: string;
}

export interface ListAgenciesInSystemReply {
  agencies: AgencyPreviewWithAlerts[];
}

export interface GetAgencyInSystemRequest {
  systemId: string;
  agencyId: string;
}

export interface ListStopsInSystemRequest {
  systemId: string;
}

export interface ListStopsInSystemReply {
  stops: StopPreview[];
}

export interface GetStopInSystemRequest {
  systemId: string;
  stopId: string;
}

export interface ListRoutesInSystemRequest {
  systemId: string;
}

export interface ListRoutesInSystemReply {
  routes: RoutePreviewWithAlerts[];
}

export interface GetRouteInSystemRequest {
  systemId: string;
  routeId: string;
}

export interface ListTripsInRouteRequest {
  systemId: string;
  routeId: string;
}

export interface ListTripsInRouteReply {
  trips: TripPreviewWithAlerts[];
}

export interface GetTripRequest {
  systemId: string;
  routeId: string;
  tripId: string;
}

export interface ListFeedsInSystemRequest {
  systemId: string;
}

export interface ListFeedsInSystemReply {
  feeds: FeedPreview[];
}

export interface ListFeedUpdatesRequest {
  systemId: string;
  feedId: string;
}

export interface ListFeedUpdatesReply {
  updates: FeedUpdate[];
}

export interface GetFeedInSystemRequest {
  systemId: string;
  feedId: string;
}

export interface ListTransfersInSystemRequest {
  systemId: string;
}

export interface ListTransfersInSystemReply {
  transfers: Transfer[];
}

export interface System {
  id: string;
  name: string;
  status: System_Status;
  agencies?: CountAndHref | undefined;
  feeds?: CountAndHref | undefined;
  routes?: CountAndHref | undefined;
  stops?: CountAndHref | undefined;
  transfers?: CountAndHref | undefined;
  href?: string | undefined;
}

export enum System_Status {
  UNKNOWN = 0,
  INSTALLING = 1,
  ACTIVE = 2,
  INSTALL_FAILED = 3,
  UPDATING = 4,
  UPDATE_FAILED = 5,
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

export interface Stop {
  id: string;
  name?: string | undefined;
  longitude?: number | undefined;
  latitude?: number | undefined;
  url?: string | undefined;
  stopHeadsigns: string[];
  parentStop?: RelatedStop | undefined;
  childStops: RelatedStop[];
  serviceMaps: ServiceMapForStop[];
  alerts: AlertPreview[];
  stopTimes: Stop_StopTime[];
  transfers: TransferAtStop[];
}

export interface Stop_StopTime {
  arrival: EstimatedTime | undefined;
  departure: EstimatedTime | undefined;
  future: boolean;
  stopSequence: number;
  headsign?: string | undefined;
  track?: string | undefined;
  trip: TripPreview | undefined;
}

export interface RelatedStop {
  id: string;
  name: string;
  parentStop?: RelatedStop | undefined;
  childStops: RelatedStop[];
  serviceMaps: ServiceMapForStop[];
  href?: string | undefined;
}

export interface TransferAtStop {
  fromStop: StopPreview | undefined;
  toStop: RelatedStop | undefined;
  /** TODO: make this an enum */
  type: string;
  minTransferTime?: number | undefined;
  distance?: number | undefined;
}

export interface StopPreview {
  id: string;
  name: string;
  href?: string | undefined;
}

export interface TripPreview {
  id: string;
  route: RoutePreview | undefined;
  lastStop: StopPreview | undefined;
  startedAt?: number | undefined;
  vehicle?: VehiclePreview | undefined;
  directionId: boolean;
  href?: string | undefined;
}

/** TODO(APIv2): remove and just return TripPreview */
export interface TripPreviewWithAlerts {
  id: string;
  route: RoutePreview | undefined;
  lastStop: StopPreview | undefined;
  startedAt?: number | undefined;
  vehicle?: VehiclePreview | undefined;
  directionId: boolean;
  href?: string | undefined;
  alerts: AlertPreview[];
}

export interface Trip {
  id: string;
  /** TODO(APIv2): remove route */
  route: RoutePreview | undefined;
  lastStop: StopPreview | undefined;
  startedAt?: number | undefined;
  vehicle?: VehiclePreview | undefined;
  directionId: boolean;
  stopTimes: Trip_StopTime[];
  href?: string | undefined;
}

export interface Trip_StopTime {
  arrival: EstimatedTime | undefined;
  departure: EstimatedTime | undefined;
  future: boolean;
  stopSequence: number;
  headsign?: string | undefined;
  track?: string | undefined;
  stop: StopPreview | undefined;
}

export interface VehiclePreview {
  id: string;
}

export interface RoutePreview {
  id: string;
  /** TODO(APIv2): remove? */
  color: string;
  /** Will be populated only if the system is not obvious */
  system?: System | undefined;
  href?: string | undefined;
}

export interface RoutePreviewWithAlerts {
  id: string;
  /** TODO(APIv2): remove? */
  color: string;
  alerts: AlertPreview[];
  href?: string | undefined;
}

export interface Route {
  id: string;
  shortName?: string | undefined;
  longName?: string | undefined;
  color: string;
  textColor: string;
  description?: string | undefined;
  url?: string | undefined;
  sortOrder?: number | undefined;
  /** TODO: make these enums */
  continuousPickup: string;
  continuousDropOff: string;
  /** TODO: make this an enum */
  type: string;
  /** TODO(APIv2): make this integer seconds */
  periodicity?: number | undefined;
  agency: AgencyPreview | undefined;
  serviceMaps: ServiceMapForRoute[];
  alerts: Alert[];
}

export interface Feed {
  id: string;
  periodicUpdateEnabled: boolean;
  periodicUpdatePeriod?: string | undefined;
  updates?: Feed_Updates | undefined;
}

export interface Feed_Updates {
  href?: string | undefined;
}

export interface FeedPreview {
  id: string;
  periodicUpdateEnabled: boolean;
  periodicUpdatePeriod?: string | undefined;
  href?: string | undefined;
}

export interface Agency {
  id: string;
  name: string;
  url: string;
  timezone: string;
  language?: string | undefined;
  phone?: string | undefined;
  fareUrl?: string | undefined;
  email?: string | undefined;
  routes: RoutePreview[];
  alerts: AlertPreview[];
}

/** TODO(APIv2): delete this message and replace with AgencyPreview? */
export interface AgencyPreviewWithAlerts {
  id: string;
  name: string;
  alerts: string[];
  href?: string | undefined;
}

export interface AgencyPreview {
  id: string;
  name: string;
  href?: string | undefined;
}

export interface AlertPreview {
  id: string;
  /** TODO: make this an enum */
  cause: string;
  /** TODO: make this an enum */
  effect: string;
}

export interface Alert {
  id: string;
  /** TODO: make this an enum */
  cause: string;
  /** TODO: make this an enum */
  effect: string;
  activePeriod: Alert_ActivePeriod | undefined;
  messages: Alert_Message[];
}

export interface Alert_ActivePeriod {
  startsAt?: number | undefined;
  endsAt?: number | undefined;
}

export interface Alert_Message {
  header: string;
  description: string;
  language?: string | undefined;
  url?: string | undefined;
}

export interface EstimatedTime {
  time?: number | undefined;
  delay?: number | undefined;
  uncertainty?: number | undefined;
}

export interface ServiceMapForStop {
  configId: string;
  routes: RoutePreview[];
}

export interface ServiceMapForRoute {
  configId: string;
  stops: StopPreview[];
}

export interface CountAndHref {
  count: number;
  href?: string | undefined;
}

export interface Transfer {
  fromStop: StopPreview | undefined;
  toStop: StopPreview | undefined;
  /** TODO: make this an enum */
  type: string;
  minTransferTime: number;
  distance?: number | undefined;
}

export interface FeedUpdate {
  id: string;
  /** TODO: make these enums */
  type: string;
  status: string;
  result?: string | undefined;
  stackTrace?: string | undefined;
  contentHash?: string | undefined;
  contentLength?: number | undefined;
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
  return { transiter: undefined, systems: undefined };
}

export const EntrypointReply = {
  fromJSON(object: any): EntrypointReply {
    return {
      transiter: isSet(object.transiter)
        ? EntrypointReply_TransiterDetails.fromJSON(object.transiter)
        : undefined,
      systems: isSet(object.systems)
        ? CountAndHref.fromJSON(object.systems)
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
        ? CountAndHref.toJSON(message.systems)
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

function createBaseListAgenciesInSystemRequest(): ListAgenciesInSystemRequest {
  return { systemId: "" };
}

export const ListAgenciesInSystemRequest = {
  fromJSON(object: any): ListAgenciesInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListAgenciesInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListAgenciesInSystemReply(): ListAgenciesInSystemReply {
  return { agencies: [] };
}

export const ListAgenciesInSystemReply = {
  fromJSON(object: any): ListAgenciesInSystemReply {
    return {
      agencies: Array.isArray(object?.agencies)
        ? object.agencies.map((e: any) => AgencyPreviewWithAlerts.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListAgenciesInSystemReply): unknown {
    const obj: any = {};
    if (message.agencies) {
      obj.agencies = message.agencies.map((e) =>
        e ? AgencyPreviewWithAlerts.toJSON(e) : undefined
      );
    } else {
      obj.agencies = [];
    }
    return obj;
  },
};

function createBaseGetAgencyInSystemRequest(): GetAgencyInSystemRequest {
  return { systemId: "", agencyId: "" };
}

export const GetAgencyInSystemRequest = {
  fromJSON(object: any): GetAgencyInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      agencyId: isSet(object.agencyId) ? String(object.agencyId) : "",
    };
  },

  toJSON(message: GetAgencyInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.agencyId !== undefined && (obj.agencyId = message.agencyId);
    return obj;
  },
};

function createBaseListStopsInSystemRequest(): ListStopsInSystemRequest {
  return { systemId: "" };
}

export const ListStopsInSystemRequest = {
  fromJSON(object: any): ListStopsInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListStopsInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListStopsInSystemReply(): ListStopsInSystemReply {
  return { stops: [] };
}

export const ListStopsInSystemReply = {
  fromJSON(object: any): ListStopsInSystemReply {
    return {
      stops: Array.isArray(object?.stops)
        ? object.stops.map((e: any) => StopPreview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListStopsInSystemReply): unknown {
    const obj: any = {};
    if (message.stops) {
      obj.stops = message.stops.map((e) =>
        e ? StopPreview.toJSON(e) : undefined
      );
    } else {
      obj.stops = [];
    }
    return obj;
  },
};

function createBaseGetStopInSystemRequest(): GetStopInSystemRequest {
  return { systemId: "", stopId: "" };
}

export const GetStopInSystemRequest = {
  fromJSON(object: any): GetStopInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      stopId: isSet(object.stopId) ? String(object.stopId) : "",
    };
  },

  toJSON(message: GetStopInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.stopId !== undefined && (obj.stopId = message.stopId);
    return obj;
  },
};

function createBaseListRoutesInSystemRequest(): ListRoutesInSystemRequest {
  return { systemId: "" };
}

export const ListRoutesInSystemRequest = {
  fromJSON(object: any): ListRoutesInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListRoutesInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListRoutesInSystemReply(): ListRoutesInSystemReply {
  return { routes: [] };
}

export const ListRoutesInSystemReply = {
  fromJSON(object: any): ListRoutesInSystemReply {
    return {
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => RoutePreviewWithAlerts.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListRoutesInSystemReply): unknown {
    const obj: any = {};
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? RoutePreviewWithAlerts.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    return obj;
  },
};

function createBaseGetRouteInSystemRequest(): GetRouteInSystemRequest {
  return { systemId: "", routeId: "" };
}

export const GetRouteInSystemRequest = {
  fromJSON(object: any): GetRouteInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      routeId: isSet(object.routeId) ? String(object.routeId) : "",
    };
  },

  toJSON(message: GetRouteInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.routeId !== undefined && (obj.routeId = message.routeId);
    return obj;
  },
};

function createBaseListTripsInRouteRequest(): ListTripsInRouteRequest {
  return { systemId: "", routeId: "" };
}

export const ListTripsInRouteRequest = {
  fromJSON(object: any): ListTripsInRouteRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      routeId: isSet(object.routeId) ? String(object.routeId) : "",
    };
  },

  toJSON(message: ListTripsInRouteRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.routeId !== undefined && (obj.routeId = message.routeId);
    return obj;
  },
};

function createBaseListTripsInRouteReply(): ListTripsInRouteReply {
  return { trips: [] };
}

export const ListTripsInRouteReply = {
  fromJSON(object: any): ListTripsInRouteReply {
    return {
      trips: Array.isArray(object?.trips)
        ? object.trips.map((e: any) => TripPreviewWithAlerts.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTripsInRouteReply): unknown {
    const obj: any = {};
    if (message.trips) {
      obj.trips = message.trips.map((e) =>
        e ? TripPreviewWithAlerts.toJSON(e) : undefined
      );
    } else {
      obj.trips = [];
    }
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

function createBaseListFeedsInSystemRequest(): ListFeedsInSystemRequest {
  return { systemId: "" };
}

export const ListFeedsInSystemRequest = {
  fromJSON(object: any): ListFeedsInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListFeedsInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListFeedsInSystemReply(): ListFeedsInSystemReply {
  return { feeds: [] };
}

export const ListFeedsInSystemReply = {
  fromJSON(object: any): ListFeedsInSystemReply {
    return {
      feeds: Array.isArray(object?.feeds)
        ? object.feeds.map((e: any) => FeedPreview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListFeedsInSystemReply): unknown {
    const obj: any = {};
    if (message.feeds) {
      obj.feeds = message.feeds.map((e) =>
        e ? FeedPreview.toJSON(e) : undefined
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

function createBaseGetFeedInSystemRequest(): GetFeedInSystemRequest {
  return { systemId: "", feedId: "" };
}

export const GetFeedInSystemRequest = {
  fromJSON(object: any): GetFeedInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
      feedId: isSet(object.feedId) ? String(object.feedId) : "",
    };
  },

  toJSON(message: GetFeedInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    message.feedId !== undefined && (obj.feedId = message.feedId);
    return obj;
  },
};

function createBaseListTransfersInSystemRequest(): ListTransfersInSystemRequest {
  return { systemId: "" };
}

export const ListTransfersInSystemRequest = {
  fromJSON(object: any): ListTransfersInSystemRequest {
    return {
      systemId: isSet(object.systemId) ? String(object.systemId) : "",
    };
  },

  toJSON(message: ListTransfersInSystemRequest): unknown {
    const obj: any = {};
    message.systemId !== undefined && (obj.systemId = message.systemId);
    return obj;
  },
};

function createBaseListTransfersInSystemReply(): ListTransfersInSystemReply {
  return { transfers: [] };
}

export const ListTransfersInSystemReply = {
  fromJSON(object: any): ListTransfersInSystemReply {
    return {
      transfers: Array.isArray(object?.transfers)
        ? object.transfers.map((e: any) => Transfer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListTransfersInSystemReply): unknown {
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
        ? CountAndHref.fromJSON(object.agencies)
        : undefined,
      feeds: isSet(object.feeds)
        ? CountAndHref.fromJSON(object.feeds)
        : undefined,
      routes: isSet(object.routes)
        ? CountAndHref.fromJSON(object.routes)
        : undefined,
      stops: isSet(object.stops)
        ? CountAndHref.fromJSON(object.stops)
        : undefined,
      transfers: isSet(object.transfers)
        ? CountAndHref.fromJSON(object.transfers)
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
        ? CountAndHref.toJSON(message.agencies)
        : undefined);
    message.feeds !== undefined &&
      (obj.feeds = message.feeds
        ? CountAndHref.toJSON(message.feeds)
        : undefined);
    message.routes !== undefined &&
      (obj.routes = message.routes
        ? CountAndHref.toJSON(message.routes)
        : undefined);
    message.stops !== undefined &&
      (obj.stops = message.stops
        ? CountAndHref.toJSON(message.stops)
        : undefined);
    message.transfers !== undefined &&
      (obj.transfers = message.transfers
        ? CountAndHref.toJSON(message.transfers)
        : undefined);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseStop(): Stop {
  return {
    id: "",
    name: undefined,
    longitude: undefined,
    latitude: undefined,
    url: undefined,
    stopHeadsigns: [],
    parentStop: undefined,
    childStops: [],
    serviceMaps: [],
    alerts: [],
    stopTimes: [],
    transfers: [],
  };
}

export const Stop = {
  fromJSON(object: any): Stop {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : undefined,
      longitude: isSet(object.longitude) ? Number(object.longitude) : undefined,
      latitude: isSet(object.latitude) ? Number(object.latitude) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
      stopHeadsigns: Array.isArray(object?.stopHeadsigns)
        ? object.stopHeadsigns.map((e: any) => String(e))
        : [],
      parentStop: isSet(object.parentStop)
        ? RelatedStop.fromJSON(object.parentStop)
        : undefined,
      childStops: Array.isArray(object?.childStops)
        ? object.childStops.map((e: any) => RelatedStop.fromJSON(e))
        : [],
      serviceMaps: Array.isArray(object?.serviceMaps)
        ? object.serviceMaps.map((e: any) => ServiceMapForStop.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => AlertPreview.fromJSON(e))
        : [],
      stopTimes: Array.isArray(object?.stopTimes)
        ? object.stopTimes.map((e: any) => Stop_StopTime.fromJSON(e))
        : [],
      transfers: Array.isArray(object?.transfers)
        ? object.transfers.map((e: any) => TransferAtStop.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Stop): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.longitude !== undefined && (obj.longitude = message.longitude);
    message.latitude !== undefined && (obj.latitude = message.latitude);
    message.url !== undefined && (obj.url = message.url);
    if (message.stopHeadsigns) {
      obj.stopHeadsigns = message.stopHeadsigns.map((e) => e);
    } else {
      obj.stopHeadsigns = [];
    }
    message.parentStop !== undefined &&
      (obj.parentStop = message.parentStop
        ? RelatedStop.toJSON(message.parentStop)
        : undefined);
    if (message.childStops) {
      obj.childStops = message.childStops.map((e) =>
        e ? RelatedStop.toJSON(e) : undefined
      );
    } else {
      obj.childStops = [];
    }
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? ServiceMapForStop.toJSON(e) : undefined
      );
    } else {
      obj.serviceMaps = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? AlertPreview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? Stop_StopTime.toJSON(e) : undefined
      );
    } else {
      obj.stopTimes = [];
    }
    if (message.transfers) {
      obj.transfers = message.transfers.map((e) =>
        e ? TransferAtStop.toJSON(e) : undefined
      );
    } else {
      obj.transfers = [];
    }
    return obj;
  },
};

function createBaseStop_StopTime(): Stop_StopTime {
  return {
    arrival: undefined,
    departure: undefined,
    future: false,
    stopSequence: 0,
    headsign: undefined,
    track: undefined,
    trip: undefined,
  };
}

export const Stop_StopTime = {
  fromJSON(object: any): Stop_StopTime {
    return {
      arrival: isSet(object.arrival)
        ? EstimatedTime.fromJSON(object.arrival)
        : undefined,
      departure: isSet(object.departure)
        ? EstimatedTime.fromJSON(object.departure)
        : undefined,
      future: isSet(object.future) ? Boolean(object.future) : false,
      stopSequence: isSet(object.stopSequence)
        ? Number(object.stopSequence)
        : 0,
      headsign: isSet(object.headsign) ? String(object.headsign) : undefined,
      track: isSet(object.track) ? String(object.track) : undefined,
      trip: isSet(object.trip) ? TripPreview.fromJSON(object.trip) : undefined,
    };
  },

  toJSON(message: Stop_StopTime): unknown {
    const obj: any = {};
    message.arrival !== undefined &&
      (obj.arrival = message.arrival
        ? EstimatedTime.toJSON(message.arrival)
        : undefined);
    message.departure !== undefined &&
      (obj.departure = message.departure
        ? EstimatedTime.toJSON(message.departure)
        : undefined);
    message.future !== undefined && (obj.future = message.future);
    message.stopSequence !== undefined &&
      (obj.stopSequence = Math.round(message.stopSequence));
    message.headsign !== undefined && (obj.headsign = message.headsign);
    message.track !== undefined && (obj.track = message.track);
    message.trip !== undefined &&
      (obj.trip = message.trip ? TripPreview.toJSON(message.trip) : undefined);
    return obj;
  },
};

function createBaseRelatedStop(): RelatedStop {
  return {
    id: "",
    name: "",
    parentStop: undefined,
    childStops: [],
    serviceMaps: [],
    href: undefined,
  };
}

export const RelatedStop = {
  fromJSON(object: any): RelatedStop {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      parentStop: isSet(object.parentStop)
        ? RelatedStop.fromJSON(object.parentStop)
        : undefined,
      childStops: Array.isArray(object?.childStops)
        ? object.childStops.map((e: any) => RelatedStop.fromJSON(e))
        : [],
      serviceMaps: Array.isArray(object?.serviceMaps)
        ? object.serviceMaps.map((e: any) => ServiceMapForStop.fromJSON(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: RelatedStop): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.parentStop !== undefined &&
      (obj.parentStop = message.parentStop
        ? RelatedStop.toJSON(message.parentStop)
        : undefined);
    if (message.childStops) {
      obj.childStops = message.childStops.map((e) =>
        e ? RelatedStop.toJSON(e) : undefined
      );
    } else {
      obj.childStops = [];
    }
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? ServiceMapForStop.toJSON(e) : undefined
      );
    } else {
      obj.serviceMaps = [];
    }
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTransferAtStop(): TransferAtStop {
  return {
    fromStop: undefined,
    toStop: undefined,
    type: "",
    minTransferTime: undefined,
    distance: undefined,
  };
}

export const TransferAtStop = {
  fromJSON(object: any): TransferAtStop {
    return {
      fromStop: isSet(object.fromStop)
        ? StopPreview.fromJSON(object.fromStop)
        : undefined,
      toStop: isSet(object.toStop)
        ? RelatedStop.fromJSON(object.toStop)
        : undefined,
      type: isSet(object.type) ? String(object.type) : "",
      minTransferTime: isSet(object.minTransferTime)
        ? Number(object.minTransferTime)
        : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : undefined,
    };
  },

  toJSON(message: TransferAtStop): unknown {
    const obj: any = {};
    message.fromStop !== undefined &&
      (obj.fromStop = message.fromStop
        ? StopPreview.toJSON(message.fromStop)
        : undefined);
    message.toStop !== undefined &&
      (obj.toStop = message.toStop
        ? RelatedStop.toJSON(message.toStop)
        : undefined);
    message.type !== undefined && (obj.type = message.type);
    message.minTransferTime !== undefined &&
      (obj.minTransferTime = Math.round(message.minTransferTime));
    message.distance !== undefined &&
      (obj.distance = Math.round(message.distance));
    return obj;
  },
};

function createBaseStopPreview(): StopPreview {
  return { id: "", name: "", href: undefined };
}

export const StopPreview = {
  fromJSON(object: any): StopPreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: StopPreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTripPreview(): TripPreview {
  return {
    id: "",
    route: undefined,
    lastStop: undefined,
    startedAt: undefined,
    vehicle: undefined,
    directionId: false,
    href: undefined,
  };
}

export const TripPreview = {
  fromJSON(object: any): TripPreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      route: isSet(object.route)
        ? RoutePreview.fromJSON(object.route)
        : undefined,
      lastStop: isSet(object.lastStop)
        ? StopPreview.fromJSON(object.lastStop)
        : undefined,
      startedAt: isSet(object.startedAt) ? Number(object.startedAt) : undefined,
      vehicle: isSet(object.vehicle)
        ? VehiclePreview.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: TripPreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.route !== undefined &&
      (obj.route = message.route
        ? RoutePreview.toJSON(message.route)
        : undefined);
    message.lastStop !== undefined &&
      (obj.lastStop = message.lastStop
        ? StopPreview.toJSON(message.lastStop)
        : undefined);
    message.startedAt !== undefined &&
      (obj.startedAt = Math.round(message.startedAt));
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? VehiclePreview.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTripPreviewWithAlerts(): TripPreviewWithAlerts {
  return {
    id: "",
    route: undefined,
    lastStop: undefined,
    startedAt: undefined,
    vehicle: undefined,
    directionId: false,
    href: undefined,
    alerts: [],
  };
}

export const TripPreviewWithAlerts = {
  fromJSON(object: any): TripPreviewWithAlerts {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      route: isSet(object.route)
        ? RoutePreview.fromJSON(object.route)
        : undefined,
      lastStop: isSet(object.lastStop)
        ? StopPreview.fromJSON(object.lastStop)
        : undefined,
      startedAt: isSet(object.startedAt) ? Number(object.startedAt) : undefined,
      vehicle: isSet(object.vehicle)
        ? VehiclePreview.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
      href: isSet(object.href) ? String(object.href) : undefined,
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => AlertPreview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TripPreviewWithAlerts): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.route !== undefined &&
      (obj.route = message.route
        ? RoutePreview.toJSON(message.route)
        : undefined);
    message.lastStop !== undefined &&
      (obj.lastStop = message.lastStop
        ? StopPreview.toJSON(message.lastStop)
        : undefined);
    message.startedAt !== undefined &&
      (obj.startedAt = Math.round(message.startedAt));
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? VehiclePreview.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    message.href !== undefined && (obj.href = message.href);
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? AlertPreview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
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
        ? RoutePreview.fromJSON(object.route)
        : undefined,
      lastStop: isSet(object.lastStop)
        ? StopPreview.fromJSON(object.lastStop)
        : undefined,
      startedAt: isSet(object.startedAt) ? Number(object.startedAt) : undefined,
      vehicle: isSet(object.vehicle)
        ? VehiclePreview.fromJSON(object.vehicle)
        : undefined,
      directionId: isSet(object.directionId)
        ? Boolean(object.directionId)
        : false,
      stopTimes: Array.isArray(object?.stopTimes)
        ? object.stopTimes.map((e: any) => Trip_StopTime.fromJSON(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: Trip): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.route !== undefined &&
      (obj.route = message.route
        ? RoutePreview.toJSON(message.route)
        : undefined);
    message.lastStop !== undefined &&
      (obj.lastStop = message.lastStop
        ? StopPreview.toJSON(message.lastStop)
        : undefined);
    message.startedAt !== undefined &&
      (obj.startedAt = Math.round(message.startedAt));
    message.vehicle !== undefined &&
      (obj.vehicle = message.vehicle
        ? VehiclePreview.toJSON(message.vehicle)
        : undefined);
    message.directionId !== undefined &&
      (obj.directionId = message.directionId);
    if (message.stopTimes) {
      obj.stopTimes = message.stopTimes.map((e) =>
        e ? Trip_StopTime.toJSON(e) : undefined
      );
    } else {
      obj.stopTimes = [];
    }
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTrip_StopTime(): Trip_StopTime {
  return {
    arrival: undefined,
    departure: undefined,
    future: false,
    stopSequence: 0,
    headsign: undefined,
    track: undefined,
    stop: undefined,
  };
}

export const Trip_StopTime = {
  fromJSON(object: any): Trip_StopTime {
    return {
      arrival: isSet(object.arrival)
        ? EstimatedTime.fromJSON(object.arrival)
        : undefined,
      departure: isSet(object.departure)
        ? EstimatedTime.fromJSON(object.departure)
        : undefined,
      future: isSet(object.future) ? Boolean(object.future) : false,
      stopSequence: isSet(object.stopSequence)
        ? Number(object.stopSequence)
        : 0,
      headsign: isSet(object.headsign) ? String(object.headsign) : undefined,
      track: isSet(object.track) ? String(object.track) : undefined,
      stop: isSet(object.stop) ? StopPreview.fromJSON(object.stop) : undefined,
    };
  },

  toJSON(message: Trip_StopTime): unknown {
    const obj: any = {};
    message.arrival !== undefined &&
      (obj.arrival = message.arrival
        ? EstimatedTime.toJSON(message.arrival)
        : undefined);
    message.departure !== undefined &&
      (obj.departure = message.departure
        ? EstimatedTime.toJSON(message.departure)
        : undefined);
    message.future !== undefined && (obj.future = message.future);
    message.stopSequence !== undefined &&
      (obj.stopSequence = Math.round(message.stopSequence));
    message.headsign !== undefined && (obj.headsign = message.headsign);
    message.track !== undefined && (obj.track = message.track);
    message.stop !== undefined &&
      (obj.stop = message.stop ? StopPreview.toJSON(message.stop) : undefined);
    return obj;
  },
};

function createBaseVehiclePreview(): VehiclePreview {
  return { id: "" };
}

export const VehiclePreview = {
  fromJSON(object: any): VehiclePreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: VehiclePreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

function createBaseRoutePreview(): RoutePreview {
  return { id: "", color: "", system: undefined, href: undefined };
}

export const RoutePreview = {
  fromJSON(object: any): RoutePreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      color: isSet(object.color) ? String(object.color) : "",
      system: isSet(object.system) ? System.fromJSON(object.system) : undefined,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: RoutePreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.color !== undefined && (obj.color = message.color);
    message.system !== undefined &&
      (obj.system = message.system ? System.toJSON(message.system) : undefined);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseRoutePreviewWithAlerts(): RoutePreviewWithAlerts {
  return { id: "", color: "", alerts: [], href: undefined };
}

export const RoutePreviewWithAlerts = {
  fromJSON(object: any): RoutePreviewWithAlerts {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      color: isSet(object.color) ? String(object.color) : "",
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => AlertPreview.fromJSON(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: RoutePreviewWithAlerts): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.color !== undefined && (obj.color = message.color);
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? AlertPreview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    message.href !== undefined && (obj.href = message.href);
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
    periodicity: undefined,
    agency: undefined,
    serviceMaps: [],
    alerts: [],
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
      periodicity: isSet(object.periodicity)
        ? Number(object.periodicity)
        : undefined,
      agency: isSet(object.agency)
        ? AgencyPreview.fromJSON(object.agency)
        : undefined,
      serviceMaps: Array.isArray(object?.serviceMaps)
        ? object.serviceMaps.map((e: any) => ServiceMapForRoute.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => Alert.fromJSON(e))
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
    message.periodicity !== undefined &&
      (obj.periodicity = message.periodicity);
    message.agency !== undefined &&
      (obj.agency = message.agency
        ? AgencyPreview.toJSON(message.agency)
        : undefined);
    if (message.serviceMaps) {
      obj.serviceMaps = message.serviceMaps.map((e) =>
        e ? ServiceMapForRoute.toJSON(e) : undefined
      );
    } else {
      obj.serviceMaps = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) => (e ? Alert.toJSON(e) : undefined));
    } else {
      obj.alerts = [];
    }
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

function createBaseFeedPreview(): FeedPreview {
  return {
    id: "",
    periodicUpdateEnabled: false,
    periodicUpdatePeriod: undefined,
    href: undefined,
  };
}

export const FeedPreview = {
  fromJSON(object: any): FeedPreview {
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

  toJSON(message: FeedPreview): unknown {
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
        ? object.routes.map((e: any) => RoutePreview.fromJSON(e))
        : [],
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => AlertPreview.fromJSON(e))
        : [],
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
        e ? RoutePreview.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) =>
        e ? AlertPreview.toJSON(e) : undefined
      );
    } else {
      obj.alerts = [];
    }
    return obj;
  },
};

function createBaseAgencyPreviewWithAlerts(): AgencyPreviewWithAlerts {
  return { id: "", name: "", alerts: [], href: undefined };
}

export const AgencyPreviewWithAlerts = {
  fromJSON(object: any): AgencyPreviewWithAlerts {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      alerts: Array.isArray(object?.alerts)
        ? object.alerts.map((e: any) => String(e))
        : [],
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: AgencyPreviewWithAlerts): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    if (message.alerts) {
      obj.alerts = message.alerts.map((e) => e);
    } else {
      obj.alerts = [];
    }
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseAgencyPreview(): AgencyPreview {
  return { id: "", name: "", href: undefined };
}

export const AgencyPreview = {
  fromJSON(object: any): AgencyPreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: AgencyPreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseAlertPreview(): AlertPreview {
  return { id: "", cause: "", effect: "" };
}

export const AlertPreview = {
  fromJSON(object: any): AlertPreview {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      cause: isSet(object.cause) ? String(object.cause) : "",
      effect: isSet(object.effect) ? String(object.effect) : "",
    };
  },

  toJSON(message: AlertPreview): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.cause !== undefined && (obj.cause = message.cause);
    message.effect !== undefined && (obj.effect = message.effect);
    return obj;
  },
};

function createBaseAlert(): Alert {
  return {
    id: "",
    cause: "",
    effect: "",
    activePeriod: undefined,
    messages: [],
  };
}

export const Alert = {
  fromJSON(object: any): Alert {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      cause: isSet(object.cause) ? String(object.cause) : "",
      effect: isSet(object.effect) ? String(object.effect) : "",
      activePeriod: isSet(object.activePeriod)
        ? Alert_ActivePeriod.fromJSON(object.activePeriod)
        : undefined,
      messages: Array.isArray(object?.messages)
        ? object.messages.map((e: any) => Alert_Message.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Alert): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.cause !== undefined && (obj.cause = message.cause);
    message.effect !== undefined && (obj.effect = message.effect);
    message.activePeriod !== undefined &&
      (obj.activePeriod = message.activePeriod
        ? Alert_ActivePeriod.toJSON(message.activePeriod)
        : undefined);
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Alert_Message.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
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

function createBaseAlert_Message(): Alert_Message {
  return { header: "", description: "", language: undefined, url: undefined };
}

export const Alert_Message = {
  fromJSON(object: any): Alert_Message {
    return {
      header: isSet(object.header) ? String(object.header) : "",
      description: isSet(object.description) ? String(object.description) : "",
      language: isSet(object.language) ? String(object.language) : undefined,
      url: isSet(object.url) ? String(object.url) : undefined,
    };
  },

  toJSON(message: Alert_Message): unknown {
    const obj: any = {};
    message.header !== undefined && (obj.header = message.header);
    message.description !== undefined &&
      (obj.description = message.description);
    message.language !== undefined && (obj.language = message.language);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },
};

function createBaseEstimatedTime(): EstimatedTime {
  return { time: undefined, delay: undefined, uncertainty: undefined };
}

export const EstimatedTime = {
  fromJSON(object: any): EstimatedTime {
    return {
      time: isSet(object.time) ? Number(object.time) : undefined,
      delay: isSet(object.delay) ? Number(object.delay) : undefined,
      uncertainty: isSet(object.uncertainty)
        ? Number(object.uncertainty)
        : undefined,
    };
  },

  toJSON(message: EstimatedTime): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = Math.round(message.time));
    message.delay !== undefined && (obj.delay = Math.round(message.delay));
    message.uncertainty !== undefined &&
      (obj.uncertainty = Math.round(message.uncertainty));
    return obj;
  },
};

function createBaseServiceMapForStop(): ServiceMapForStop {
  return { configId: "", routes: [] };
}

export const ServiceMapForStop = {
  fromJSON(object: any): ServiceMapForStop {
    return {
      configId: isSet(object.configId) ? String(object.configId) : "",
      routes: Array.isArray(object?.routes)
        ? object.routes.map((e: any) => RoutePreview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ServiceMapForStop): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? RoutePreview.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    return obj;
  },
};

function createBaseServiceMapForRoute(): ServiceMapForRoute {
  return { configId: "", stops: [] };
}

export const ServiceMapForRoute = {
  fromJSON(object: any): ServiceMapForRoute {
    return {
      configId: isSet(object.configId) ? String(object.configId) : "",
      stops: Array.isArray(object?.stops)
        ? object.stops.map((e: any) => StopPreview.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ServiceMapForRoute): unknown {
    const obj: any = {};
    message.configId !== undefined && (obj.configId = message.configId);
    if (message.stops) {
      obj.stops = message.stops.map((e) =>
        e ? StopPreview.toJSON(e) : undefined
      );
    } else {
      obj.stops = [];
    }
    return obj;
  },
};

function createBaseCountAndHref(): CountAndHref {
  return { count: 0, href: undefined };
}

export const CountAndHref = {
  fromJSON(object: any): CountAndHref {
    return {
      count: isSet(object.count) ? Number(object.count) : 0,
      href: isSet(object.href) ? String(object.href) : undefined,
    };
  },

  toJSON(message: CountAndHref): unknown {
    const obj: any = {};
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.href !== undefined && (obj.href = message.href);
    return obj;
  },
};

function createBaseTransfer(): Transfer {
  return {
    fromStop: undefined,
    toStop: undefined,
    type: "",
    minTransferTime: 0,
    distance: undefined,
  };
}

export const Transfer = {
  fromJSON(object: any): Transfer {
    return {
      fromStop: isSet(object.fromStop)
        ? StopPreview.fromJSON(object.fromStop)
        : undefined,
      toStop: isSet(object.toStop)
        ? StopPreview.fromJSON(object.toStop)
        : undefined,
      type: isSet(object.type) ? String(object.type) : "",
      minTransferTime: isSet(object.minTransferTime)
        ? Number(object.minTransferTime)
        : 0,
      distance: isSet(object.distance) ? Number(object.distance) : undefined,
    };
  },

  toJSON(message: Transfer): unknown {
    const obj: any = {};
    message.fromStop !== undefined &&
      (obj.fromStop = message.fromStop
        ? StopPreview.toJSON(message.fromStop)
        : undefined);
    message.toStop !== undefined &&
      (obj.toStop = message.toStop
        ? StopPreview.toJSON(message.toStop)
        : undefined);
    message.type !== undefined && (obj.type = message.type);
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
    contentHash: undefined,
    contentLength: undefined,
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
      contentHash: isSet(object.contentHash)
        ? String(object.contentHash)
        : undefined,
      contentLength: isSet(object.contentLength)
        ? Number(object.contentLength)
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
    message.contentHash !== undefined &&
      (obj.contentHash = message.contentHash);
    message.contentLength !== undefined &&
      (obj.contentLength = Math.round(message.contentLength));
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
