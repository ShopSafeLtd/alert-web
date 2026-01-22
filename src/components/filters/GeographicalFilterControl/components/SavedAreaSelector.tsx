import { formatAreaDescription } from '#/utils/coordinate-conversion';
import { usePoliceGeographicalAreasQuery } from '#/views/police-settings/geographical-areas/graphql/queries/__generated__/geographical-areas.generated';
import { faMapMarkerAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Spin } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface SavedAreaSelectorProps {
  disabled?: boolean;
  onChange: (areaId: string, areaName: string) => void;
  placeholder?: string;
  schemeId: string;
  value?: string;
}

export const SavedAreaSelector: React.FC<SavedAreaSelectorProps> = ({
  disabled = false,
  onChange,
  placeholder = 'Select a saved area',
  schemeId,
  value,
}) => {
  const intl = useIntl();
  const { data, loading } = usePoliceGeographicalAreasQuery({
    skip: !schemeId,
    variables: { schemeId },
  });

  const areas = data?.geographicalAreas || [];

  const handleChange = (areaId: string) => {
    const area = areas.find((a) => a.id === areaId);
    if (area) {
      onChange(areaId, area.name);
    }
  };

  return (
    <Select
      allowClear
      disabled={disabled}
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
      onChange={handleChange}
      placeholder={placeholder}
      showSearch
      style={{ width: '100%' }}
      value={value}
    >
      {areas.map((area) => {
        // Parse circle/polygon data if it's JSON string
        const circle: {
          latitude: number;
          longitude: number;
          radiusMeters: number;
        } | null =
          area.circle && typeof area.circle === 'string'
            ? (JSON.parse(area.circle) as {
                latitude: number;
                longitude: number;
                radiusMeters: number;
              })
            : (area.circle as {
                latitude: number;
                longitude: number;
                radiusMeters: number;
              } | null);
        const polygon: { coordinates: number[][] } | null =
          area.polygon && typeof area.polygon === 'string'
            ? (JSON.parse(area.polygon) as { coordinates: number[][] })
            : (area.polygon as { coordinates: number[][] } | null);

        const description = formatAreaDescription(
          area.areaType,
          circle,
          polygon
        );

        return (
          <Select.Option key={area.id} value={area.id}>
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
    </Select>
  );
};

export default SavedAreaSelector;
