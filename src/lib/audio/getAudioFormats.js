// https://diveintohtml5.info/everything.html

const test = {
  mp3: a => a.canPlayType("audio/mpeg;").replace(/no/, ""),
  wav: a => a.canPlayType('audio/wav; codecs="1"').replace(/no/, ""),
  ogg: a => a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")
};

export default function getAudioSupport() {
  const a = document.createElement("audio");
  if (!a.canPlayType) return {};
  return Object.keys(test).reduce((support, type) => {
    support[type] = !!test[type](a);
    return support;
  }, {});
}
