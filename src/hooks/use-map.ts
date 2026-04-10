import {useEffect, useState, type RefObject} from 'react';
import {Map as LeafletMap, tileLayer} from 'leaflet';
import {type City} from '../types/offer.ts';

const useMap = (mapRef: RefObject<HTMLElement>, city: City): LeafletMap | null => {
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new LeafletMap(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom
      });

      tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(instance);

      setMap(instance);
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom, map, mapRef]);

  useEffect(() => {
    if (map !== null) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom, map]);

  useEffect(() => () => {
    map?.remove();
  }, [map]);

  return map;
};

export default useMap;
