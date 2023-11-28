"use client";
import { Place } from "@/Types";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CityAutocomplete from "./CityAutocomplete";
import MapComponent from "./BingMap";
import  './SearchMap.css'
type Props = {};

// Memoized versions of CityAutocomplete and MapComponent components
const MemoizedCityAutocomplete = React.memo(CityAutocomplete);
const MemoizedMapComponent = React.memo(MapComponent);
/**
 * Renders a search map component.
 *
 * @param {Props} {} - an empty object
 * @return {void} This function does not return anything.
 */
export default function SearchMap({}: Props) {
    // Getting and setting cookies using the useCookies hook
  const { get: getCookies, set: setCookies } = useCookies();
   // Memoized version of the cookies object with get and set methods
  const cookies = useMemo(() => ({
    get: (key: string) => getCookies(key) || undefined,
    set: (key: string, value: string) => setCookies(key, value, { path: "/" }),
  }), [getCookies, setCookies]);
  // Initial place object

  const initialPlace: Place = useMemo(() => {
    const selectedItem = cookies.get('selectedItem');
    if (selectedItem && selectedItem !== "undefined") {
      return JSON.parse(selectedItem);
    } else {
      return {
                // Default place object properties

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
  // Initial places array

  const initialPlaces = useMemo(() => {
    const selectedItems = cookies.get('selectedItems');
    if (selectedItems && selectedItems !== "undefined") {
      return JSON.parse(selectedItems);
    } else {
      return [initialPlace];
    }
  }, [cookies, initialPlace]);
  // State variables

  const [selectedItems, setSelectedItems] = useState<Place[]>(initialPlaces);
  const [primaryColor, setPrimaryColor] = useState<string>(cookies.get("primaryColor") || "blue");
  const [secondaryColor, setSecondaryColor] = useState<string>(cookies.get("secondaryColor") || "green");
  const [lastSelectedItem, setLastSelectedItem] = useState<Place>(initialPlace);
  // Callback function to handle the effect

  const handleEffect = useCallback(() => {
    
    // Convert selectedItems and lastSelectedItem to JSON strings

    const selectedItemsJson = JSON.stringify(selectedItems);
    const lastSelectedItemJson = JSON.stringify(lastSelectedItem);
    // Set cookies with the selectedItems and lastSelectedItem JSON strings

    cookies.set("selectedItems", selectedItemsJson);
    cookies.set("selectedItem", lastSelectedItemJson);
  }, [selectedItems,lastSelectedItem, cookies]);
  // Run the effect when selectedItems, lastSelectedItem, or cookies change

  useEffect(() => {
    handleEffect();
  }, [handleEffect]);

  return (
    <div className="grid w-full relative">



<div className="card image-full rounded-none">
  <figure className="before:bg-transparent ">
    <MemoizedMapComponent lat={lastSelectedItem?.lat} lon={lastSelectedItem?.lon} display_name={lastSelectedItem?.display_name} primaryColor={primaryColor} secondaryColor={secondaryColor} pins={selectedItems} />
</figure>
  <div className="card-body ">
  <MemoizedCityAutocomplete selectedItems={selectedItems} setSelectedItems={setSelectedItems} lastSelectedItem={lastSelectedItem} setLastSelectedItem={setLastSelectedItem} />

  </div>
</div>
    </div>);}