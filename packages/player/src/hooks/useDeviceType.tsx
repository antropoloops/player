import { useMediaQuery } from "react-responsive";

export function useDeviceType() {
  const isDesktop = useMediaQuery({
    query: "(orientation: landscape)",
  });
  const isMobile = !isDesktop;
  return { isDesktop, isMobile };
}
