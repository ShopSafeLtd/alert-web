import React from 'react';
import { BarGraph, DonutGraph } from '#/components/reports/graphs';
import { Button, Typography } from 'antd';
import type { BusinessIncidentCountGraphQueryVariables } from 'graphql/generated';
import { useBusinessIncidentCountGraphQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChartPie,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { MetaData } from '#/views/reports/types';

interface Props {
  isPrinting: boolean;
  editMode: boolean;
  variables: BusinessIncidentCountGraphQueryVariables;
  metaData?: MetaData;
  setMetaData: (arg0: MetaData) => void;
  removeItem: () => void;
  onNavigate: () => void;
}

const BusinessIncidentCountGraph = ({
  isPrinting,
  variables,
  editMode,
  metaData,
  setMetaData,
  removeItem,
  onNavigate,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessIncidentCountGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Business Incidents Count',
          id: '+mhkDm',
        })}
      </Typography.Title>
      {editMode ? (
        <>
          <Button
            type="text"
            shape="circle"
            className="change-graph1 no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
            size="small"
            onClick={() => {
              if (metaData && setMetaData) {
                setMetaData({ ...metaData, type: 'bar' });
              }
            }}
          />
          <Button
            type="text"
            shape="circle"
            className="change-graph2 no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faChartPie} size="lg" />}
            size="small"
            onClick={() => {
              if (metaData && setMetaData) {
                if (metaData?.type === 'donut') {
                  setMetaData({ ...metaData, type: 'pie' });
                } else {
                  setMetaData({ ...metaData, type: 'donut' });
                }
              }
            }}
          />
          <Button
            type="text"
            shape="circle"
            className="card-remove no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
            size="small"
            onClick={removeItem}
          />
        </>
      ) : (
        <Button
          type="text"
          className="change-graph1-view-more"
          // style={{ position: 'absolute', right: 5, top: 15, zIndex: 1 }}
          size="small"
          onClick={onNavigate}
          danger
        >
          {intl.formatMessage({
            defaultMessage: 'View More',
            id: 'QQSdHP',
          })}
        </Button>
      )}
      {metaData?.type === 'bar' ? (
        <BarGraph
          isPrinting={isPrinting}
          data={data?.businessIncidentCountGraph}
          emptyLabel="No incidents"
        />
      ) : (
        <DonutGraph
          isPrinting={isPrinting}
          data={data?.businessIncidentCountGraph}
          emptyLabel="No incidents"
          type={metaData?.type as 'donut' | 'pie'}
        />
      )}
    </>
  );
};

export default BusinessIncidentCountGraph;
