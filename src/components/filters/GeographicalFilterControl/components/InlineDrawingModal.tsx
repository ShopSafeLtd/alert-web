import type { IControl } from 'mapbox-gl';
import type { MapMouseEvent, MapRef } from 'react-map-gl';

import { formatRadius } from '#/utils/coordinate-conversion';
import {
  validateCircle,
  validatePolygon,
} from '#/utils/geographical-validation';
import {
  faCheck,
  faCircle,
  faDrawPolygon,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf';
import { Alert, Button, Modal, Space } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Map, { Layer, Source } from 'react-map-gl';

// Type for map events with lngLat
interface MapEventWithLngLat extends MapMouseEvent {
  lngLat: { lat: number; lng: number };
}

// Mapbox access token from env
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface CircleData {
  latitude: number;
  longitude: number;
  radiusMeters: number;
}

interface PolygonData {
  coordinates: number[][];
}

export type DrawingType = 'circle' | 'polygon';
export type GeometryData = CircleData | PolygonData;

interface InlineDrawingModalProps {
  onClose: () => void;
  onConfirm: (geometry: { data: GeometryData; type: DrawingType }) => void;
  open: boolean;
}

// Helper function to convert meters to pixels at zoom level
const metersToPixelsAtMaxZoom = (meters: number, latitude: number): number =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

export const InlineDrawingModal: React.FC<InlineDrawingModalProps> = ({
  onClose,
  onConfirm,
  open,
}) => {
  const intl = useIntl();
  const [drawingMode, setDrawingMode] = useState<'circle' | 'polygon' | null>(
    null
  );
  const [circleCenter, setCircleCenter] = useState<[number, number] | null>(
    null
  );
  const [circleRadius, setCircleRadius] = useState<number>(0);
  const [polygonVertices, setPolygonVertices] = useState<[number, number][]>(
    []
  );
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);
  const [drawnGeometry, setDrawnGeometry] = useState<{
    data: GeometryData;
    type: DrawingType;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<MapboxDraw | null>(null);
  const [viewState, setViewState] = useState({
    latitude: 51.5074,
    longitude: -0.1276,
    zoom: 10,
  });

  // Initialize MapboxDraw
  useEffect(() => {
    if (!mapRef.current || !open) return;

    const map = mapRef.current.getMap();
    const draw = new MapboxDraw({
      controls: {},
      displayControlsDefault: false,
    });

    map.addControl(draw as unknown as IControl);
    drawRef.current = draw;

    // Note: We don't handle draw.create event anymore since we use custom polygon drawing
    // MapboxDraw is kept for potential future use

    return () => {
      if (
        drawRef.current &&
        map.hasControl(drawRef.current as unknown as IControl)
      ) {
        map.removeControl(drawRef.current as unknown as IControl);
      }
      drawRef.current = null;
    };
  }, [open]);

  // Handle drawing mode changes
  useEffect(() => {
    if (!drawRef.current) return;

    const draw = drawRef.current;

    if (drawingMode === 'polygon') {
      draw.changeMode('draw_polygon');
      setCircleCenter(null);
      setCircleRadius(0);
    } else if (drawingMode === 'circle') {
      draw.changeMode('simple_select');
      draw.deleteAll();
      setPolygonVertices([]);
    } else {
      draw.changeMode('simple_select');
      draw.deleteAll();
      setCircleCenter(null);
      setCircleRadius(0);
      setPolygonVertices([]);
    }

    // Reset completion flag when mode changes
    setIsDrawingComplete(false);
  }, [drawingMode]);

  // Map click handlers for custom drawing
  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      // Ignore clicks if drawing is already completed
      if (isDrawingComplete) return;

      const evt = event as MapEventWithLngLat;
      const lng = evt.lngLat.lng;
      const lat = evt.lngLat.lat;

      if (drawingMode === 'polygon') {
        // Add vertex to polygon
        setPolygonVertices((prev) => [...prev, [lng, lat] as [number, number]]);
      } else if (drawingMode === 'circle') {
        if (circleCenter) {
          // Second click: calculate radius and complete
          const distance = turf.distance(
            turf.point(circleCenter),
            turf.point([lng, lat] as [number, number]),
            { units: 'meters' }
          );

          setDrawnGeometry({
            data: {
              latitude: circleCenter[1],
              longitude: circleCenter[0],
              radiusMeters: distance,
            },
            type: 'circle',
          });

          // Mark as complete (keeps preview visible)
          setIsDrawingComplete(true);
        } else {
          // First click: set center
          setCircleCenter([lng, lat]);
        }
      }
    },
    [drawingMode, circleCenter, isDrawingComplete]
  );

  const handleMapMouseMove = useCallback(
    (event: MapMouseEvent) => {
      if (drawingMode !== 'circle' || !circleCenter) return;

      const evt = event as MapEventWithLngLat;
      const lng = evt.lngLat.lng;
      const lat = evt.lngLat.lat;
      const distance = turf.distance(
        turf.point(circleCenter),
        turf.point([lng, lat] as [number, number]),
        { units: 'meters' }
      );

      setCircleRadius(distance);
    },
    [drawingMode, circleCenter]
  );

  // Handle double-click to complete polygon
  const handleMapDoubleClick = useCallback(
    (_event: MapMouseEvent) => {
      if (
        drawingMode === 'polygon' &&
        polygonVertices.length >= 3 &&
        !isDrawingComplete
      ) {
        // Complete the polygon - close it by adding first vertex at the end
        const closedCoordinates = [...polygonVertices, polygonVertices[0]];

        setDrawnGeometry({
          data: { coordinates: closedCoordinates },
          type: 'polygon',
        });

        // Mark as complete (keeps preview visible, prevents more clicks)
        setIsDrawingComplete(true);
      }
    },
    [drawingMode, polygonVertices, isDrawingComplete]
  );

  const handleClear = () => {
    setDrawnGeometry(null);
    setDrawingMode(null);
    setCircleCenter(null);
    setCircleRadius(0);
    setPolygonVertices([]);
    setIsDrawingComplete(false);
    setErrors([]);
    if (drawRef.current) {
      drawRef.current.deleteAll();
    }
  };

  const handleConfirm = () => {
    if (!drawnGeometry) {
      setErrors(['Please draw an area on the map']);
      return;
    }

    // Validate geometry
    if (drawnGeometry.type === 'circle') {
      const validation = validateCircle(drawnGeometry.data as CircleData);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }
    } else {
      const validation = validatePolygon(drawnGeometry.data as PolygonData);
      if (!validation.valid) {
        setErrors(validation.errors);
        return;
      }
    }

    onConfirm(drawnGeometry);

    // Clear and close
    handleClear();
    onClose();
  };

  const handleCancel = () => {
    handleClear();
    onClose();
  };

  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      footer={[
        <Button
          icon={<FontAwesomeIcon icon={faTimes} />}
          key="cancel"
          onClick={handleCancel}
        >
          {intl.formatMessage({ defaultMessage: 'Cancel' })}
        </Button>,
        <Button
          icon={<FontAwesomeIcon icon={faCheck} />}
          key="confirm"
          onClick={handleConfirm}
          type="primary"
        >
          {intl.formatMessage({ defaultMessage: 'Apply Filter' })}
        </Button>,
      ]}
      onCancel={handleCancel}
      open={open}
      title={intl.formatMessage({ defaultMessage: 'Draw Custom Area' })}
      width={800}
    >
      <Space direction="vertical" style={{ padding: 16, width: '100%' }}>
        {/* Drawing Mode Selector */}
        <Space>
          <Button
            icon={<FontAwesomeIcon icon={faCircle} />}
            onClick={() => setDrawingMode('circle')}
            type={drawingMode === 'circle' ? 'primary' : 'default'}
          >
            {intl.formatMessage({ defaultMessage: 'Circle' })}
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faDrawPolygon} />}
            onClick={() => setDrawingMode('polygon')}
            type={drawingMode === 'polygon' ? 'primary' : 'default'}
          >
            {intl.formatMessage({ defaultMessage: 'Polygon' })}
          </Button>
          {(drawingMode || drawnGeometry) && (
            <Button
              icon={<FontAwesomeIcon icon={faTimes} />}
              onClick={handleClear}
            >
              {intl.formatMessage({ defaultMessage: 'Clear' })}
            </Button>
          )}
        </Space>

        {/* Instructions */}
        {drawingMode === 'circle' && !drawnGeometry && (
          <Alert
            message={
              circleCenter
                ? intl.formatMessage({
                    defaultMessage: 'Click again to set the radius',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Click on the map to set the center',
                  })
            }
            showIcon
            type="info"
          />
        )}
        {drawingMode === 'polygon' && !drawnGeometry && (
          <Alert
            message={intl.formatMessage({
              defaultMessage:
                'Click to add vertices. Double-click to complete the polygon.',
            })}
            showIcon
            type="info"
          />
        )}
        {drawnGeometry && (
          <Alert
            message={
              drawnGeometry.type === 'circle'
                ? intl.formatMessage(
                    { defaultMessage: 'Circle drawn: {radius} radius' },
                    {
                      radius: formatRadius(
                        (drawnGeometry.data as CircleData).radiusMeters
                      ),
                    }
                  )
                : intl.formatMessage(
                    { defaultMessage: 'Polygon drawn: {points} points' },
                    {
                      points: (drawnGeometry.data as PolygonData).coordinates
                        .length,
                    }
                  )
            }
            showIcon
            type="success"
          />
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <Alert
            description={
              <ul>
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            }
            message={intl.formatMessage({
              defaultMessage: 'Validation Errors',
            })}
            showIcon
            type="error"
          />
        )}
      </Space>

      {/* Map */}
      <div style={{ height: 500, width: '100%' }}>
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
          {/* Circle preview during drawing and after completion */}
          {circleCenter && circleRadius > 0 && (
            <Source
              data={{
                geometry: { coordinates: circleCenter, type: 'Point' },
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
                      [
                        20,
                        metersToPixelsAtMaxZoom(circleRadius, circleCenter[1]),
                      ],
                    ],
                  },
                  'circle-stroke-color': '#fbb03b',
                  'circle-stroke-width': 2,
                }}
                type="circle"
              />
            </Source>
          )}

          {/* Polygon preview during drawing and after completion */}
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
      </div>
    </Modal>
  );
};

export default InlineDrawingModal;
