import { useMediaQuery } from "react-responsive";
export function useIsDesktop() {
  return useMediaQuery({
    query: "(orientation: landscape)",
  });
}
