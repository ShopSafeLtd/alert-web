import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';

import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Tooltip } from 'antd';
import { useStoreState } from 'easy-peasy';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

const TimeOfDay = ({
  _metadata,
  _updateMetadata,
  elementId,
  removeItem,
}: {
  _metadata?: DashboardGraphMetadata;
  _updateMetadata?: (metadata: DashboardGraphMetadata) => void;
  elementId?: string;
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const intl = useIntl();
  const isDark =
    useStoreState(
      (state: { theme: { currentTheme: string } }) => state.theme.currentTheme
    ) === 'dark';

  // Create grid data - 4 rows x 6 columns
  const gridData = useMemo(() => {
    const data: Array<Array<{ hour: number; incidents: number }>> = [];
    for (let row = 0; row < 4; row++) {
      const rowData: Array<{ hour: number; incidents: number }> = [];
      for (let col = 0; col < 6; col++) {
        const hour = row * 6 + col;
        rowData.push({
          hour,
          incidents: Math.floor(Math.random() * 30) + 5, // Sample data
        });
      }
      data.push(rowData);
    }
    return data;
  }, []);

  // Color scale function
  const getColor = (value: number) => {
    const colors = isDark
      ? ['#1a1a1a', '#1b5e20', '#2e7d32', '#388e3c', '#4caf50']
      : ['#e8f5e9', '#a5d6a7', '#66bb6a', '#4caf50', '#2e7d32'];
    const max = 35;
    const min = 5;
    const normalized = (value - min) / (max - min);
    const index = Math.floor(normalized * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  };

  const loading = false;

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '8px',
        position: 'relative',
      }}
      loading={loading}
      style={{ height: '100%' }}
      title={intl.formatMessage({
        defaultMessage: 'Incidents by time of day',
      })}
    >
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() =>
          removeItem(
            (elementId || 'timeOfDayBar') as AvailableDashboardElements
          )
        }
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          gap: '2px',
          maxHeight: '320px',
        }}
      >
        {gridData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{ display: 'flex', flex: 1, gap: '2px', maxHeight: '75px' }}
          >
            {row.map((cell, colIndex) => (
              <Tooltip
                key={colIndex}
                title={intl.formatMessage(
                  { defaultMessage: '{hour}:00 - {incidents} incidents' },
                  { hour: cell.hour, incidents: cell.incidents }
                )}
              >
                <div
                  style={{
                    alignItems: 'center',
                    backgroundColor: getColor(cell.incidents),
                    borderRadius: '2px',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: 1,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    minHeight: '40px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10px',
                      left: '4px',
                      position: 'absolute',
                      top: '2px',
                    }}
                  >
                    {intl.formatMessage(
                      { defaultMessage: '{hour}:00' },
                      { hour: cell.hour }
                    )}
                  </div>
                  <div>{cell.incidents}</div>
                </div>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TimeOfDay;
