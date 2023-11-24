"use client";
import { Place } from "@/Types";
import { useCookies } from "next-client-cookies";
import React, { useEffect, useState } from "react";
import CityAutocomplete from "./CityAutocomplete";
import MapComponent from "./BingMap";

type Props = {};

export default function SearchMap({  }: Props) {
  const cookies = useCookies();
  const initialPlace: Place =  cookies.get('selectedItem') &&cookies.get('selectedItem') !== "undefined"
    ? JSON.parse(cookies.get('selectedItem')!)
    : {
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

  const [selectedItems, setSelectedItems] = useState<Place[]>([initialPlace]);
  const [primaryColor, setPrimaryColor] = useState<string>(cookies.get("primaryColor") ||"red");
  const [lastSelectedItem, setLastSelectedItem] = useState<Place>(initialPlace);

  const handleEffect = () => {
    const lastSelected = selectedItems.slice(-1)[0];
    setLastSelectedItem(lastSelected);
    cookies.set("selectedItems", JSON.stringify(selectedItems), { path: "/" });
    cookies.set("selectedItem", JSON.stringify(lastSelectedItem), { path: "/" });
  };

  useEffect(handleEffect, [lastSelectedItem, cookies, selectedItems]);

  return (
    <div className="grid  w-full  relative ">
      <CityAutocomplete selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <MapComponent lat={lastSelectedItem?.lat} lon={lastSelectedItem?.lon} display_name={lastSelectedItem?.display_name} primaryColor={primaryColor} />
    </div>
  );
}
