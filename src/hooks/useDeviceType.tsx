import { useMediaQuery } from "react-responsive";

export function useDeviceType() {
  const isLandscape = useMediaQuery({
    query: "(orientation: landscape)",
  });
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const isMobile = !isDesktop;

  return { isDesktop, isMobile, isLandscape };
}
