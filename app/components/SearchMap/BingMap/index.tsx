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
interface Pin {
  lat: string;
  lon: string;
  display_name: string;
}
export default function MapComponent({ lat, lon, display_name, primaryColor, secondaryColor, pins }: Props) {
  const pinsArr = React.useMemo(
    () =>
      pins.map((pin: Pin, index: number) => ({
        location: [Number(pin.lat), Number(pin.lon)],
        option: {
          color: index === pins.length - 1 ? primaryColor : secondaryColor,
          title: pin.display_name
        }
      })),
    [pins, primaryColor, secondaryColor]
  );
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
          showMapTypeSelector: false
        }}
        zoom={18}
        pushPins={[...pinsArr]}
        // boundary={{
        //   search: display_name,
        //   option: {
        //     entityType: "AdminDivision1"
        //   },
        //   polygonStyle: {
        //     strokeColor: primaryColor,
        //     strokeThickness: 1.5,
        //     fillColor: "transparent" // or "none"
        //   }
        // }}
      />
  );
}
