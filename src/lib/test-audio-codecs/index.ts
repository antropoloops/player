// see howler.js
export type SupportedCodecs = {
  mp3: boolean;
  ogg: boolean;
  wav: boolean;
  weba: boolean;
};
let codecs: SupportedCodecs | null = null;

export default function getSupportedAudioCodecs(): SupportedCodecs {
  if (codecs) {
    return codecs;
  }
  codecs = checkSupportedCodecs();
  return codecs;
}

function checkSupportedCodecs(): SupportedCodecs {
  const test = document.createElement("audio");
  if (!test || !test.canPlayType) {
    return {
      mp3: false,
      wav: false,
      ogg: false,
      weba: false,
    };
  } else {
    const canPlay = (str: string): boolean =>
      !!test.canPlayType(str).replace(/^no$/, "");
    return {
      mp3: canPlay("audio/mpeg;") || canPlay("audio/mp3;"),
      ogg: canPlay('audio/ogg; codecs="vorbis"'),
      wav: canPlay('audio/wav; codecs="1"'),
      weba: canPlay('audio/webm; codecs="vorbis"'),
    };
  }
}
