export function timestampToDateString(timestamp) {
  let date = new Date(timestamp * 1000);
  let month = date.toLocaleString('default', {month: 'long'});
  return (
    month + " " +
    date.getDate() + " " +
    date.getFullYear()
  )
}

export function timestampToTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).substr(-2);
  return (
    hours + ":" + minutes
  )
}

export function timestampToTimeElapsed(timestamp) {
  let secondsElapsed = (new Date()).getTime() / 1000 - timestamp;
  let minutesElapsed = Math.ceil(secondsElapsed/60);
  if (minutesElapsed <= 1) {
    return "less than 1 minute ago"
  }
  return (
    minutesElapsed + " minutes ago"
  )
}