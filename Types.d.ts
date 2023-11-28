// types.ts

export type Place = {
  place_id: number;
  licence: string;
  powered_by?: PoweredBy;
  osm_type?: OsmType;
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

// weather types
export type Weather = {
  latitude:              number;
  longitude:             number;
  generationtime_ms:     number;
  utc_offset_seconds:    number;
  timezone:              string;
  timezone_abbreviation: string;
  elevation:             number;
  current_units:         CurrentUnits;
  current:               Current;
  daily_units:           DailyUnits;
  daily:                 Daily;
}

export type Current = {
  time:                 string;
  interval:             number;
  apparent_temperature: number;
  is_day:               number;
}

export type CurrentUnits = {
  time:                 string;
  interval:             string;
  apparent_temperature: string;
  is_day:               string;
}

export type Daily = {
  time:                     Date[];
  weather_code:             number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise:                  string[];
  sunset:                   string[];
}

export type DailyUnits = {
  time:                     string;
  weather_code:             string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise:                  string;
  sunset:                   string;
}

