import React from "react";
import RouteLogo, {replaceRouteIdsWithImages} from '../shared/routelogo/RouteLogo'

export function buildStatusFromAlerts(alerts) {
  if (alerts.length === 0) {
    return "GOOD_SERVICE"
  }
  for (const alert of alerts) {
    if (alert.cause.includes("DELAY")) {
      return "DELAYS"
    }
    if (alert.effect.includes("DELAY")) {
      return "DELAYS"
    }
    if (alert.messages != null && getHeader(alert).toUpperCase().includes("DELAY")) {
      return "DELAYS"
    }
    if (alert.messages != null && getNonEmptyDescription(alert).toUpperCase().includes("DELAY")) {
      return "DELAYS"
    }
  }
  return "SERVICE_CHANGE"
}

class Alert {
  constructor(header, description) {
    this.header = header;
    this.description = description;
  }
}

function getHeader(alert) {
  let fallbackHeader = ""
  for (const message of alert.messages) {
    if (message.language.toLowerCase() === "en") {
      return message.header
    }
    fallbackHeader = message.header
  }
  return fallbackHeader
}

function getDescriptionByLanguage(alert, language) {
  for (const message of alert.messages) {
    if (message.language.toLowerCase() === language.toLowerCase()) {
      if (message.description.trim() !== "") {
        return message.description
      }
    }
  }
  return null
}

function getNonEmptyDescription(alert) {
  for (const message of alert.messages) {
    if (message.description.trim() !== "") {
      return message.description
    }
  }
  return "(No description provided)"
}


function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function buildAlertFromDescription(description) {
  let lines = []
  let rawLines = description.split("<br>")
  if (rawLines.length === 0) {
    return new Alert("", "")
  }
  let i = 0;
  for (const rawLine of rawLines) {
    let rawLineWithoutHtml = rawLine.replace(/<[^>]*>?/gm, '').trim();
    if (rawLineWithoutHtml === "") {
      continue
    }
    rawLineWithoutHtml = rawLineWithoutHtml.replace("&#x2022;", "-")
    if (i === 0) {
      rawLineWithoutHtml = toTitleCase(rawLineWithoutHtml)
    }
    lines.push(<p key={i}>{replaceRouteIdsWithImages(rawLineWithoutHtml)}</p>)
    i += 1;
  }
  const header = lines.shift()
  return new Alert(header, lines)
}

export default function parseAlert(apiAlert) {
  const englishDescription = getDescriptionByLanguage(apiAlert, "en");
  if (englishDescription != null) {
    return new Alert(getHeader(apiAlert), englishDescription);
  }
  return buildAlertFromDescription(getNonEmptyDescription(apiAlert))
}
