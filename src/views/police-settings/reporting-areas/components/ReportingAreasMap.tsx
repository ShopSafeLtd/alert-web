import type { IControl } from 'mapbox-gl';
import type { MapLayerMouseEvent, MapRef } from 'react-map-gl';

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';

import type { AreaGeometry, DrawingMode, GeographicalArea } from '../types';

interface ReportingAreasMapProps {
  areas: GeographicalArea[];
  drawingMode: DrawingMode;
  onAreaClick: (area: GeographicalArea) => void;
  onDrawComplete: (geometry: AreaGeometry) => void;
  selectedArea: GeographicalArea | null;
}

// Mapbox access token from env
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Type definitions for area geometries
interface CircleGeometry {
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

interface PolygonGeometry {
  coordinates: [number, number][];
}

// Helper function to convert meters to pixels at zoom level
const metersToPixelsAtMaxZoom = (meters: number, latitude: number) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

export const ReportingAreasMap: React.FC<ReportingAreasMapProps> = ({
  areas,
  drawingMode,
  onAreaClick: _onAreaClick,
  onDrawComplete,
  selectedArea,
}) => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 51.5074,
    longitude: -0.1276,
    zoom: 10,
  });

  // Circle drawing state
  const [circleCenter, setCircleCenter] = useState<[number, number] | null>(
    null
  );
  const [circleRadius, setCircleRadius] = useState<number>(0);

  // Polygon drawing state
  const [polygonVertices, setPolygonVertices] = useState<[number, number][]>(
    []
  );

  // Track if drawing is completed (to keep preview visible until form is submitted)
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);

  // Track previous areas count to detect when a new area is created
  const prevAreasCountRef = useRef(areas.length);

  // Initialize Mapbox Draw
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    const draw = new MapboxDraw({
      controls: {},
      displayControlsDefault: false,
      // Use default styles - custom styles were incomplete and prevented drawing visibility
    });

    map.addControl(draw as unknown as IControl);
    drawRef.current = draw;

    // Debug: Log all map clicks
    map.on('click', (e: MapLayerMouseEvent) => {
      console.log('[DEBUG] Map clicked at:', e.lngLat);
    });

    // Note: We don't handle draw.create event anymore since we use custom polygon drawing
    // MapboxDraw is kept for potential future use or edit mode

    return () => {
      if (
        drawRef.current &&
        map.hasControl(drawRef.current as unknown as IControl)
      ) {
        map.removeControl(drawRef.current as unknown as IControl);
      }
      drawRef.current = null;
    };
  }, [onDrawComplete]);

  // Handle drawing mode changes
  useEffect(() => {
    if (!drawRef.current) return;

    const draw = drawRef.current;

    console.log('[DEBUG] Drawing mode:', drawingMode);
    console.log('[DEBUG] MapboxDraw features:', draw.getAll());
    console.log('[DEBUG] MapboxDraw current mode:', draw.getMode());

    if (drawingMode === 'polygon') {
      draw.changeMode('draw_polygon');
      console.log('[DEBUG] Changed to draw_polygon mode');
    } else if (drawingMode === 'edit') {
      draw.changeMode('simple_select');
    } else {
      draw.changeMode('simple_select');
      draw.deleteAll();
    }

    // Reset drawing state when mode changes
    if (drawingMode !== 'circle') {
      setCircleCenter(null);
      setCircleRadius(0);
    }
    if (drawingMode !== 'polygon') {
      setPolygonVertices([]);
    }

    // Reset completion flag when mode changes
    setIsDrawingComplete(false);
  }, [drawingMode]);

  // Clear preview when a new area is created (areas array increases)
  useEffect(() => {
    if (areas.length > prevAreasCountRef.current) {
      // New area was added, clear all drawing state
      setPolygonVertices([]);
      setCircleCenter(null);
      setCircleRadius(0);
      setIsDrawingComplete(false);
    }
    prevAreasCountRef.current = areas.length;
  }, [areas.length]);

  // Handle map clicks for custom drawing
  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      // Ignore clicks if drawing is already completed
      if (isDrawingComplete) return;

      const { lat, lng } = event.lngLat;
      const coordinates: [number, number] = [lng, lat];

      if (drawingMode === 'polygon') {
        // Add vertex to polygon
        setPolygonVertices((prev) => [...prev, coordinates]);
      } else if (drawingMode === 'circle') {
        if (circleCenter) {
          // Second click: calculate radius and complete
          const distance = turf.distance(
            turf.point(circleCenter),
            turf.point(coordinates),
            { units: 'meters' }
          );

          onDrawComplete({
            latitude: circleCenter[1],
            longitude: circleCenter[0],
            radiusMeters: distance,
            type: 'circle',
          });

          // Mark as complete (keeps preview visible)
          setIsDrawingComplete(true);
        } else {
          // First click: set center
          setCircleCenter(coordinates);
        }
      }
    },
    [
      drawingMode,
      circleCenter,
      polygonVertices,
      onDrawComplete,
      isDrawingComplete,
    ]
  );

  // Update circle radius as mouse moves
  const handleMapMouseMove = useCallback(
    (event: MapLayerMouseEvent) => {
      if (drawingMode !== 'circle' || !circleCenter) return;

      const { lat, lng } = event.lngLat;
      const coordinates: [number, number] = [lng, lat];
      const distance = turf.distance(
        turf.point(circleCenter),
        turf.point(coordinates),
        { units: 'meters' }
      );

      setCircleRadius(distance);
    },
    [drawingMode, circleCenter]
  );

  // Handle double-click to complete polygon
  const handleMapDoubleClick = useCallback(
    (_event: MapLayerMouseEvent) => {
      if (
        drawingMode === 'polygon' &&
        polygonVertices.length >= 3 &&
        !isDrawingComplete
      ) {
        // Complete the polygon - close it by adding first vertex at the end
        const closedCoordinates = [...polygonVertices, polygonVertices[0]];

        onDrawComplete({
          coordinates: closedCoordinates,
          type: 'polygon',
        });

        // Mark as complete (keeps preview visible, prevents more clicks)
        setIsDrawingComplete(true);
      }
    },
    [drawingMode, polygonVertices, onDrawComplete, isDrawingComplete]
  );

  return (
    <Map
      ref={mapRef}
      {...viewState}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={handleMapClick}
      onDblClick={handleMapDoubleClick}
      onMouseMove={handleMapMouseMove}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ height: '100%', width: '100%' }}
    >
      {/* Render existing areas */}
      {areas.map((area) => {
        if (area.areaType === 'circle' && area.circle) {
          const circle = area.circle as CircleGeometry;
          const coordinates: [number, number] = [
            circle.longitude,
            circle.latitude,
          ];
          return (
            <React.Fragment key={area.id}>
              <Source
                data={{
                  geometry: {
                    coordinates,
                    type: 'Point',
                  },
                  properties: {},
                  type: 'Feature',
                }}
                id={`area-${area.id}`}
                type="geojson"
              >
                <Layer
                  id={`area-circle-${area.id}`}
                  paint={{
                    'circle-color': area.color || '#1890ff',
                    'circle-opacity': selectedArea?.id === area.id ? 0.5 : 0.3,
                    'circle-radius': {
                      base: 2,
                      stops: [
                        [0, 0],
                        [
                          20,
                          metersToPixelsAtMaxZoom(
                            circle.radiusMeters,
                            circle.latitude
                          ),
                        ],
                      ],
                    },
                    'circle-stroke-color': area.color || '#1890ff',
                    'circle-stroke-width': selectedArea?.id === area.id ? 3 : 2,
                  }}
                  type="circle"
                />
              </Source>
            </React.Fragment>
          );
        } else if (area.areaType === 'polygon' && area.polygon) {
          const polygon = area.polygon as PolygonGeometry;
          const coordinates: [number, number][][] = [polygon.coordinates];
          return (
            <React.Fragment key={area.id}>
              <Source
                data={{
                  geometry: {
                    coordinates,
                    type: 'Polygon',
                  },
                  properties: {},
                  type: 'Feature',
                }}
                id={`area-${area.id}`}
                type="geojson"
              >
                <Layer
                  id={`area-fill-${area.id}`}
                  paint={{
                    'fill-color': area.color || '#1890ff',
                    'fill-opacity': selectedArea?.id === area.id ? 0.5 : 0.3,
                  }}
                  type="fill"
                />
                <Layer
                  id={`area-outline-${area.id}`}
                  paint={{
                    'line-color': area.color || '#1890ff',
                    'line-width': selectedArea?.id === area.id ? 3 : 2,
                  }}
                  type="line"
                />
              </Source>
            </React.Fragment>
          );
        }
        return null;
      })}

      {/* Render circle preview during drawing and after completion */}
      {circleCenter && circleRadius > 0 && (
        <Source
          data={{
            geometry: {
              coordinates: circleCenter,
              type: 'Point',
            },
            properties: {},
            type: 'Feature',
          }}
          id="circle-preview"
          type="geojson"
        >
          <Layer
            id="circle-preview-layer"
            paint={{
              'circle-color': '#fbb03b',
              'circle-opacity': 0.3,
              'circle-radius': {
                base: 2,
                stops: [
                  [0, 0],
                  [20, metersToPixelsAtMaxZoom(circleRadius, circleCenter[1])],
                ],
              },
              'circle-stroke-color': '#fbb03b',
              'circle-stroke-width': 2,
            }}
            type="circle"
          />
        </Source>
      )}

      {/* Render polygon preview during drawing and after completion */}
      {polygonVertices.length > 0 && (
        <>
          {/* Render lines connecting vertices */}
          {polygonVertices.length >= 2 && (
            <Source
              data={{
                geometry: {
                  coordinates: polygonVertices,
                  type: 'LineString',
                },
                properties: {},
                type: 'Feature',
              }}
              id="polygon-preview-line"
              type="geojson"
            >
              <Layer
                id="polygon-preview-line-layer"
                paint={{
                  'line-color': '#fbb03b',
                  'line-dasharray': [2, 2],
                  'line-width': 2,
                }}
                type="line"
              />
            </Source>
          )}

          {/* Render polygon fill if we have at least 3 vertices */}
          {polygonVertices.length >= 3 && (
            <Source
              data={{
                geometry: {
                  coordinates: [[...polygonVertices, polygonVertices[0]]],
                  type: 'Polygon',
                },
                properties: {},
                type: 'Feature',
              }}
              id="polygon-preview-fill"
              type="geojson"
            >
              <Layer
                id="polygon-preview-fill-layer"
                paint={{
                  'fill-color': '#fbb03b',
                  'fill-opacity': 0.3,
                }}
                type="fill"
              />
            </Source>
          )}

          {/* Render each vertex as a circle */}
          {polygonVertices.map((vertex, index) => (
            <Source
              data={{
                geometry: {
                  coordinates: vertex,
                  type: 'Point',
                },
                properties: {},
                type: 'Feature',
              }}
              id={`vertex-${index}`}
              key={`vertex-${index}`}
              type="geojson"
            >
              <Layer
                id={`vertex-circle-${index}`}
                paint={{
                  'circle-color': '#fbb03b',
                  'circle-radius': 6,
                  'circle-stroke-color': '#fff',
                  'circle-stroke-width': 2,
                }}
                type="circle"
              />
            </Source>
          ))}
        </>
      )}
    </Map>
  );
};

export default ReportingAreasMap;
