"use client";
import { Place } from "@/Types";
import { useCookies } from "next-client-cookies";
import React, { useEffect } from "react";
import { useState } from "react";
import CityAutocomplete from "./CityAutocomplete";
import MapComponent from "./BingMap";
import chroma from "chroma-js";

type Props = {};

export default function SearchMap({  }: Props) {
  const [selectedItems, setSelectedItems] = useState<Place[]>([]);
  const [lastSelectedItems, setLastSelectedItems] = useState<Place>({
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
  });
  const cookies = useCookies();
  const primaryColor =
  document ?
  chroma
    .oklch(
      Number(getComputedStyle(document.documentElement)
        .getPropertyValue("--p")
        .trim()
        .split(" ")[0]), // Lightness argument
      Number(getComputedStyle(document.documentElement)
        .getPropertyValue("--p")
        .trim()
        .split(" ")[1]), // Chroma argument
      Number(getComputedStyle(document.documentElement)
        .getPropertyValue("--p")
        .trim()
        .split(" ")[2]) // Hue argument
    )
    .hex() : "red";

  useEffect(
    () => {
      console.log("selectedItem", selectedItems);
      setLastSelectedItems(selectedItems.slice(-1)[0]);
      cookies.set("selectedItems", JSON.stringify(selectedItems), { path: "/" });
    },
    [selectedItems, cookies]
  );
  return (
    <div className="grid  w-full  relative ">
      <CityAutocomplete selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <MapComponent lat={lastSelectedItems?.lat} lon={lastSelectedItems?.lon} display_name={lastSelectedItems?.display_name} primaryColor={primaryColor} />
    </div>
  );
}
