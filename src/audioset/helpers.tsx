import { Project, Bundle } from ".";

export function communityProject(bundle: Bundle): Project {
  const project = bundle as Project;
  const audiosets = project.audiosets
    .filter((p) => p.description.indexOf("cosmic@") !== -1)
    .map((audioset) => ({
      ...audioset,
      description: audioset.description.split("cosmic@")[0],
    }));
  return { ...project, audiosets };
}
