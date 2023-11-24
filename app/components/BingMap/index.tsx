"use client"
import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';

export default function MapComponent() {
  return (
    <ReactBingmaps 
      bingmapKey={process.env.NEXT_PUBLIC_BING_API_KEY} 
      center={[51.5074, 0.1278]} 
      mapTypeId={"aerial"} 
      zoom={10} 
    />
  );
}
