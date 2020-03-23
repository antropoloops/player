import { useEffect } from "react";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GA || "");

export default function useAnalytics(
  location: string = window.location.pathname + window.location.search,
) {
  useEffect(() => {
    ReactGA.pageview(location);
  }, [location]);
}
