"use client";
import { Place } from "@/Types";
import React from "react";
import { ReactBingmaps } from "react-bingmaps";

type Props = {
  lat: string;
  lon: string;
  display_name: string;
  primaryColor: string;
  secondaryColor: string;
  pins: Place[];
};
export default function MapComponent({ lat, lon, display_name ,primaryColor,secondaryColor,pins}: Props) {
  
  // Get the computed value of the --p CSS variable
  console.log(` primary ${typeof primaryColor}`, primaryColor);

  const pinsArr = pins.map((pin : Place, index : number) => {
    return {
      location: [Number(pin.lat), Number(pin.lon)],
      option: { color: index === pins.length - 1 ? primaryColor : secondaryColor, title: pin.display_name }
    };
  })
  return (
    <ReactBingmaps
      bingmapKey={process.env.NEXT_PUBLIC_BING_API_KEY}
      center={[Number(lat), Number(lon)]}
      
      mapTypeId={"aerial"}
      navigationBarMode={"compact"}
      mapOptions={{
        disableBirdseye: true,
        showBreadcrumb: true,
        showLocateMeButton: false,
        showMapTypeSelector: false,
      }}
      zoom = {10}

      pushPins={[...pinsArr]}
      boundary = {
        {
          "search":display_name,
          "option":{
            entityType: 'AdminDivision2'
          },
          "polygonStyle" :{
            strokeColor: primaryColor,
            strokeThickness: 1.5,
            fillColor: "transparent" // or "none"

          }
        }
      }
      
    />
  );
}
