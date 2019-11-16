import React, { useEffect, useRef } from "react";

/**
 *
 */
export const Scroll = ({ children }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      el.scrollTo(0, 0);
    }
  });
  return (
    <div ref={ref} id="scroll" className="scroll">
      {children}
    </div>
  );
};
