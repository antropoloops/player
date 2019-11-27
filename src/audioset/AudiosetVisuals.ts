/**
 * How visuals data are stored
 */
export type AudiosetVisuals = MapVisuals | PanelVisuals;

export interface MapVisuals {
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
export interface PanelVisuals {
  mode: "panel";
  image: {
    url: string;
    size: {
      width: number;
      height: number;
    };
  };
}
