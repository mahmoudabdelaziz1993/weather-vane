"use client";
import { Place } from "@/Types";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CityAutocomplete from "./CityAutocomplete";
import MapComponent from "./BingMap";
import  './SearchMap.css'
type Props = {};
const MemoizedCityAutocomplete = React.memo(CityAutocomplete);
const MemoizedMapComponent = React.memo(MapComponent);
export default function SearchMap({}: Props) {
  const { get: getCookies, set: setCookies } = useCookies();
  const cookies = useMemo(() => ({
    get: (key: string) => getCookies(key) || undefined,
    set: (key: string, value: string) => setCookies(key, value, { path: "/" }),
  }), [getCookies, setCookies]);

  const initialPlace: Place = useMemo(() => {
    const selectedItem = cookies.get('selectedItem');
    if (selectedItem && selectedItem !== "undefined") {
      return JSON.parse(selectedItem);
    } else {
      return {
        
          "place_id": 253638002,
          "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
          "powered_by": "Map Maker: https://maps.co",
          "osm_type": "way",
          "osm_id": 754208062,
          "boundingbox": [
            "31.0809726",
            "31.1440654",
            "29.7380042",
            "29.8262517"
          ],
          "lat": "31.11260175",
          "lon": "29.77672243708097",
          "display_name": "Al Agamy, Al Hanuvil, Alexandria Governorate, Egypt",
          "class": "place",
          "type": "neighbourhood",
          "importance": 0.96
        
      };
    }
  }, [cookies]);

  const initialPlaces = useMemo(() => {
    const selectedItems = cookies.get('selectedItems');
    if (selectedItems && selectedItems !== "undefined") {
      return JSON.parse(selectedItems);
    } else {
      return [initialPlace];
    }
  }, [cookies, initialPlace]);

  const [selectedItems, setSelectedItems] = useState<Place[]>(initialPlaces);
  const [primaryColor, setPrimaryColor] = useState<string>(cookies.get("primaryColor") || "blue");
  const [secondaryColor, setSecondaryColor] = useState<string>(cookies.get("secondaryColor") || "green");
  const [lastSelectedItem, setLastSelectedItem] = useState<Place>(initialPlace);

  const handleEffect = useCallback(() => {
    

    const selectedItemsJson = JSON.stringify(selectedItems);
    const lastSelectedItemJson = JSON.stringify(lastSelectedItem);

    cookies.set("selectedItems", selectedItemsJson);
    cookies.set("selectedItem", lastSelectedItemJson);
  }, [selectedItems,lastSelectedItem, cookies]);

  useEffect(() => {
    handleEffect();
  }, [handleEffect]);

  return (
    <div className="grid w-full relative">



<div className="card image-full rounded-none">
  <figure className="before:bg-transparent "><MemoizedMapComponent lat={lastSelectedItem?.lat} lon={lastSelectedItem?.lon} display_name={lastSelectedItem?.display_name} primaryColor={primaryColor} secondaryColor={secondaryColor} pins={selectedItems} />
</figure>
  <div className="card-body ">
  <MemoizedCityAutocomplete selectedItems={selectedItems} setSelectedItems={setSelectedItems} lastSelectedItem={lastSelectedItem} setLastSelectedItem={setLastSelectedItem} />

  </div>
</div>
    </div>);}