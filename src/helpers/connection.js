export function checkConnection() {
  if (navigator.onLine) {
    return true;
  } else {
    console.log("You're disconnected!");
    return false;
  }
}
