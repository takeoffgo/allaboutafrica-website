"use client";
import mapboxgl from "mapbox-gl";
import React from "react";
import { TripFlight } from "@/lib/api/jambo";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJlbmRhbm1ja2VuemllIiwiYSI6ImNsZHMzdDBjODE5bm8zdWxiejg1YzF2a2UifQ.pj32ctMAG0vvh-dOHvkW-A";

export type MapMarker = {
  id: string;
  type: string;
  lat: number;
  lng: number;
  title: string;
  body?: string;
  icon: string;
};

type MapProps = { points: MapMarker[]; flights?: TripFlight[] };
function TripMap({ points, flights }: Readonly<MapProps>) {
  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  const applicablePoints = points.filter((ent) => ent?.lat && ent?.lng);

  const bounds: mapboxgl.LngLatBounds = (() => {
    switch (applicablePoints.length) {
      case 0:
        return new mapboxgl.LngLatBounds();
      case 1:
        return new mapboxgl.LngLatBounds([
          applicablePoints[0],
          applicablePoints[0],
        ]);
      default:
        return applicablePoints.reduce(
          (acc, pt) => acc.extend(pt),
          new mapboxgl.LngLatBounds([applicablePoints[0], applicablePoints[1]]),
        );
    }
  })();

  // Create a GeoJSON source from your points
  const pointsSource: GeoJSON.GeoJSON = {
    type: "FeatureCollection",
    features: points.map((pt) => ({
      type: "Feature",
      properties: {
        id: pt.id,
        title: pt.title,
        body: pt.body,
        icon: pt.icon,
      },
      geometry: {
        type: "Point",
        coordinates: [pt.lng, pt.lat],
      },
    })),
  };

  React.useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/brendanmckenzie/clygj16a500wo01r4dwbtdcui",
      center: bounds.getCenter(),
      zoom: 6,
      scrollZoom: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("style.load", () => {
      map.current!.addSource("locations", {
        type: "geojson",
        data: pointsSource,
      });

      // Add images first
      map.current!.loadImage("/arrow.png", (err, img) => {
        if (err) throw err;
        map.current!.addImage("oneway-large", img!);
      });

      // First add flight lines (lower z-index)
      flights?.forEach((flt) => {
        if (
          flt.departureAirport?.latitude &&
          flt.departureAirport?.longitude &&
          flt.arrivalAirport?.latitude &&
          flt.arrivalAirport?.longitude
        ) {
          try {
            const id = `flt-${flt.id}`;
            map.current?.addSource(id, {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [
                      flt.departureAirport?.longitude,
                      flt.departureAirport?.latitude,
                    ],
                    [
                      flt.arrivalAirport?.longitude,
                      flt.arrivalAirport?.latitude,
                    ],
                  ],
                },
              },
            });

            map.current?.addLayer({
              id,
              type: "line",
              source: id,
              paint: {
                "line-color": "#fff",
                "line-width": 1,
                "line-opacity": 1,
              },
            });

            map.current?.addLayer({
              id: id + "-directions",
              type: "symbol",
              source: id,
              paint: {},
              layout: {
                "symbol-placement": "line",
                "icon-image": "oneway-large",
                "icon-rotate": 45,
                "icon-rotation-alignment": "map",
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
                "icon-size": 0.1,
              },
            });
          } catch {}
        }
      });

      // Then add location points (higher z-index)
      map.current!.addLayer({
        id: "location-points",
        type: "symbol",
        source: "locations",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-size": 0.15625,
          "text-field": ["get", "title"],
          "text-font": ["Spezia SemiMono Medium"],
          "text-size": 12,
          "text-offset": [0, 1],
          "text-anchor": "top",
          "icon-allow-overlap": true,
          "text-allow-overlap": false,
          "text-ignore-placement": false,
          "icon-ignore-placement": true,
        },
        paint: {
          "text-color": "#000", // Color of the text itself
          "text-halo-color": "#fff", // Color of the background
          "text-halo-width": 2, // Width of the background
          "text-halo-blur": 0, // Sharp, solid background
        },
      });

      // Add click behavior with fixed type issue
      map.current!.on("click", "location-points", (e) => {
        if (e.features?.[0]) {
          // Fix the type issue by safely accessing coordinates
          const feature = e.features[0];
          if (feature.geometry.type === "Point") {
            const coordinates = (
              feature.geometry as GeoJSON.Point
            ).coordinates.slice() as [number, number];

            if (map.current!.getZoom() > 8) {
              map.current!.fitBounds(bounds, { duration: 2500 });
            } else {
              // Center the map on this point
              map.current!.flyTo({
                center: coordinates,
                zoom: 12,
                duration: 2500,
              });
            }
          }
        }
      });

      // Change cursor when hovering over points
      map.current!.on("mouseenter", "location-points", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });

      map.current!.on("mouseleave", "location-points", () => {
        map.current!.getCanvas().style.cursor = "";
      });
    });

    // Wait for the map to load before fitting bounds
    map.current.on("load", () => {
      map.current!.fitBounds(bounds, { maxZoom: 6 });
    });
  }, [map, points, bounds, flights]);

  // Separate useEffect for adding markers and layers that depends on style being loaded
  React.useEffect(() => {
    if (!map.current) return;

    // Add or update the source
    (map.current.getSource("locations") as mapboxgl.GeoJSONSource)?.setData(
      pointsSource,
    );
  }, [map, pointsSource]);

  return <div id="map" ref={mapContainer} className="quote-map__container" />;
}

export default TripMap;
