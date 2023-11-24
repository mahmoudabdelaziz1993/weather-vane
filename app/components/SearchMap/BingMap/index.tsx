"use client";
import React from "react";
import { ReactBingmaps } from "react-bingmaps";

type Props = {
  lat: string;
  lon: string;
  display_name: string;
  primaryColor: string
};
export default function MapComponent({ lat, lon, display_name ,primaryColor}: Props) {
  
  // Get the computed value of the --p CSS variable
  console.log(` primary ${typeof primaryColor}`, primaryColor);
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

      pushPins={[
        {
          location: [Number(lat), Number(lon)],
          option: { color: primaryColor, title: display_name }
        }
      ]}
      boundary = {
        {
          "search":display_name,
          "option":{
            entityType: 'AdminDivision2'
          },
          "polygonStyle" :{
            strokeColor: primaryColor,
            strokeThickness: 3,
            fillColor: "transparent" // or "none"

          }
        }
      }
      // regularPolygons = {[{
      //       "center":[Number(lat), Number(lon)],
      //       "radius":5,
      //       "points":100,
      //       "option": {strokeColor: primaryColor, strokeThickness: 2}
      //     }
      //   ]}
    />
  );
}
