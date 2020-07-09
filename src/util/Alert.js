export function buildStatusFromAlerts(alerts) {
  if (alerts.length === 0) {
    return "GOOD_SERVICE"
  }
  for (const alert of alerts) {
    if (alert.cause.includes("DELAY") ) {
      return "DELAYS"
    }
    if (alert.effect.includes("DELAY") ) {
      return "DELAYS"
    }
  }
  return "SERVICE_CHANGE"
}

export function getHeader(alert) {
  let fallbackHeader = ""
  for (const message of alert.messages) {
    if (message.language.toLowerCase() === "en") {
      return message.header
    }
    fallbackHeader = message.header
  }
  return fallbackHeader
}

export function getDescription(alert) {
  let fallbackDescription = ""
  for (const message of alert.messages) {
    if (message.language.toLowerCase() === "en") {
      return message.description
    }
    fallbackDescription = message.description
  }
  return fallbackDescription
}
