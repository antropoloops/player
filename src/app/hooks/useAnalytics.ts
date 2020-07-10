import { useEffect } from "react";
import ReactGA from "react-ga";
import { TRACKING_CODE } from "../config";

if (TRACKING_CODE) {
  ReactGA.initialize(TRACKING_CODE);
}

export default function useAnalytics(
  location = window.location.pathname + window.location.search
) {
  useEffect(() => {
    if (TRACKING_CODE) {
      ReactGA.pageview(location);
    }
  }, [location]);
}
