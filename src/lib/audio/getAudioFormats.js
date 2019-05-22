// https://diveintohtml5.info/everything.html

const formats = [
  ["ogg", a => a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")],
  ["mp3", a => a.canPlayType("audio/mpeg;").replace(/no/, "")],
  ["wav", a => a.canPlayType('audio/wav; codecs="1"').replace(/no/, "")]
];

let supported = null;

export default function getAudioFormats() {
  if (supported) return supported;

  const a = document.createElement("audio");
  if (!a.canPlayType) return {};
  supported = formats.map(([type, test]) => (test(a) ? type : undefined));
  return supported;
}
