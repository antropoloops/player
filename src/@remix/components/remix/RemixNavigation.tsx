import { Link } from "react-router-dom";
import { Clip, Project, Track } from "../../../models";
import routes from "../../../routes";

const Separator = <span className="px-3">/</span>;

export default function RemixNavigation({
  remix,
  track,
  clip,
  current,
}: {
  remix?: Project;
  track?: Track;
  clip?: Clip;
  current?: string;
}) {
  return (
    <div className="py-4 text-white">
      {remix && (
        <Link className="hover:underline" to={routes.remix(remix.id)}>
          {remix.meta.title}
        </Link>
      )}
      {track && Separator}
      {track && (
        <Link
          className="hover:underline"
          to={routes.remixTrack(track.projectID, track.id)}
        >
          {track.meta.name}
        </Link>
      )}
      {clip && Separator}
      {clip && (
        <Link
          className="hover:underline"
          to={routes.remixClip(clip.projectID, clip.id)}
        >
          {clip.meta.name}
        </Link>
      )}
      {current && Separator}
      {current && <span className="opacity-50">{current}</span>}
    </div>
  );
}
