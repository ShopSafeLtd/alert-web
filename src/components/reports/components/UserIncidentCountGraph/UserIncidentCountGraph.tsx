import type { UserIncidentCountGraphQueryVariables } from '#/components/reports/components/UserIncidentCountGraph/__generated__/UserIncidentCountGraph.generated';
import type { MetaData } from '#/views/reports/types';

import { useUserIncidentCountGraphQuery } from '#/components/reports/components/UserIncidentCountGraph/__generated__/UserIncidentCountGraph.generated';
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
  editMode: boolean;
  isPrinting: boolean;
  metaData?: MetaData;
  onNavigate: () => void;
  removeItem: () => void;
  setMetaData: (arg0: MetaData) => void;
  variables: UserIncidentCountGraphQueryVariables;
}

const UserIncidentCountGraph = ({
  editMode,
  isPrinting,
  metaData,
  onNavigate,
  removeItem,
  setMetaData,
  variables,
}: Props) => {
  const intl = useIntl();

  const { data } = useUserIncidentCountGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'User Incidents Count',
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
          data={data?.userIncidentCountGraph}
          emptyLabel={intl.formatMessage({
            defaultMessage: 'No incidents',
          })}
          isPrinting={isPrinting}
        />
      ) : (
        <DonutGraph
          data={data?.userIncidentCountGraph}
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

export default UserIncidentCountGraph;
