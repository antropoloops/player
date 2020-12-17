import { DataStore } from "../datastore/datastore";
import {
  Archive,
  Recording,
  Remix,
  Sample,
  RemixMetadata,
  Track,
  TrackMetadata,
} from "../datastore/models";

export * from "./group-service";

// REMIXES
export async function listRemixes(groupId?: string) {
  const remixes = await DataStore.query(Remix);
  return groupId ? remixes.filter((r) => r.groupID === groupId) : remixes;
}

export async function getRemix(id: string, groupId?: string) {
  const remix = await DataStore.query(Remix, id);
  return groupId ? (remix?.groupID === groupId ? remix : undefined) : remix;
}

export async function listArchives() {
  return DataStore.query(Archive);
}
export async function listRecordings() {
  return DataStore.query(Recording);
}

export async function listSamples() {
  return DataStore.query(Sample);
}

export async function listTracks(filter?: (t: Track) => boolean) {
  const tracks = await DataStore.query(Track);
  return filter ? tracks.filter(filter) : tracks;
}
export async function listRemixTracks(remixId: string) {
  return listTracks((t) => t.remixID === remixId);
}

export async function createTrack(
  remix: Pick<Remix, "id" | "groupID">,
  meta?: TrackMetadata
) {
  return await DataStore.save(
    new Track({
      groupID: remix.groupID,
      remixID: remix.id,
      meta: meta || {},
    })
  );
}

export async function listRemixSamples(groupId: string, remixId: string) {
  const samples = await listSamples();
  return samples.filter(
    (s) => s.remix?.id === remixId && s.groupID === groupId
  );
}

export async function createRemix(groupId: string, meta?: RemixMetadata) {
  return await DataStore.save(
    new Remix({
      groupID: groupId,
      meta: meta || {},
    })
  );
}
