import Emitter from "tiny-emitter";
import debug from "debug";

// Utilities
const log = debug("atpls:session:channels");
const createShareId = () => 1111; // Math.floor(Math.random() * 8000) + 1000;
const noOp = () => null;
// const url =
//   process.env.NODE_ENV === "production"
//     ? "wss://atpls-channel.herokuapp.com/"
//     : "ws://localhost:4000";
const url = "wss://atpls-channel.herokuapp.com/";

const delay = () => new Promise(resolve => setTimeout(resolve, 0));

// State
let events;
let ws, channel;

log("URL %s", url);

function send(data) {
  if (!ws) return;
  log("send", data);
  ws.send(JSON.stringify(data));
}

export function connect() {
  if (ws) return Promise.resolve(events);

  return new Promise((resolve, reject) => {
    log("connecting");
    ws = new WebSocket(url);
    events = new Emitter();

    ws.onclose = event => {
      log("closed %o", event);
      ws = null;
      events.emit("close", event);
    };
    ws.onerror = err => {
      log("Errror %o", err);
      events.emit("error", err);
    };
    ws.onmessage = msg => {
      try {
        const event = JSON.parse(msg.data);
        log("received %o", event);
        if (event.type) events.emit(event.type, event);
      } catch (err) {
        events.emit("error", err);
      }
    };
    ws.onopen = () => {
      log("connected");
      resolve(events);
    };
  });
}

export default function createEffects(audioset, callback) {
  delay()
    .then(connect)
    .then(events => {
      if (callback) events.on("action", event => callback(event.action));
    });
  return { start: noOp, stop: noOp };
}

export function broadcast(action) {
  log("Broadcast %o", action);
  send({ type: "action", action, channel });
}

export function requestJoinSession(c) {
  channel = c;
  return new Promise((resolve, reject) => {
    connect().then(() => {
      send({ type: "subscribe", channel });
      send({ type: "sync", channel });
      events.once("state", event => {
        log("JOINED %o", event);
        resolve(event.audioset);
      });
    });
  });
}

export function requestSharedLinkToken(audioset) {
  return new Promise((resolve, reject) => {
    connect().then(() => {
      if (!channel) {
        channel = createShareId();
        send({ type: "subscribe", channel });
        events.on("sync", () => {
          send({ type: "state", channel, audioset });
        });
      }
      resolve(channel);
    });
  });
}
