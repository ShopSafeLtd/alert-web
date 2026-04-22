import { Alert, Button, Card, Empty } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import MapCard from '../MapCard/MapCard.view';
import { useIncidentMapData } from './useIncidentMapData';

interface IncidentMapContainerProps {
  crimeGroupId?: string;
  height?: number | string;
  investigationId?: string;
  isPrinting?: boolean;
  offenderId?: string;
  showEmptyState?: boolean;
  width?: number | string;
}

export const IncidentMapContainer: React.FC<IncidentMapContainerProps> = ({
  crimeGroupId,
  height = 500,
  investigationId,
  isPrinting = false,
  offenderId,
  showEmptyState = false,
  width = '100%',
}) => {
  const intl = useIntl();
  const { error, incidents, loading, refetch } = useIncidentMapData({
    crimeGroupId,
    investigationId,
    offenderId,
  });

  // Handle loading state
  if (loading) {
    return <Card loading style={{ height, width }} />;
  }

  // Handle error state
  if (error) {
    return (
      <Alert
        action={
          <Button onClick={refetch} size="small">
            {intl.formatMessage({ defaultMessage: 'Retry' })}
          </Button>
        }
        description={error.message}
        message={intl.formatMessage({
          defaultMessage: 'Error loading incident map',
        })}
        showIcon
        type="error"
      />
    );
  }

  // Handle empty state
  if (incidents.length === 0 && showEmptyState) {
    return (
      <Card style={{ height, width }}>
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No incidents with location data found',
          })}
        />
      </Card>
    );
  }

  // Render map
  return (
    <MapCard
      height={height}
      isPrinting={isPrinting}
      markers={incidents}
      width={width}
    />
  );
};

export default IncidentMapContainer;
