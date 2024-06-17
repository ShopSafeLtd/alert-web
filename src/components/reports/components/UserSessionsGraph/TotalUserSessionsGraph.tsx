import React from 'react';
import { Button, Typography } from 'antd';
import type { TotalUserSessionsGraphQueryVariables } from 'graphql/generated';
import { useTotalUserSessionsGraphQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { DonutGraph } from '../../graphs';

interface Props {
  editMode: boolean;
  variables: TotalUserSessionsGraphQueryVariables;
  removeItem: () => void;
  onNavigate: () => void;
  isPrinting: boolean;
}

const TotalUserSessionsGraph = ({
  variables,
  editMode,
  removeItem,
  onNavigate,
  isPrinting,
}: Props) => {
  const intl = useIntl();

  const { data } = useTotalUserSessionsGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'User Sessions',
          id: 'IS4S3Y',
        })}
      </Typography.Title>

      {editMode ? (
        <Button
          type="text"
          shape="circle"
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faTrash} color="red" size="lg" />}
          size="small"
          onClick={removeItem}
        />
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

      <DonutGraph
        isPrinting={isPrinting}
        data={data?.totalUserSessionsGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Users',
          id: 'XisWAX',
        })}
      />
    </>
  );
};

export default TotalUserSessionsGraph;
