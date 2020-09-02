import { getProject } from "./projects";
import { getAudioset } from "./audiosets";
import { getBundle } from "./bundles";
import { listSections, getSection } from "./sections";
import { listTopics, getTopic } from "./topics";
import { listGuides, getGuide } from "./guides";
import { getPage } from "./pages";

const API = {
  projects: {
    get: getProject,
  },
  audiosets: {
    get: getAudioset,
  },
  bundles: {
    get: getBundle,
  },
  topics: {
    list: listTopics,
    get: getTopic,
  },
  guides: {
    list: listGuides,
    get: getGuide,
  },
  pages: {
    get: getPage,
  },
  sections: {
    list: listSections,
    get: getSection,
  },
};

export default API;
