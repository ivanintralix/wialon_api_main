import React from 'react';
import { MapContainer, TileLayer, MapConsumer } from 'react-leaflet'
import UnidadesMapa from "./UnidadesMapa";
const MapaOSM = ({marketPosition}) => {
  return (
    <MapContainer className="map" center={marketPosition} zoom={15} scrollWheelZoom={false} style={{height: '400px; !important'}} >
      <MapConsumer>
        {(map) => {
          map.flyTo(marketPosition, map.getZoom())
          return null
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UnidadesMapa />
    </MapContainer>
  );
}
export default MapaOSM;