import type { BusinessIncidentCountGraphQueryVariables } from '#/components/reports/components/BusinessIncidentCountGraph/__generated__/BusinessIncidentCountGraph.generated';
import type { MetaData } from '#/views/reports/types';

import { useBusinessIncidentCountGraphQuery } from '#/components/reports/components/BusinessIncidentCountGraph/__generated__/BusinessIncidentCountGraph.generated';
import { BarGraph, DonutGraph } from '#/components/reports/graphs';
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
  allMeta: MetaData[];
  editMode: boolean;
  isPrinting: boolean;
  metaData: MetaData;
  onNavigate: () => void;
  removeItem: () => void;
  setMetaData: (arg0: MetaData[]) => void;
  variables: BusinessIncidentCountGraphQueryVariables;
}

const BusinessIncidentCountGraph = ({
  allMeta,
  editMode,
  isPrinting,
  metaData,
  onNavigate,
  removeItem,
  setMetaData,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useBusinessIncidentCountGraphQuery({
    variables,
  });

  const foundOrNew = allMeta.find(
    (item) => item.key === 'businessIncidentCountGraph'
  );

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'Business Incidents Count',
        })}
      </Typography.Title>
      {editMode ? (
        <>
          <Button
            className="change-graph1 no-print"
            hidden={!editMode}
            icon={<FontAwesomeIcon icon={faChartBar} size="lg" />}
            onClick={() => {
              if (foundOrNew) {
                const updatedMetadata = allMeta.map((item) => {
                  if (item.key === 'businessIncidentCountGraph') {
                    if (item.type === 'donut') return { ...item, type: 'bar' };
                    return { ...item, type: 'donut' };
                  }
                  return item;
                }) satisfies MetaData[];
                setMetaData(updatedMetadata);
              } else {
                setMetaData([
                  ...allMeta,
                  { key: 'businessIncidentCountGraph', type: 'bar' },
                ]);
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
              if (foundOrNew) {
                const updatedMetadata = allMeta.map((item) => {
                  if (item.key === 'businessIncidentCountGraph') {
                    if (item.type === 'bar') return { ...item, type: 'donut' };
                    return { ...item, type: 'donut' };
                  }
                  return item;
                }) satisfies MetaData[];
                setMetaData(updatedMetadata);
              } else {
                setMetaData([
                  ...allMeta,
                  { key: 'businessIncidentCountGraph', type: 'donut' },
                ]);
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
          // style={{ position: 'absolute', right: 5, top: 15, zIndex: 1 }}
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
          data={data?.businessIncidentCountGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
          isPrinting={isPrinting}
        />
      ) : (
        <DonutGraph
          data={data?.businessIncidentCountGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
          isPrinting={isPrinting}
          type={metaData?.type as 'donut' | 'pie'}
        />
      )}
    </>
  );
};

export default BusinessIncidentCountGraph;
