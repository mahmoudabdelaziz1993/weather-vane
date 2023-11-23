// types.ts

export type Place = {
  place_id: number;
  licence: string;
  powered_by: PoweredBy;
  osm_type: OsmType;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export enum OsmType {
  Node = "node",
  Way = "way",
}

export enum PoweredBy {
  MapMakerHTTPSMapsCo = "Map Maker: https://maps.co",
}