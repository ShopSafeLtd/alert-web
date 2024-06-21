import React from 'react';
import { Button, Typography } from 'antd';
import type { UserSessionsGraphQueryVariables } from './UserSessionsGraph.generated';
import { useUserSessionsGraphQuery } from './UserSessionsGraph.generated';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import RadialGraph from '../../graphs/radialGraph';

interface Props {
  editMode: boolean;
  variables: UserSessionsGraphQueryVariables;
  removeItem: () => void;
  onNavigate: () => void;
  isPrinting: boolean;
}

const UserSessionsGraph = ({
  variables,
  editMode,
  removeItem,
  onNavigate,
  isPrinting,
}: Props) => {
  const intl = useIntl();

  const { data } = useUserSessionsGraphQuery({
    variables,
  });

  return (
    <>
      <Typography.Title level={4} style={{ fontWeight: 700 }}>
        {intl.formatMessage({
          defaultMessage: 'User Sessions',
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
          })}
        </Button>
      )}

      <RadialGraph
        isPrinting={isPrinting}
        data={data?.userSessionsGraph}
        emptyLabel={intl.formatMessage({
          defaultMessage: 'No Users',
        })}
      />
    </>
  );
};

export default UserSessionsGraph;
