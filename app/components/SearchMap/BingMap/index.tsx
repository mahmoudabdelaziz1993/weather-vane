"use client"
import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
type Props = {
  lat: string;
  lon: string;
};
export default function MapComponent({ lat,lon }: Props) {
  return (
    <ReactBingmaps 
      bingmapKey={process.env.NEXT_PUBLIC_BING_API_KEY} 
      center={[Number(lat),Number(lon)]} 
      mapTypeId={"streetside"} 
      zoom={10} 
    />
  );
}
