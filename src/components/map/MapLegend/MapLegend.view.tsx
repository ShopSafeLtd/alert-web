import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useStoreState } from 'state';

import useStyles from './MapLegend.styles';

interface LegendItem {
  color: string;
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  type: 'circle' | 'cluster' | 'heatmap';
}

interface BrandInfo {
  color: string;
  name: string;
}

interface Props {
  brands?: BrandInfo[];
  showBCRP: boolean;
  showBusinesses: boolean;
  showCameras: boolean;
  showHeatmap: boolean;
  showMarkers: boolean;
  showRetailParks: boolean;
  showUKDistricts: boolean;
}

const MapLegend: React.FC<Props> = ({
  brands = [],
  showBCRP,
  showBusinesses,
  showCameras,
  showHeatmap,
  showMarkers,
  showRetailParks,
  showUKDistricts,
}) => {
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const classes = useStyles({ colorScheme: currentTheme } as Parameters<
    typeof useStyles
  >[0]);

  const legendItems: LegendItem[] = [];

  // Add active layers to the legend
  if (showMarkers) {
    legendItems.push(
      {
        color: '#3b82f6',
        label: <FormattedMessage defaultMessage="Single Incident" />,
        type: 'circle',
      },
      {
        color: '#ef4444',
        label: <FormattedMessage defaultMessage="Multiple Incidents" />,
        type: 'circle',
      },
      {
        color: '#2563eb',
        label: <FormattedMessage defaultMessage="Incident Clusters" />,
        type: 'cluster',
      }
    );
  }

  if (showBusinesses && brands.length > 0) {
    // Add a section header for businesses
    legendItems.push({
      color: 'transparent',
      label: (
        <span style={{ fontSize: '11px', fontWeight: 600 }}>
          <FormattedMessage defaultMessage="Businesses by Brand" />
        </span>
      ),
      type: 'circle',
    });
    // Add each brand with its color
    for (const brand of brands) {
      legendItems.push({
        color: brand.color,
        label: (
          <span style={{ fontSize: '11px', marginLeft: '8px' }}>
            {brand.name}
          </span>
        ),
        type: 'circle',
      });
    }
  } else if (showBusinesses) {
    // Fallback if no brands are loaded yet
    legendItems.push({
      color: '#6366f1',
      label: <FormattedMessage defaultMessage="Businesses" />,
      type: 'circle',
    });
  }

  if (showHeatmap) {
    legendItems.push({
      color:
        'linear-gradient(90deg, rgba(0,0,255,0.1) 0%, rgba(0,255,0,0.3) 25%, rgba(255,255,0,0.5) 50%, rgba(255,165,0,0.7) 75%, rgba(255,0,0,0.9) 100%)',
      label: <FormattedMessage defaultMessage="Incident Heatmap" />,
      type: 'heatmap',
    });
  }

  if (showCameras) {
    legendItems.push({
      color: '#dc2626',
      label: <FormattedMessage defaultMessage="ANPR Cameras" />,
      type: 'circle',
    });
  }

  if (showBCRP) {
    legendItems.push({
      color: '#10b981',
      label: <FormattedMessage defaultMessage="BCRP Partnerships" />,
      type: 'circle',
    });
  }

  if (showRetailParks) {
    legendItems.push({
      color: '#f59e0b',
      label: <FormattedMessage defaultMessage="Shopping Centres" />,
      type: 'circle',
    });
  }

  if (showUKDistricts) {
    legendItems.push({
      color: '#9333EA',
      label: <FormattedMessage defaultMessage="UK Districts" />,
      type: 'circle',
    });
  }

  // Don't render if no items are visible
  if (legendItems.length === 0) {
    return null;
  }

  return (
    <div className={classes.legendContainer}>
      <div className={classes.legendTitle}>
        <FormattedMessage defaultMessage="Map Key" />
      </div>
      <div className={classes.legendItems}>
        {legendItems.map((item, index) => (
          <div className={classes.legendItem} key={index}>
            <div className={classes.legendSymbol}>
              {item.type === 'heatmap' ? (
                <div
                  className={classes.heatmapSymbol}
                  style={{ background: item.color }}
                />
              ) : item.type === 'cluster' ? (
                <div
                  className={classes.clusterSymbol}
                  style={{ backgroundColor: item.color }}
                >
                  <span className={classes.clusterText}>
                    <FormattedMessage defaultMessage="10+" />
                  </span>
                </div>
              ) : item.color === 'transparent' ? (
                // Don't render symbol for headers
                <div style={{ width: '14px' }} />
              ) : (
                <div
                  className={classes.circleSymbol}
                  style={{ backgroundColor: item.color }}
                />
              )}
            </div>
            <div className={classes.legendLabel}>
              <div>{item.label}</div>
              {item.subLabel && (
                <div className={classes.subLabel}>{item.subLabel}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
