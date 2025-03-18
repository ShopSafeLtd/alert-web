import type { FilterProps } from '#/views/reports/performance/layout/PerformanceReportLayout';
import type { MetaData } from '#/views/reports/types';

import { BarGraph, DonutGraph } from '#/components/reports/graphs';
import { useActivityGraphQuery } from '#/views/reports/performance/ActivitesGraph/graphql/queries/__generated__/activities-graph.generated';
import {
  faChartBar,
  faChartPie,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  editMode: boolean;
  filters: FilterProps;
  isPrinting: boolean;
  metaData?: MetaData;
  onNavigate: () => void;
  removeItem: () => void;
  setMetaData: (arg0: MetaData) => void;
}

const ActivitiesGraphView = ({
  editMode,
  filters,
  isPrinting,
  metaData,
  onNavigate,
  removeItem,
  setMetaData,
}: Props) => {
  const intl = useIntl();

  const { data } = useActivityGraphQuery({
    variables: {
      where: {
        createdAt: filters.dateRange,
        groupIds: filters.selectedGroups || [],
        roles: filters.selectedRoles || [],
        schemeIds: filters.schemeId ? [filters.schemeId] : [],
      },
    },
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Activities',
        })}
      </Typography.Title>

      {editMode ? (
        <>
          <Button
            className="change-graph1 no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
            onClick={() => {
              if (metaData && setMetaData) {
                setMetaData({ ...metaData, type: 'bar' });
              }
            }}
            shape="circle"
            size="small"
            type="text"
          />
          <Button
            className="change-graph2 no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
            onClick={() => {
              if (metaData && setMetaData) {
                if (metaData?.type === 'donut') {
                  setMetaData({ ...metaData, type: 'pie' });
                } else {
                  setMetaData({ ...metaData, type: 'donut' });
                }
              }
            }}
            shape="circle"
            size="small"
            type="text"
          />
          <Button
            className="card-remove no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
            onClick={removeItem}
            shape="circle"
            size="small"
            type="text"
          />
        </>
      ) : (
        <Button
          className="change-graph1-view-more"
          danger
          onClick={onNavigate}
          size="small"
          type="text"
        >
          {intl.formatMessage({
            defaultMessage: 'View More',
          })}
        </Button>
      )}
      {metaData?.type === 'bar' ? (
        <BarGraph
          data={data?.activityGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No activities',
          })}
          isPrinting={isPrinting}
        />
      ) : (
        <DonutGraph
          data={data?.activityGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No activities',
          })}
          isPrinting={isPrinting}
          type={metaData?.type as 'donut' | 'pie'}
        />
      )}
    </>
  );
};

export default ActivitiesGraphView;
