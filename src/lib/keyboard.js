/**
 * Create a keyboard input
 * @param {Audioset} audioset
 * @param {{ onPress, onRelease}} events - callbacks for events
 */
export default function createKeyboardInput(audioset, events) {
  const pressed = {};
  const keyMap = buildKeymap(audioset.keyboard);

  function onKeyDown(e) {
    const key = e.key;
    if (pressed[key]) return;

    pressed[key] = true;

    const clip = keyMap[key];
    if (clip) events.onPress(clip);
  }

  function onKeyUp(e) {
    const key = e.key;
    pressed[key] = false;

    const clip = keyMap[key];
    if (clip) events.onRelease(clip);
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  console.log("keyboard input!");

  return () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);

    console.log("keyboard input removed");
  };
}

function buildKeymap(keyboard) {
  if (!keyboard) return {};
  const { defaults, keyMap } = keyboard;
  return Object.keys(keyMap).reduce((map, key) => {
    const value = { ...defaults, ...keyMap[key] };
    // FIXME: should change this in a data migration
    value.id = value.clipId;
    value.key = key;
    map[key] = value;
    map[key.toUpperCase()] = value;
    map[value.clipId] = value;
    return map;
  }, {});
}
