/**
 * How visuals data are stored
 */
export type VisualsMetadata = MapMetadata | PanelMetadata;

export interface MapMetadata {
  mode: "map";
  geomap: {
    url: string;
    scaleFactor: number;
    center: {
      x: number;
      y: number;
    };
  };
}
export interface PanelMetadata {
  mode: "panel";
  image: {
    url: string;
    size: {
      width: number;
      height: number;
    };
  };
}
