import { getProject } from "./projects";
import { getAudioset } from "./audiosets";
import { getBundle } from "./bundles";
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
};

export default API;
