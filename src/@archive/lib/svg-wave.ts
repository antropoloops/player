export function getPolygonPoints(
  buffer: AudioBuffer,
  width: number,
  height: number,
  offset: number = 0,
  duration?: number
) {
  const data0 = buffer.getChannelData(0);
  const data1 = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : data0;

  return calculatePolygonPoints(
    width,
    height,
    data0,
    data1,
    buffer.duration,
    offset,
    duration || buffer.duration - offset
  );
}
// https://github.com/gridsound/gs-ui-components/blob/299adc0c5739a578453d794e875c0e8e8a74d935/gsuiWaveform/gsuiWaveform.draw.js
export function calculatePolygonPoints(
  w: number,
  h: number,
  data0: Float32Array,
  data1: Float32Array,
  bufferDuration: number,
  offset: number,
  duration: number
): string {
  const h2 = h / 2,
    step = ((duration / bufferDuration) * data0.length) / w,
    ind = ~~((offset / bufferDuration) * data0.length),
    iinc = ~~Math.max(1, step / 100);
  let dots0 = `0,${h2 + data0[ind] * h2}`,
    dots1 = `0,${h2 + data1[ind] * h2}`;

  for (let p = 1; p < w; ++p) {
    let lmin = Infinity,
      rmax = -Infinity,
      i = ~~(ind + (p - 1) * step);
    const iend = i + step;

    for (; i < iend; i += iinc) {
      lmin = Math.min(lmin, data0[i], data1[i]);
      rmax = Math.max(rmax, data0[i], data1[i]);
    }
    if (Math.abs(rmax - lmin) * h2 < 1) {
      rmax += 1 / h;
      lmin -= 1 / h;
    }
    dots0 += ` ${p},${h2 + lmin * h2}`;
    dots1 = `${p},${h2 + rmax * h2} ${dots1}`;
  }
  return `${dots0} ${dots1}`;
}
