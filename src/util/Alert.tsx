import { Alert, AlertPreview, AlertText } from "../api/types";

export function buildStatusFromAlerts(alerts: AlertPreview[]) {
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
  }
  return "SERVICE_CHANGE"
}

export default function parseAlert(apiAlert: Alert): ParsedAlert {
  return new ParsedAlert(getEnglishText(apiAlert.header), getEnglishText(apiAlert.description))
}

function getEnglishText(texts: AlertText[] | undefined): string {
  if (texts === undefined) {
    return ""
  }
  for (const text of texts) {
    if (text.language.toLowerCase() === "en") {
      return text.text
    }
  }
  return ""
}

export class ParsedAlert {
  header: string;
  description: string;

  constructor(header: string, description: string) {
    this.header = header;
    this.description = description;
  }
}
