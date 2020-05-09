import React from "react";
import { useScrollTop } from "./useScroll";

/**
 *
 */
export const Scroll = ({ children }: any) => {
  const ref = useScrollTop();
  return (
    <div ref={ref} id="scroll" className="scroll">
      {children}
    </div>
  );
};
