import debounce from "lodash.debounce";
import ResizeObserver from "resize-observer-polyfill";

type ResizeListener = (width: number, heigth: number) => void;

export function addResizeObserver(element: any, callback: ResizeListener) {
  const debouncedCallback = debounce(callback, 250);
  const resizeObserver = new ResizeObserver(entries => {
    if (!Array.isArray(entries)) {
      return;
    }
    // Since we only observe the one element, we don't need to loop over the array
    if (!entries.length) {
      return;
    }
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    debouncedCallback(width, height);
  });
  resizeObserver.observe(element);
  return () => resizeObserver.unobserve(element);
}
