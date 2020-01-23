import { RefObject } from "react";

const ref: RefObject<HTMLDivElement> = { current: null };

export function scrollToTop() {
  if (ref.current) {
    const el = ref.current;
    el.scrollTo(0, 0);
  }
}

export function useScrollTop() {
  return ref;
}
