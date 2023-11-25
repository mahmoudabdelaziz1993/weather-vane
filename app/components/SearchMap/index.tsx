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
        place_id: 287478948,
        licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
        osm_id: 5466227,
        boundingbox: ["29.7483062", "30.3209168", "31.2200331", "31.9090054"],
        lat: "30.0443879",
        lon: "31.2357257",
        display_name: "Cairo, Cairo Governorate, Egypt",
        class: "place",
        type: "city",
        importance: 0.7960286135601556
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