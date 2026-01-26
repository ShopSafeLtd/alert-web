import {
  formatAreaDescription,
  formatRadius,
} from '#/utils/coordinate-conversion';
import { usePoliceGeographicalAreasQuery } from '#/views/police-settings/geographical-areas/graphql/queries/__generated__/geographical-areas.generated';
import {
  faDrawPolygon,
  faMapMarkerAlt,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Space, Spin, Tag } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import InlineDrawingModal, {
  type DrawingType,
  type GeometryData,
} from './components/InlineDrawingModal';

export interface GeographicalFilter {
  areaId?: string;
  areaName?: string;
  circle?: {
    latitude: number;
    longitude: number;
    radiusMeters: number;
  };
  polygon?: {
    coordinates: number[][];
  };
  type: 'inline' | 'saved';
}

interface GeographicalFilterControlProps {
  onChange: (filter: GeographicalFilter | undefined) => void;
  schemeId: string;
  size?: 'large' | 'middle' | 'small';
  value?: GeographicalFilter;
}

const CUSTOM_AREA_VALUE = '__custom_area__';

export const GeographicalFilterControl: React.FC<
  GeographicalFilterControlProps
> = ({ onChange, schemeId, size = 'middle', value }) => {
  const intl = useIntl();
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);

  const { data, loading } = usePoliceGeographicalAreasQuery({
    skip: !schemeId,
    variables: { schemeId },
  });

  const areas = data?.geographicalAreas || [];

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === CUSTOM_AREA_VALUE) {
      setDrawingModalOpen(true);
    } else {
      const area = areas.find((a) => a.id === selectedValue);
      if (area) {
        onChange({
          areaId: area.id,
          areaName: area.name,
          type: 'saved',
        });
      }
    }
  };

  const handleDrawingConfirm = (geometry: {
    data: GeometryData;
    type: DrawingType;
  }) => {
    if (geometry.type === 'circle') {
      const circleData = geometry.data as {
        latitude: number;
        longitude: number;
        radiusMeters: number;
      };
      onChange({
        circle: circleData,
        type: 'inline',
      });
    } else if (geometry.type === 'polygon') {
      const polygonData = geometry.data as { coordinates: number[][] };
      onChange({
        polygon: polygonData,
        type: 'inline',
      });
    }
    setDrawingModalOpen(false);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  const getDisplayValue = () => {
    if (!value) return undefined;

    if (value.type === 'saved' && value.areaId) {
      return value.areaId;
    }

    // For inline filters, we show a tag instead
    return undefined;
  };

  const renderValue = () => {
    if (!value) return null;

    let description = '';

    if (value.type === 'saved' && value.areaName) {
      description = value.areaName;
    } else if (value.type === 'inline') {
      if (value.circle) {
        description = intl.formatMessage(
          { defaultMessage: 'Custom: {radius} circle' },
          { radius: formatRadius(value.circle.radiusMeters) }
        );
      } else if (value.polygon) {
        description = intl.formatMessage(
          { defaultMessage: 'Custom: {points} point polygon' },
          { points: value.polygon.coordinates.length - 1 }
        );
      }
    }

    return (
      <Tag
        closable
        color="blue"
        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
        onClose={(e) => {
          e.preventDefault();
          handleClear();
        }}
        style={{ marginRight: 0 }}
      >
        {description}
      </Tag>
    );
  };

  // If there's an inline filter active, show it as a tag
  if (value?.type === 'inline') {
    return (
      <Space.Compact style={{ width: '100%' }}>
        {renderValue()}
        <InlineDrawingModal
          onClose={() => setDrawingModalOpen(false)}
          onConfirm={handleDrawingConfirm}
          open={drawingModalOpen}
        />
      </Space.Compact>
    );
  }

  return (
    <>
      <Select
        allowClear
        filterOption={(input, option) => {
          const label = option?.label;
          if (typeof label === 'string') {
            return label.toLowerCase().includes(input.toLowerCase());
          }
          return false;
        }}
        loading={loading}
        notFoundContent={
          loading ? (
            <Spin size="small" />
          ) : (
            intl.formatMessage({ defaultMessage: 'No saved areas found' })
          )
        }
        onChange={handleSelectChange}
        onClear={handleClear}
        placeholder={
          <>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 8 }} />
            {intl.formatMessage({ defaultMessage: 'Geographical filter' })}
          </>
        }
        showSearch
        size={size}
        style={{ width: '100%' }}
        value={getDisplayValue()}
      >
        {areas.map((area) => {
          // Parse circle/polygon data if it's JSON string
          const circle:
            | { latitude: number; longitude: number; radiusMeters: number }
            | null
            | undefined =
            area.circle && typeof area.circle === 'string'
              ? (JSON.parse(area.circle) as {
                  latitude: number;
                  longitude: number;
                  radiusMeters: number;
                } | null)
              : (area.circle as
                  | {
                      latitude: number;
                      longitude: number;
                      radiusMeters: number;
                    }
                  | null
                  | undefined);
          const polygon: { coordinates: number[][] } | null | undefined =
            area.polygon && typeof area.polygon === 'string'
              ? (JSON.parse(area.polygon) as { coordinates: number[][] } | null)
              : (area.polygon as
                  | { coordinates: number[][] }
                  | null
                  | undefined);

          const description = formatAreaDescription(
            area.areaType,
            circle,
            polygon
          );

          return (
            <Select.Option key={area.id} label={area.name} value={area.id}>
              <div>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ marginRight: 8 }}
                />
                <strong>{area.name}</strong>
                <div style={{ color: '#999', fontSize: 12, marginLeft: 24 }}>
                  {description}
                </div>
              </div>
            </Select.Option>
          );
        })}
        <Select.Option key={CUSTOM_AREA_VALUE} value={CUSTOM_AREA_VALUE}>
          <div style={{ color: '#1890ff' }}>
            <FontAwesomeIcon icon={faDrawPolygon} style={{ marginRight: 8 }} />
            <strong>
              {intl.formatMessage({ defaultMessage: 'Draw custom area...' })}
            </strong>
          </div>
        </Select.Option>
      </Select>

      <InlineDrawingModal
        onClose={() => setDrawingModalOpen(false)}
        onConfirm={handleDrawingConfirm}
        open={drawingModalOpen}
      />
    </>
  );
};

export default GeographicalFilterControl;
