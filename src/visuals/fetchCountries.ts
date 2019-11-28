import * as topojson from "topojson";
import { MapMetadata } from "../audioset";

export async function fetchCountries(visuals: MapMetadata) {
  const response = await fetch(visuals.geomap.url);
  const geodata = await response.json();

  const collection = topojson.feature(
    geodata,
    geodata.objects.countries,
  ) as any;
  return collection.features.filter((country: any) => country.id !== "010");
}
