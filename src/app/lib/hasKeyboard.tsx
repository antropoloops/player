let cached: boolean;

export function hasKeyboard() {
  if (cached === undefined) {
    cached = !isTouchDevice();
  }
  return cached;
}

// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
function isTouchDevice(): boolean {
  if ("ontouchstart" in window) {
    return true;
  }

  const prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join(
    ""
  );
  return window.matchMedia(query).matches;
}
